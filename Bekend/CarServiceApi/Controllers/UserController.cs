using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

using Newtonsoft.Json;
using CarServiceApi.Baza;
using CarServiceApi.Models;

namespace CarServiceApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserManager<User> _userManager;
        private BazaContext _context;
        private readonly ApplicationSettings _appSettings;
        public UserController(UserManager<User> userManager, IOptions<ApplicationSettings> appSettings, BazaContext bz)
        {
            this._userManager = userManager;
            _appSettings = appSettings.Value;
            _context = bz;
        }

        // GET: api/User
        [HttpGet]
        public async Task<Object> Get()
        {
            var userr = _userManager.FindByEmailAsync("superadmin@gmail.com");
            if (userr.Result == null)
            {
                var user = new User()
                {
                    UserName = "superadmin",
                    Role = UserRole.SystemAdmin,
                    PhoneNumber = "000000000000",

                    Name = "superadmin",
                    Surname = "superadmin",
                    Address = "superadmin",
                    Email = "superadmin@gmail.com"

                };
                try
                {
                    var result = await _userManager.CreateAsync(user, "password");


                }
                catch (Exception ex)
                {
                    throw ex;
                }


            }
            return new string[] { "value1", "value2" };
        }



        [HttpPost]
        [Route("Register")]
        public async Task<Object> Register(UserSignUp model)
        {
            var kk = await _userManager.FindByEmailAsync(model.Email);
            if (kk == null)
            {
                var applicationUser = new User()
                {
                    UserName = model.Username,
                    Email = model.Email,
                    Name = model.Name,
                    Surname = model.Surname,
                    PhoneNumber = model.PhoneNumber,
                    Address = model.Address,
                    Role = UserRole.Registred,
                };

                try
                {

                    var result = await _userManager.CreateAsync(applicationUser, model.Password);
                    if (result.Succeeded)
                    {
                        var token = await _userManager.GenerateEmailConfirmationTokenAsync(applicationUser);
                        Email.SendEmail(token, applicationUser);
                    }
                    return Ok(new { message = "Succesfuly registred" });
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            else
            {
                return BadRequest(new { message = "Email already exist" });
            }
        }


        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetUserProfileInfo")]
        public async Task<Object> GetUserProfileInfo()
        {
            string UserId = User.Claims.First().Value;
            var user = await _userManager.FindByIdAsync(UserId);
            UserSignUp userinfo = new UserSignUp();
            userinfo.PhoneNumber = user.PhoneNumber;
            userinfo.Surname = user.Surname;
            userinfo.Username = user.UserName;
            userinfo.Name = user.Name;
            userinfo.Email = user.Email;
            userinfo.Address = user.Address;
            userinfo.isConfirmed = user.isConfirmed;
            return Ok(new { userinfo });
        }

        [HttpPost]
        [Route("ConfirmEmail")]

        public async Task<string> ConfirmEmail([FromForm] string userId, [FromForm] string token)
        {

            var IDDecoded = WebEncoders.Base64UrlDecode(userId);
            var userId1 = Encoding.UTF8.GetString(IDDecoded);

            var TokenDecoded = WebEncoders.Base64UrlDecode(token);
            var Token1 = Encoding.UTF8.GetString(TokenDecoded);
            var user = await _userManager.FindByIdAsync(userId1);

            if (user == null)
            {
                return "User doesnt exist";
            }

            var result = await _userManager.ConfirmEmailAsync(user, Token1);
            if (result.Succeeded)
            {
                return "Succesfully verified email go to http://localhost:4200/sign-in to sign in";
            }

            return "Error";
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetOtherUsers")]
        public async Task<Object> GetOtherUsers()
        {
            string UserId = User.Claims.First().Value;

            List<User> allOtherUsers = _context.Users.Where(x => x.Id != UserId && x.Role == UserRole.Registred).ToList();


            List<int> indexs = new List<int>();


            for (int i = indexs.Count - 1; i >= 0; i--)
            {
                allOtherUsers.RemoveAt(indexs[i]);
            }
            return Ok(new { allOtherUsers });
        }















        [HttpPost]
        [Route("Login")]
        //POST : /api/User/Login
        public async Task<IActionResult> Login(LoginModel model)
        {
            if (model.Password == null)
            {
                return BadRequest(new { message = "Bad data" });
            }
            if (model.Password.Length < 6)
            {
                return BadRequest(new { message = "Bad data" });
            }
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserId",user.Id.ToString()),
                        new Claim("Roles", user.Role.ToString()),
                     }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);

                return Ok(new { token });
            }
            else
                return BadRequest(new { message = "Username or password is incorrect." });
        }


        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("AddingAdmin")]
        public async Task<IActionResult> AddingAdmin(AddAdmin userModel)
        {
            string role = User.Claims.ElementAt(1).Value;
            if (role != UserRole.SystemAdmin.ToString())
            {
                return BadRequest(new { message = "Bad data" });

            }
            var applicationUser = new User()
            {
                UserName = userModel.AdminUsername,
                Email = userModel.Email,
                Name = "",
                Surname = "",
                PhoneNumber = "",
                Address = userModel.Address,
            };

            //if (userModel.TypeOfCompany == "airline")
            //{
            //    Airline air = new Airline();
            //    air.Adress = userModel.Address;
            //    air.Description = userModel.Description;
            //    air.CompanyName = userModel.CompanyName;
            //    applicationUser.Role = UserRole.AirlineAdmin;

            //    try
            //    {
            //        var result = await _userManager.CreateAsync(applicationUser, userModel.Email);
            //        var kk1 = await _userManager.FindByEmailAsync(userModel.Email);
            //        kk1.AirlineComnpany = air;

            //        _context.Entry(kk1).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            //        await _context.SaveChangesAsync();
            //        return Ok(new { message = "Succesfuly added ! " });
            //    }
            //    catch (Exception ex)
            //    {
            //        return BadRequest(new { Message = "Invalid Data" });
            //        throw ex;

            //    }
            //}
            //else
            //{
            RentCarCompany carC = new RentCarCompany();
            carC.Adress = userModel.Address;
            carC.Description = userModel.Description;
            carC.CompanyName = userModel.CompanyName;
            applicationUser.Role = UserRole.CarAdmin;

            try
            {
                var result = await _userManager.CreateAsync(applicationUser, userModel.Email);
                var kk1 = await _userManager.FindByEmailAsync(userModel.Email);
                kk1.CarCompany = carC;

                _context.Entry(kk1).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                await _context.SaveChangesAsync();
                return Ok(new { message = "Succesfuly added ! " });

            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Invalid Data" });
                throw ex;
            }
            //}

        }


        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("SaveProfileInfoChanges")]
        public async Task<IActionResult> SaveProfileInfoChanges(UserSignUp userModel)
        {
            if (userModel.Username == "" || userModel.Username == null)
            {
                return BadRequest(new { message = "Bad data" });
            }
            if (userModel.Email == "" || userModel.Email == null)
            {
                return BadRequest(new { message = "Bad data" });
            }
            if (userModel.Name == "" || userModel.Name == null)
            {
                return BadRequest(new { message = "Bad data" });
            }
            if (userModel.Surname == "" || userModel.Surname == null)
            {
                return BadRequest(new { message = "Bad data" });
            }
            if (userModel.Address == "" || userModel.Address == null)
            {
                return BadRequest(new { message = "Bad data" });
            }
            var user = await _userManager.FindByEmailAsync(userModel.Email);
            if (user != null)
            {
                user.UserName = userModel.Username;
                user.PhoneNumber = userModel.PhoneNumber;
                user.Address = userModel.Address;
                user.Name = userModel.Name;
                user.Surname = userModel.Surname;
                if (userModel.NewPassword.Length >= 6)
                {
                    if (await _userManager.CheckPasswordAsync(user, userModel.Password))
                    {
                        if (userModel.NewPassword == userModel.ConfirmPassword)
                        {
                            var result = await _userManager.ChangePasswordAsync(user, userModel.Password, userModel.NewPassword);
                        }
                        else
                        {
                            return BadRequest(new { message = "Passwords are mismatched." });
                        }
                    }
                    else
                    {
                        return BadRequest(new { message = "Password is incorrect." });
                    }
                }

                _context.Entry((User)user).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                await _context.SaveChangesAsync();
                return Ok(new { message = "Successfully changed." });
            }
            else
            {
                return BadRequest();
            }
        }



        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetCarAdmins")]
        public async Task<Object> GetCarAdmins()
        {
            var users = _context.Users.Include(x => x.CarCompany).Where(x => x.Role == UserRole.CarAdmin).ToList();
            return Ok(new { users });
        }




        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetCarReservations")]
        public async Task<Object> GetCarReservations()
        {
            string userId = User.Claims.ElementAt(0).Value;
            //var user = _context.Users.Include(x => x.CarReservations).Where(x => x.Id == userId).ToList().First();
            //var reservations = user.CarReservations.ToList();

            var reservations = _context.CarReservations.Where(x => x.UserId == userId).ToList();

            foreach (var res in reservations)
            {
                if ((res.ReturnDate - DateTime.Now).TotalHours < 0 && res.IsOver == false)
                {
                    res.IsOver = true;
                    res.CancellingIsOver = true;
                    _context.Entry(res).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    var result = await _context.SaveChangesAsync();
                }
                else if ((res.PickupDate - DateTime.Now).TotalHours < 48 && res.CancellingIsOver == false)
                {

                    res.CancellingIsOver = true;
                    _context.Entry(res).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    var result = await _context.SaveChangesAsync();
                }
            }

            return Ok(new { reservations });
        }










        private const string GoogleApiTokenInfoUrl = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={0}";
        public bool VerifyToken(string providerToken)
        {
            var httpClient = new HttpClient();
            var requestUri = new Uri(string.Format(GoogleApiTokenInfoUrl, providerToken));

            HttpResponseMessage httpResponseMessage;

            try
            {
                httpResponseMessage = httpClient.GetAsync(requestUri).Result;
            }
            catch (Exception)
            {
                return false;
            }

            if (httpResponseMessage.StatusCode != HttpStatusCode.OK)
            {
                return false;
            }

            var response = httpResponseMessage.Content.ReadAsStringAsync().Result;
            var googleApiTokenInfo = JsonConvert.DeserializeObject<GoogleApiToken>(response);

            return true;
        }


        [HttpPost]
        [Route("GoogleLogin")]
        // POST: api/<controller>/Login
        public async Task<IActionResult> GoogleLogin(GoogleModel model)
        {
            var test = _appSettings.JWT_Secret;
            if (VerifyToken(model.idToken))
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user == null)
                {
                    var applicationUser = new User()
                    {
                        UserName = model.name.Replace(' ', '_').ToLower().Replace('ć', 'c').Replace('č', 'c'),
                        Email = model.Email,
                        Name = model.firstName,
                        Surname = model.lastName,
                        Role = UserRole.Registred,
                    };

                    try
                    {
                        //   _context.Users.Add(applicationUser);
                        //    await _context.SaveChangesAsync();
                        await _userManager.CreateAsync(applicationUser);
                    }
                    catch (Exception ex)
                    {

                        throw ex;
                    }
                }
                user = await _userManager.FindByEmailAsync(model.Email);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserId",user.Id.ToString()),
                        new Claim("Roles", user.Role.ToString()),

                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            }

            return Ok();
        }

        [HttpPost]
        [Route("SaveFirstLoginChanges")]
        // POST: api/<controller>/Login
        public async Task<IActionResult> SaveFirstLoginChanges(UserSignUp model)
        {
            var user = _context.Users.Where(x => x.Id == model.UserId).ToList().First();


            if (model.NewPassword.Length >= 6)
            {
                if (await _userManager.CheckPasswordAsync(user, model.Password))
                {
                    if (model.NewPassword == model.ConfirmPassword)
                    {
                        var result = await _userManager.ChangePasswordAsync(user, model.Password, model.NewPassword);
                        user.isConfirmed = true;
                        _context.Entry((User)user).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                        await _context.SaveChangesAsync();

                        return Ok(new { message = "Successfully changed." });
                    }
                    else
                    {
                        return BadRequest(new { message = "Passwords are mismatched." });
                    }
                }
                else
                {
                    return BadRequest(new { message = "Password is incorrect." });
                }
            }

            return BadRequest(new { message = "Password is too short, needs at least 6 characters!" });

        }
    }
}
