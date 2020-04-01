using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;
/*
 * Class to seed database with data if the data doesn't exist
 */
namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        Id = "a",
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    },
                    new AppUser
                    {
                        Id = "b",
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com"
                    },
                    new AppUser
                    {
                        Id = "c",
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (!context.Teams.Any())
            {
                var teams = new List<Team>
                {
                    new Team
                    {
                        Name = "Team 1",
                        Description = "Team 1 Description",
                        TeamMembers = new List<TeamMember>
                        {
                            new TeamMember
                            {
                                AppUserId = "a",
                                IsManager = true
                            }
                        }
                    },
                    new Team
                    {
                        Name = "Team 2",
                        Description = "Team 2 Description",
                        TeamMembers = new List<TeamMember>
                        {
                            new TeamMember
                            {
                                AppUserId = "b",
                                IsManager = true
                            },
                            new TeamMember
                            {
                                AppUserId = "a",
                                IsManager = false,
                            }
                        }
                    },
                    new Team
                    {
                        Name = "Team 3",
                        Description = "Team 3 Description",
                        TeamMembers = new List<TeamMember>
                        {
                            new TeamMember
                            {
                                AppUserId = "b",
                                IsManager = true,
                            },
                            new TeamMember
                            {
                                AppUserId = "a",
                                IsManager = false,
                            },
                        }
                    },
                    new Team
                    {
                        Name = "Team 4",
                        Description = "Team 4 Description",
                        TeamMembers = new List<TeamMember>
                        {
                            new TeamMember
                            {
                                AppUserId = "c",
                                IsManager = true
                            },
                            new TeamMember
                            {
                                AppUserId = "a",
                                IsManager = false
                            },
                        }
                    },
                    new Team
                    {
                        Name = "Team 5",
                        Description = "Team 5 Description",
                        TeamMembers = new List<TeamMember>
                        {
                            new TeamMember
                            {
                                AppUserId = "b",
                                IsManager = true
                            },
                            new TeamMember
                            {
                                AppUserId = "c",
                                IsManager = false
                            },
                        }
                    },
                    new Team
                    {
                        Name = "Team 6",
                        Description = "Team 6 Description",
                        TeamMembers = new List<TeamMember>
                        {
                            new TeamMember
                            {
                                AppUserId = "a",
                                IsManager = true
                            }
                        }
                    },
                    new Team
                    {
                        Name = "Team 7",
                        Description = "Team 7 Description",
                        TeamMembers = new List<TeamMember>
                        {
                            new TeamMember
                            {
                                AppUserId = "c",
                                IsManager = true
                            },
                            new TeamMember
                            {
                                AppUserId = "b",
                                IsManager = false
                            },
                        }
                    },
                    new Team
                    {
                        Name = "Team 8",
                        Description = "Team 8 Description",
                        TeamMembers = new List<TeamMember>
                        {
                            new TeamMember
                            {
                                AppUserId = "a",
                                IsManager = true
                            },
                            new TeamMember
                            {
                                AppUserId = "b",
                                IsManager = false
                            },
                        }
                    },
                    new Team
                    {
                        Name = "Team 9",
                        Description = "Team 9 Description",
                        TeamMembers = new List<TeamMember>
                        {
                            new TeamMember
                            {
                                AppUserId = "a",
                                IsManager = true
                            },
                            new TeamMember
                            {
                                AppUserId = "c",
                                IsManager = false
                            },
                        }
                    },
                    new Team
                    {
                        Name = "Team 10",
                        Description = "Team 10 Description",
                        TeamMembers = new List<TeamMember>
                        {
                            new TeamMember
                            {
                                AppUserId = "b",
                                IsManager = true
                            },
                            new TeamMember
                            {
                                AppUserId = "a",
                                IsManager = false
                            },
                        }
                    }
                };
                await context.Teams.AddRangeAsync(teams);

                await context.SaveChangesAsync();
            }


            if (!context.Tickets.Any())
            {
                var tickets = new List<Ticket>
                {
                    new Ticket
                    {
                        Title = "Software A Bug 1",
                        Description = "Glitches in UI",
                        Category = "Software A",
                        SubmissionDate = DateTime.Now.AddMonths(-1),
                        SubmitterId = "b",
                        TeamId = context.Teams.FirstOrDefault().Id.ToString()
                    },
                    new Ticket
                    {
                        Title = "Software B Bug 1",
                        Description = "Bug during initialization.",
                        Category = "Software B",
                        SubmissionDate = DateTime.Now.AddMonths(-2),
                        SubmitterId = "b",
                        TeamId = context.Teams.FirstOrDefault().Id.ToString()
                    },
                    new Ticket
                    {
                        Title = "Software A Bug 2",
                        Description = "Freezing up at times.",
                        Category = "Software A",
                        SubmissionDate = DateTime.Now.AddMonths(-3),
                        SubmitterId = "a",
                        TeamId = context.Teams.FirstOrDefault().Id.ToString()
                    },
                    new Ticket
                    {
                        Title = "Software B Bug 2",
                        Description = "Slow to respond with many tasks.",
                        Category = "Software B",
                        SubmissionDate = DateTime.Now.AddMonths(-4),
                        SubmitterId = "a",
                        TeamId = context.Teams.FirstOrDefault().Id.ToString()
                    }
                };

                await context.Tickets.AddRangeAsync(tickets);

                await context.SaveChangesAsync();
            }
        }
    }
}