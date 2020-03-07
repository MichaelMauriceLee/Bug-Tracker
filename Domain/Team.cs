using System;
using System.Collections.Generic;

namespace Domain
{
    public class Team
    {
        public Guid TeamId { get; set; }
        public virtual ICollection<TeamMember> TeamMembers { get; set; }
    }
}