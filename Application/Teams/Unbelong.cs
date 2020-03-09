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
    public class Unbelong
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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

                var membership = await _context.TeamMembers
                    .SingleOrDefaultAsync(x => x.TeamId == team.Id && 
                        x.AppUserId == user.Id); 

                if (membership == null)
                    return Unit.Value;   
                
                //TODO edit this so you can remove yourself if you there are other managers in the team
                if (membership.IsManager)
                    throw new RestException(HttpStatusCode.BadRequest, new {Attendance = "You cannot remove yourself as manager"});

                _context.TeamMembers.Remove(membership);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}