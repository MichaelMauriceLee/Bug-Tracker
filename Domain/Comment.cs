using System;
/*
 * Entity
 */
namespace Domain
{
    public class Comment
    {
        public Guid Id { get; set; }
        public string Body { get; set; }
        public virtual AppUser Author { get; set; }
        public virtual Ticket Ticket { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}