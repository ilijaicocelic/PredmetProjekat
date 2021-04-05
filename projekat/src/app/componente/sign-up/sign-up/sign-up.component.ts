import { Component, OnInit } from '@angular/core';
import{ User} from 'src/app/entities/User/user';
import { UserService } from 'src/app/services/user-service/user.service';
import { Role} from 'src/app/entities/Enums/role.enum';
import { NgForm } from '@angular/forms';
import { RouterModule,Router }  from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  
  public name ="";
  public  surname="";
  public phone ="";
  public address = "";
  public email="";
  public password ="";
  public password2 = "";
  public username = "";


  constructor(private userService: UserService,private router : Router) { }

  ngOnInit(): void {
  }

  onSubmit()
  {
    
    let broj = 1;

    if(this.password !== this.password2)
    {
      alert("The passwords doesnt match please try again");
      
    }
    else if(this.name == "" || this.surname == "" || this.phone == "" || this.address == "" || this.email == "" || this.password == "" || this.username == "" || this.password2 == "")
    {
      alert("Sva polja su obavezna");
    }
    else
    {

      let id=4;
      let newUser = new User(this.username,this.name,this.surname,this.email,this.phone,this.address,Role.Registred,this.password);
      
      this.userService.Register(newUser).subscribe((res: any) => {
        alert(res.message);
        this.router.navigate(['/sign-in']);
      },
      err => {
        if (err.status == 400)
          alert('Incorrect data.');
        else
          console.log("err");
      });
    }
  }
}
