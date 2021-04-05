using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CarServiceApi.Models
{
    public class RentCarCompany
    {
        [Key]
        public int Id{ get; set; }
        public string Description { get; set; }
        public string CompanyName { get; set; }
        public string Adress { get; set; }

        public int Mark { get; set; }

        public ICollection<Car> Cars { get; set; }

        




    }
}
