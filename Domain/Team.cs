using System;
using System.Collections.Generic;
/*
 * Entity
 */
namespace Domain
{
    public class Team
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public virtual ICollection<TeamMember> TeamMembers { get; set; }
    }
}