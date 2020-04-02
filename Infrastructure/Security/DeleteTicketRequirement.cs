using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Infrastructure.Security
{
    public class DeleteTicketRequirement : IAuthorizationRequirement
    { 
    }
    public class DeleteTicketRequirementHandler : AuthorizationHandler<DeleteTicketRequirement>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _context;
        public DeleteTicketRequirementHandler(IHttpContextAccessor httpContextAccessor, DataContext context)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;

        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
        DeleteTicketRequirement requirement)
        {
            var currentUserName = _httpContextAccessor.HttpContext.User?.Claims?
            .SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            var ticketId = Guid.Parse(_httpContextAccessor.HttpContext.Request.RouteValues
            .SingleOrDefault(x => x.Key == "id").Value.ToString());

            var ticket = _context.Tickets.FindAsync(ticketId).Result;

            var team = _context.Teams.FindAsync(Guid.Parse(ticket.TeamId)).Result;   //can change ticket.TeamId to team name

            var manager = team.TeamMembers.FirstOrDefault(x => x.IsManager);

            if(manager?.AppUser?.UserName == currentUserName){
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
            
        }
    }

}