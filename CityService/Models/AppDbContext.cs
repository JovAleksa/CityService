using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CityService.Models
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<City> Citys { get; set; }
        public DbSet<Country> Countrys { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<City>().HasData(
                new City() { Id = 1, Name = "Novi Sad", Zip = 21000, PopulationNumber=450000, CountryId=1 },
                new City() { Id = 2, Name = "London", Zip = 11000, PopulationNumber = 1450000, CountryId = 2 },
                new City() { Id = 3, Name = "New York", Zip = 18000, PopulationNumber = 250000, CountryId=3 }
            );

            modelBuilder.Entity<Country>().HasData(
                new Country()
                {
                    Id = 1,
                    Name = "Serbia",
                    StateCode = 200,
                    
                },
                new Country()
                {
                    Id = 2,
                    Name = "England",
                    StateCode = 100,
                },
                new Country()
                {
                    Id = 3,
                    Name = "USA",
                    StateCode = 300,
                    
                },
                new Country()
                {
                    Id = 4,
                    Name = "Rusia",
                    StateCode = 400,
                }
            );

            base.OnModelCreating(modelBuilder);
        }

    }
}
