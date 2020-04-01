using System;
using System.Collections.Generic;
using Application.Comments;
using Domain;

namespace Application.Tickets
{
    public class TicketDTO
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
        public string submitterUsername { get; set; }   //changed to fix inf loop
        public string submitterDisplayName { get; set; }     //changed to fix inf loop
        public string TeamId { get; set; }

        public string TeamName {get; set;}
        public string Image { get; set; }     //changed to fix inf loop
        public string AssigneeId { get; set; }
        public string assigneeUsername { get; set; }   //changed to fix inf loop
        public string assigneeDisplayName { get; set; }    //changed to fix inf loop
        public ICollection<CommentDto> Comments { get; set; }
    }
}