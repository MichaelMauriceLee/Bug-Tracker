using System.Linq;
using Application.Teams;
using AutoMapper;
using Domain;

namespace Application.Tickets
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Ticket, TicketDTO>()
                .ForMember(d => d.SubmitterId, o => o.MapFrom(s => s.Submitter.Id))
                .ForMember(d => d.submitterUsername, o => o.MapFrom(s => s.Submitter.UserName))
                .ForMember(d => d.submitterDisplayName, o => o.MapFrom(s => s.Submitter.DisplayName))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Submitter.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.AssigneeId, o => o.MapFrom(s => s.Assignee.Id))
                .ForMember(d => d.assigneeUsername, o => o.MapFrom(s => s.Assignee.UserName))
                .ForMember(d => d.assigneeDisplayName, o => o.MapFrom(s => s.Assignee.DisplayName));

        }
    }
}