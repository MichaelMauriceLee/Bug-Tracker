/*
 * Edit Object to edit a ticket
 */
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Tickets
{
    public class Edit
    {
        public class Command : IRequest        //no entities are returned, only an indicator for whether the operation was successful (i.e. a MediatR Unit)
        {
            public Guid Id { get; set; }      //User won't be able to edit, but we still need it here to determine the Ticket that the user wants to update
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime? SubmissionDate { get; set; }
            public DateTime AcceptanceDate { get; set; }
            public DateTime? DueDate { get; set; }    //? specifies that this is optional --> gets rid of error in Handler because DateTime is not allowed to be null
            public string Priority { get; set; }
            public bool IsAccepted { get; set; }
            public string SubmitterId { get; set; }
            public virtual AppUser Submitter { get; set; }
            public string TeamId { get; set; }
            public virtual Team Team { get; set; }
            public string AssigneeId { get; set; }
            public virtual AppUser Assignee { get; set; }
            public virtual ICollection<Comment> Comments { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.Category).NotEmpty();
                RuleFor(x => x.SubmissionDate).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                
                var ticket = await _context.Tickets.FindAsync(request.Id);

                if(ticket == null){
                    throw new RestException(HttpStatusCode.NotFound, new {ticket = "Not found"});
                }

                //?? is the coalescing operator. If the left side of ?? is null, then the right hand side will get executed
                ticket.Title = request.Title ?? ticket.Title;
                ticket.Description = request.Description ?? ticket.Description;
                ticket.Category = request.Category ?? ticket.Category;
                ticket.DueDate = request.DueDate ?? ticket.DueDate;
                ticket.Priority = request.Priority ?? ticket.Priority;
                ticket.SubmissionDate = request.SubmissionDate ?? ticket.SubmissionDate;
                ticket.SubmitterId = request.SubmitterId ?? ticket.SubmitterId;
                ticket.AssigneeId = request.AssigneeId ?? ticket.AssigneeId;
                ticket.TeamId = request.TeamId ?? ticket.TeamId;
                ticket.Comments = request.Comments ?? ticket.Comments;

                var success = await _context.SaveChangesAsync() > 0;     //if we get > 0, this means that our addition of the new ticket was successful

                if (success) return Unit.Value;          //returns a 200 ok response if create operation was successful

                throw new Exception("Problem saving changes");
            }

        }
    }
}
