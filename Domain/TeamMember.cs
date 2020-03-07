namespace Domain
{
    public class TeamMember
    {
        //this class is to resolve the many to many relationship between AppUser and Team 
        //because Entity framework cant handle it
        public string AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
        public string TeamId { get; set; }
        public virtual Team Team { get; set; }
        public bool IsManager { get; set; }
    }
}