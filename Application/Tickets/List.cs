using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Tickets

{
    public class List
    {
        public class TicketsEnvelope
        {
            public List<TicketDTO> Tickets { get; set; }
            public int TicketCount { get; set; }
        }
        public class Query : IRequest<TicketsEnvelope>
        {

            public Query(bool isSubmitter, bool isAssignee)
            {
                IsAssignee = isAssignee;
                IsSubmitter = isSubmitter;

            }
            public bool IsSubmitter { get; set; }
            public bool IsAssignee { get; set; }
        }

        public class Handler : IRequestHandler<Query, TicketsEnvelope>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)    //from now on controllers will only be responsible for http requests and response --> all business logic handlers be the Handler (MediatR)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<TicketsEnvelope> Handle(Query request, CancellationToken cancellationToken)    //
            {
                var queryable = _context.Tickets
                .OrderBy(x => x.Category)
                .AsQueryable();

                var user = await _context.Users.SingleOrDefaultAsync(x => 
                    x.UserName == _userAccessor.GetCurrentUsername());
                
                if(request.IsSubmitter && !request.IsAssignee){
                    queryable = queryable.Where(x => x.SubmitterId == user.Id);
                }

                if(request.IsAssignee && !request.IsSubmitter){
                    queryable = queryable.Where(x => x.AssigneeId == user.Id);
                }

                var tickets = await queryable.ToListAsync();

                return new TicketsEnvelope
                {
                    Tickets = _mapper.Map<List<Ticket>, List<TicketDTO>>(tickets),
                    TicketCount = queryable.Count()
                };
            }
        }

    }
}