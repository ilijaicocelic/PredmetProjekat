using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AirlineApi.Models
{
    public class AddAdmin
    {
        public string  CompanyName { get; set; }
        public string   Description { get; set; }
        public string  AdminUsername { get; set; }
        public string  Address { get; set; }
        public string  TypeOfCompany { get; set; }

        public string Email { get; set; }
    }
}
