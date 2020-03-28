/*
 * Command Object to create a new ticket
 */
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Tickets
{
    public class Create
    {
        public class Command : IRequest        //no entities are returned, only an indicator for whether the operation was successful (i.e. a MediatR Unit)
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
                var ticket = new Ticket
                {
                    Id = request.Id,
                    Title = request.Title,
                    Description = request.Description,
                    Category = request.Category,
                    SubmissionDate = request.SubmissionDate,
                    AcceptanceDate = request.AcceptanceDate,
                    DueDate = request.DueDate,
                    Priority = request.Priority,
                    IsAccepted = request.IsAccepted,
                    SubmitterId = request.SubmitterId,
                    Submitter = request.Submitter,
                    TeamId = request.TeamId,
                    Team = request.Team,
                    AssigneeId = request.AssigneeId,
                    Assignee = request.Assignee,
                    Comments = request.Comments
                };

                _context.Tickets.Add(ticket);
                var success = await _context.SaveChangesAsync() > 0;     //if we get > 0, this means that our addition of the new ticket was successful

                if (success) return Unit.Value;          //returns a 200 ok response if create operation was successful

                throw new Exception("Problem saving changes");
            }
        }

    }
}