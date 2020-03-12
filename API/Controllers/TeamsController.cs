using System;
using System.Threading.Tasks;
using Application.Teams;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

/*
 * REST endpoint for any requests regarding teams.
 */

namespace API.Controllers
{
    public class TeamsController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List.TeamsEnvelope>> List(int? limit, 
            int? offset, bool isTeamMem, bool isManager)
        {
            return await Mediator.Send(new List.Query(limit, 
                offset, isTeamMem, isManager));
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<TeamDto>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "IsManager")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "IsManager")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command{Id = id});
        }

        [HttpPost("{id}/belong")]
        public async Task<ActionResult<Unit>> Belong(Guid id)
        {
            return await Mediator.Send(new Belong.Command{Id = id});
        }

        [HttpDelete("{id}/belong")]
        public async Task<ActionResult<Unit>> Unbelong(Guid id)
        {
            return await Mediator.Send(new Unbelong.Command{Id = id});
        }
        
        [HttpDelete("{id}/remove/{targetId}")]
        [Authorize(Policy = "IsManager")]
        public async Task<ActionResult<Unit>> Remove(Guid id, string targetId)
        {
            return await Mediator.Send(new Remove.Command{Id = id, TargetId = targetId});
        }
    }
}