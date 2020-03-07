using System;
/*
 * Entity
 */
namespace Domain
{
    public class TeamMember
    {
        //this class is to resolve the many to many relationship between AppUser and Team 
        //because Entity framework cant handle it (its basically a join table)
        public string AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
        public Guid TeamId { get; set; }
        public virtual Team Team { get; set; }
        public bool IsManager { get; set; }
    }
}