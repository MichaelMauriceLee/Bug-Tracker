using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using MediatR;
using Persistence;

namespace Application.Statistics
{
    public class Statistics
    {
        public class StatisticsEnvelope
        {
            public int NumTickets { get; set; }
            public int NumTeams { get; set; }
            public int NumUsersWithBio { get; set; }
            public int NumUsersWithPhoto { get; set; }
            public int NumManagersWithBio { get; set; }
            public int NumManagersWithPhoto { get; set; }
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
                //sum
                var numTickets =
                    (from ticket in _context.Tickets
                        select ticket).ToList().Count();
                
                //sum
                var numTeams =
                    (from team in _context.Teams
                        select team).ToList().Count();
                
                //inner join, alias, sum
                var numUsersWithBio = 
                    (from user in _context.Users
                        where !(user.Bio == null || user.Bio.Equals(""))
                        select user).ToList().Distinct().Count();
                
                //inner join, alias, sum
                var numUsersWithPhoto =
                    (from user in _context.Users
                        where user.Photos.Count >= 1
                        select user).ToList().Distinct().Count();
                
                //inner join, alias, sum
                var numManagersWithBio = 
                    (from user in _context.Users
                        join teamMember in _context.TeamMembers on user.Id equals teamMember.AppUserId into gj
                        from account in gj.DefaultIfEmpty()
                        where account.IsManager && !(user.Bio == null || user.Bio.Equals(""))
                        select user).ToList().Distinct().Count();
                
                //inner join, alias, sum
                var numManagersWithPhoto =
                    (from user in _context.Users
                        join teamMember in _context.TeamMembers on user.Id equals teamMember.AppUserId
                        where teamMember.IsManager && user.Photos.Count >= 1
                        select user).ToList().Distinct().Count();

                return new StatisticsEnvelope
                {
                    NumTickets = numTickets,
                    NumTeams = numTeams,
                    NumUsersWithBio = numUsersWithBio,
                    NumUsersWithPhoto = numUsersWithPhoto,
                    NumManagersWithBio = numManagersWithBio,
                    NumManagersWithPhoto = numManagersWithPhoto
                };
            }
        }
    }
}