using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ListActivities
    {
        public class Query : IRequest<List<UserActivityDto>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<UserActivityDto>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<UserActivityDto>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.Username);

                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new { User = "Not found" });

                var queryable = user.UserActivities
                    .OrderBy(a => a.Ticket.Date)
                    .AsQueryable();

                switch (request.Predicate)
                {
                    case "past":
                        queryable = queryable.Where(a => a.Ticket.Date <= DateTime.Now);
                        break;
                    case "hosting":
                        queryable = queryable.Where(a => a.IsHost);
                        break;
                    default:
                        queryable = queryable.Where(a => a.Ticket.Date >= DateTime.Now);
                        break;
                }

                var activities = queryable.ToList();
                var activitiesToReturn = new List<UserActivityDto>();

                foreach (var activity in activities)
                {
                    var userActivity = new UserActivityDto
                    {
                        Id = activity.Ticket.Id,
                        Title = activity.Ticket.Title,
                        Category = activity.Ticket.Category,
                        Date = activity.Ticket.Date
                    };

                    activitiesToReturn.Add(userActivity);
                }

                return activitiesToReturn;
            }
        }
    }
}