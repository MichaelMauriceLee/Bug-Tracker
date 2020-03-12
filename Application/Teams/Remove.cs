using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

/*
 * Command object to remove people from a team
 */

namespace Application.Teams
{
    public class Remove
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string TargetId { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var team = await _context.Teams.FindAsync(request.Id);

                if (team == null)
                    throw new RestException(HttpStatusCode.NotFound, new {Team = "Could not find team"});

                var user = await _context.Users.SingleOrDefaultAsync(x => 
                    x.UserName == _userAccessor.GetCurrentUsername());

                var userMembership = await _context.TeamMembers
                    .SingleOrDefaultAsync(x => x.TeamId == team.Id && 
                        x.AppUserId == user.Id);
                
                var target = await _context.Users.SingleOrDefaultAsync(x => 
                    x.Id == request.TargetId);
                
                var targetMembership = await _context.TeamMembers
                    .SingleOrDefaultAsync(x => x.TeamId == team.Id && 
                                               x.AppUserId == target.Id);

                if (userMembership == null || targetMembership == null)
                    return Unit.Value;   
                
                if (userMembership.IsManager && targetMembership.AppUserId == userMembership.AppUserId)
                    throw new RestException(HttpStatusCode.BadRequest, new {Attendance = "You cannot remove yourself due to being the manager"});

                _context.TeamMembers.Remove(targetMembership);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}