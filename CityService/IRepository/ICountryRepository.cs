using CityService.Models;
using System.Collections.Generic;
using System.Linq;

namespace CityService.IRepository
{
    public interface ICountryRepository
    {
        IEnumerable<Country> GetAll();
        Country GetById(int id);
        void Add(Country country);
        void Update(Country country);
        void Delete(Country country);
    }
}
