using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Tickets
{
    public class Remove
    {
        public class Command : IRequest        //no entities are returned, only an indicator for whether the operation was successful (i.e. a MediatR Unit)
        {
            public Guid Id { get; set; }
            //public string AssigneeId { get; set; }
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
                
                var ticket = await _context.Tickets.FindAsync(request.Id);

                if (ticket == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new {Ticket = "Could not find ticket"});
                }

                var user = await _context.Users.SingleOrDefaultAsync(x => 
                    x.UserName == _userAccessor.GetCurrentUsername());

                if(ticket.AssigneeId == null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new {Ticket = "This ticket has not been assigned yet"});
                }
                // else if(ticket.AssigneeId != user.Id)
                // {
                //     throw new RestException(HttpStatusCode.BadRequest, new {Ticket = "You are not assigned this ticket"});
                // }

                ticket.AssigneeId = null;

                var success = await _context.SaveChangesAsync() > 0;     //if we get > 0, this means that our addition of the new ticket was successful

                if (success) return Unit.Value;          //returns a 200 ok response if create operation was successful

                throw new Exception("Problem saving changes");
            }
        }
    }
}