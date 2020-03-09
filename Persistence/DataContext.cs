using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
/*
 * Data Context file used to interact with the database
 *
 * This file inherits AppUser entities from Identity Framework
 */
namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<TeamMember> TeamMembers { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Comment> Comments { get; set; }

        // Specify to Entity Framework how to build TeamMember object
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<TeamMember>(x => x.HasKey(tm =>
                new { tm.AppUserId, tm.TeamId }));

            builder.Entity<TeamMember>()
                .HasOne(t => t.AppUser)
                .WithMany(m => m.TeamMembers)
                .HasForeignKey(t => t.AppUserId);

            builder.Entity<TeamMember>()
                .HasOne(m => m.Team)
                .WithMany(t => t.TeamMembers)
                .HasForeignKey(a => a.TeamId);
        }
    }
}
