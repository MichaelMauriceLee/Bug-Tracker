using System.Linq;
using AutoMapper;
using Domain;

/*
 * Mapping profile for AutoMapper to connect the two Dto objects
 */

namespace Application.Teams
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Team, TeamDto>();
            CreateMap<TeamMember, MemberDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.AppUser.Id))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}