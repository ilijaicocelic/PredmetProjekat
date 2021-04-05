import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/entities/user/user';
import { element } from 'protractor';

import * as jwt_decode from "jwt-decode";
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
    id:number;
    user: User;
    SearchFriend = "";
    OtherUser = new Array<User>();
    Friends = new Array<User>();
    FriendRequests = new Array<User>();
    FriendSentRequests = new Array<User>();
    temp:boolean

    FilteredFriend= new Array<User>();
    FilteredFriendRequest= new Array<User>();
    FilteredFriendSentRequest= new Array<User>();
    FilteredOtherUsers= new Array<User>();
  
  constructor(private userService :UserService,private route: ActivatedRoute) { 
    this.userService.GetUserProfileInfo().subscribe((res: any) => {
      this.user = new User(res.userinfo.username,res.userinfo.name,res.userinfo.surname,res.userinfo.email,res.userinfo.phoneNumber,res.userinfo.address,0,"");
    });

    this.GetFriends();
    this.GetFriendRequests();
    this.GetFriendSentRequest();
    this.GetOtherUsers();
  }

  GetFriends(){
    this.Friends.length=0;
    this.userService.GetFriends().subscribe((res: any) => {
      for (let i = 0; i < res.friends.length; i++) {
        var user= new User(res.friends[i].username,res.friends[i].name,res.friends[i].surname,res.friends[i].email,res.friends[i].phoneNumber,res.friends[i].address,res.friends[i].role,"");
        user.id=res.friends[i].id;
        this.Friends.push(user);
      }
      if(this.SearchFriend != ""){
        this.Search();
      }
    });
  }

  GetFriendRequests(){
    this.FriendRequests.length=0;
    this.userService.GetFriendRequests().subscribe((res: any) => {
      for (let i = 0; i < res.users.length; i++) {
        var user= new User(res.users[i].username,res.users[i].name,res.users[i].surname,res.users[i].email,res.users[i].phoneNumber,res.users[i].address,res.users[i].role,"");
        user.id=res.users[i].id;
        this.FriendRequests.push(user);
      }
      if(this.SearchFriend != ""){
        this.Search();
      }
    });
  }

  GetOtherUsers(){
    this.OtherUser.length=0;
    this.userService.GetOtherUsers().subscribe((res: any) => {
      for (let i = 0; i < res.allOtherUsers.length; i++) {
        var user= new User(res.allOtherUsers[i].username,res.allOtherUsers[i].name,res.allOtherUsers[i].surname,res.allOtherUsers[i].email,res.allOtherUsers[i].phoneNumber,res.allOtherUsers[i].address,res.allOtherUsers[i].role,"");
        user.id=res.allOtherUsers[i].id
        this.OtherUser.push(user);
      }
      if(this.SearchFriend != ""){
        this.Search();
      }
    });
  }

  GetFriendSentRequest(){
    this.FriendSentRequests.length=0;
    this.userService.GetFriendSentRequest().subscribe((res: any) => {
      for (let i = 0; i < res.users.length; i++) {
        var user= new User(res.users[i].username,res.users[i].name,res.users[i].surname,res.users[i].email,res.users[i].phoneNumber,res.users[i].address,res.users[i].role,"");
        user.id=res.users[i].id;
        this.FriendSentRequests.push(user);
      }
      if(this.SearchFriend != ""){
        this.Search();
      }
    });
  }

  ngOnInit(): void {
  }

  AcceptFriendRequest(friend: User){
      this.userService.AcceptFriendRequest(friend.id).subscribe((res: any) => {
        this.GetFriends();
        this.GetFriendRequests();
        this.GetFriendSentRequest();
        this.GetOtherUsers();
    });
  }

  RemoveFriend(friend: User){
    this.userService.RemoveFriend(friend.id).subscribe((res: any) => {
      this.GetFriends();
      this.GetFriendRequests();
      this.GetFriendSentRequest();
      this.GetOtherUsers();
    });
  }

  DeleteRequest(friend){
    this.userService.DeleteRequest(friend.id).subscribe((res: any) => {
      this.GetFriends();
      this.GetFriendRequests();
      this.GetFriendSentRequest();
      this.GetOtherUsers();
    });
  }

  SendRequest(user : User){
    this.userService.SendRequest(user.id).subscribe((res: any) => {
      this.GetFriends();
      this.GetFriendRequests();
      this.GetFriendSentRequest();
      this.GetOtherUsers();
    });
  }

  CancelRequest(user){
    this.userService.CancelRequest(user.id).subscribe((res: any) => {
      this.GetFriends();
      this.GetFriendRequests();
      this.GetFriendSentRequest();
      this.GetOtherUsers();
    });
  }

  Search(){
    this.FilteredFriend = new Array<User>();
    this.FilteredOtherUsers= new Array<User>();
    this.FilteredFriendSentRequest = new Array<User>();
    this.FilteredFriendRequest = new Array<User>();

    if(this.SearchFriend==""){
      alert("Neuspesna pretraga")
      this.FilteredFriend.length=0;
      this.FilteredOtherUsers.length=0;
      this.FilteredFriendSentRequest.length=0;
      this.FilteredFriendRequest.length=0;
      return;
    }

    this.Friends.forEach((element, index) => {
      let NameAndSurname=element.name.toUpperCase() + ' ' +  element.surname.toUpperCase();
      if(NameAndSurname.includes(this.SearchFriend.toUpperCase())){
        this.FilteredFriend.push(element);
      }
    });

    this.FriendSentRequests.forEach((element, index) => {
      let NameAndSurname=element.name.toUpperCase() + ' ' +  element.surname.toUpperCase();
      if(NameAndSurname.includes(this.SearchFriend.toUpperCase())){
        this.FilteredFriendSentRequest.push(element);
      }
    });

    this.FriendRequests.forEach((element, index) => {
      let NameAndSurname=element.name.toUpperCase() + ' ' +  element.surname.toUpperCase();
      if(NameAndSurname.includes(this.SearchFriend.toUpperCase())){
        this.FilteredFriendRequest.push(element);
      }
    });

    this.OtherUser.forEach((element, index) => {
      let NameAndSurname=element.name.toUpperCase() + ' ' +  element.surname.toUpperCase();
      if(NameAndSurname.includes(this.SearchFriend.toUpperCase())){
        this.FilteredOtherUsers.push(element);
      }
    });
  }
}
