using Microsoft.AspNetCore.WebUtilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using CarServiceApi.Models;

namespace CarServiceApi.Models
{
    public class Email
    {
        public static string senderEmail = "testkorisnik97@gmail.com";
        public static string senderpassword = "Mikipesadinac1";
        public static SmtpClient client = DefineSmtpClient();
        public static string AddressOfApi = "://localhost:51716/api/";
        public static void SendEmail(string token, User applicationUser)
        {
            byte[] tokenGeneratedBytes = Encoding.UTF8.GetBytes(token);
            var codeEncoded = WebEncoders.Base64UrlEncode(tokenGeneratedBytes);
            byte[] IDGeneratedBytes = Encoding.UTF8.GetBytes(applicationUser.Id);
            var IDEncoded = WebEncoders.Base64UrlEncode(IDGeneratedBytes);
            var confirmationLink = "http" + AddressOfApi + "User/ConfirmEmail";// + IDEncoded + "/" + codeEncoded;

            var body = "<div><form method=\"post\"  action=\"" + confirmationLink + "\"> " +
                "<input type=\"hidden\"  name=\"userId\" value=\"" + IDEncoded + "\"> " +
                "<input type=\"hidden\"  name=\"token\" value=\"" + codeEncoded + "\">" +
                "<input type=\"submit\" value=\"Click here to confirm mail\"></form></div>";
            MailMessage mailMessage = new MailMessage(senderEmail, applicationUser.Email, "Confirm email", body);
            mailMessage.IsBodyHtml = true;
            mailMessage.BodyEncoding = UTF8Encoding.UTF8;
            client.Send(mailMessage);
        }
        

        
      

        public static SmtpClient DefineSmtpClient()
        {
            if (client == null)
            {
                SmtpClient client = new SmtpClient("smtp.gmail.com", 587);
                client.EnableSsl = true;
                client.Timeout = 100000;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential(senderEmail, senderpassword);
                return client;
            }
            else
                return client;

        }

    }
}
