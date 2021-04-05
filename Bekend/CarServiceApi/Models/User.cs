using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CarServiceApi.Models
{
    public class User : IdentityUser
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Address { get; set; }
        public UserRole Role { get; set; }

        
        
       
        
        public RentCarCompany CarCompany { get; set; }

        public ICollection<CarReservation> CarReservations { get; set; }

        
        
        


        

        public ICollection<CarMark> CarMarks { get; set; }

        public bool isConfirmed { get; set; }


    }
}
