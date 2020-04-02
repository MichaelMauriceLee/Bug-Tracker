/*
 * Delete Object to delete a ticket
 */
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.Tickets
{
    public class Delete
    {
        public class Command : IRequest        
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var ticket = await _context.Tickets.FindAsync(request.Id);

                if(ticket == null){
                    throw new RestException(HttpStatusCode.NotFound, new {ticket = "Not found"});
                }

                foreach (var comment in ticket.Comments)
                {
                    _context.Remove(comment);
                }

                _context.Remove(ticket);

                var success = await _context.SaveChangesAsync() > 0;     

                if (success) return Unit.Value;          

                throw new Exception("Problem saving changes");
            }
        }
    }
}
