/*
 * REST endpoint for any requests regarding teams.
 */

using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Tickets;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : BaseController
    {
        //Any API controller needs a root, API attribute, and must derive from the Base Controller class as seen above
        private readonly IMediator _mediator;
        public TicketsController(IMediator mediator)    //Injecting MediatR
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Ticket>>> List ()       //We will be returning a list of tickets
        {
            return await _mediator.Send(new List.Query());          //Sending a message to the List Query Handler
        }


    }
}