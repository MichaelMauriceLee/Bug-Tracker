using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Tickets

{
    public class List
    {

        public class Query : IRequest<List<Ticket>> { }

        public class Handler : IRequestHandler<Query, List<Ticket>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)    //from now on controllers will only be responsible for http requests and response --> all business logic handlers be the Handler (MediatR)
            {
                _context = context;
            }

            public async Task<List<Ticket>> Handle(Query request, CancellationToken cancellationToken)    //
            {
                var tickets = await _context.Tickets.ToListAsync();
                return tickets;
            }
        }

    }
}