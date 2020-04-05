using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Castle.Core.Internal;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Statistics
{
    public class Statistics
    {
        public class StatisticsEnvelope
        {
            public int numManagersWithBios { get; set; }
        }

        public class Query : IRequest<StatisticsEnvelope>
        {
        }

        public class Handler : IRequestHandler<Query, StatisticsEnvelope>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<StatisticsEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var numManagersWithBios = 
                    (from user in _context.Users
                        join teamMember in _context.TeamMembers on user.Id equals teamMember.AppUserId
                        where teamMember.IsManager && !(user.Bio == null || user.Bio.Equals(""))
                        select user).ToList().Distinct().Count();

                return new StatisticsEnvelope
                {
                    numManagersWithBios = numManagersWithBios
                };
            }
        }
    }
}