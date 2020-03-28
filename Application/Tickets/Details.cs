using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Tickets
{
    public class Details
    {

        public class Query : IRequest<TicketDTO>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, TicketDTO>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<TicketDTO> Handle(Query request, CancellationToken cancellationToken)
            {
                var ticket = await _context.Tickets.FindAsync(request.Id);

                if (ticket == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { ticket = "Not found" });
                }

                var ticketToReturn = _mapper.Map<Ticket, TicketDTO>(ticket);

                return ticketToReturn;
            }
        }
    }
}
