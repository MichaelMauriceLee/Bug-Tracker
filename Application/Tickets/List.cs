using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Tickets

{
    public class List
    {

        public class Query : IRequest<List<TicketDTO>> { }

        public class Handler : IRequestHandler<Query, List<TicketDTO>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)    //from now on controllers will only be responsible for http requests and response --> all business logic handlers be the Handler (MediatR)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<TicketDTO>> Handle(Query request, CancellationToken cancellationToken)    //
            {
                var tickets = await _context.Tickets.ToListAsync();
                
                return _mapper.Map<List<Ticket>, List<TicketDTO>>(tickets);
            }
        }

    }
}