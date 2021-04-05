using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarServiceApi.Models
{
    public enum UserRole { Registred, CarAdmin, AirlineAdmin, SystemAdmin, NonRegistred }
    public enum StatusFriendRequest { Accepted, OnWait}
}
