using System;
using System.Collections.Generic;
/*
 * Entity
 */
namespace Domain
{
    public class Ticket
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime SubmissionDate { get; set; }
        public DateTime AcceptanceDate { get; set; }
        public DateTime DueDate { get; set; }
        public string Priority { get; set; }
        public bool IsAccepted { get; set; }
        public string SubmitterId { get; set; }
        public virtual AppUser Submitter { get; set; }
        public string TeamId { get; set; }
        public virtual Team Team { get; set; }
        public string AssigneeId { get; set; }
        public virtual AppUser Assignee { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        //TODO add attachments later
    }
}