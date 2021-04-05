using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CarServiceApi.Models
{
    public class CarMark
    {
        [Key]
        public int Id { get; set; }

        public int mark { get; set; }

        public string UserId { get; set; }
        public int CarId { get; set; }
    }
}
