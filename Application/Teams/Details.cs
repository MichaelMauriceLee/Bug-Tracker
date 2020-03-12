using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;
/*
 * Query object to get more information on a team
 */
namespace Application.Teams
{
    public class Details
    {
        public class Query : IRequest<TeamDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, TeamDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<TeamDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var team = await _context.Teams
                    .FindAsync(request.Id);

                if (team == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Team = "Not found" });

                var teamToReturn = _mapper.Map<Team, TeamDto>(team);

                return teamToReturn;
            }
        }
    }
}