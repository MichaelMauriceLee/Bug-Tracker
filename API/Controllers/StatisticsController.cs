using System.Threading.Tasks;
using Application.Statistics;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class StatisticsController : BaseController
    {
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<Statistics.StatisticsEnvelope>> Statistics()
        {
            return await Mediator.Send(new Statistics.Query());
        }
    }
}