using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Domain;
/*
 * Data Transfer Object to allow entity framework to get data w/o self references
 */
namespace Application.Activities
{
    public class TeamDto
    {
        public Guid Id { get; set; }
        
        public string Name { get; set; }
        
        public string Description { get; set; }

        [JsonPropertyName("members")]
        public ICollection<MemberDto> Members { get; set; }
    }
}