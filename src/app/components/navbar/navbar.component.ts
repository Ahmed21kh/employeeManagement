import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HotToastService } from "@ngneat/hot-toast";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService:AuthService , public toast:HotToastService, public router:Router) { }

  ngOnInit(): void {
  }
 logout(){
  this.authService.logout().pipe(
    this.toast.observe({
      success:'You are logout successfully :)',
      loading:'Signing up...',
      error:({message})=>`${message}`
    })
  ).subscribe(()=>{

    this.router.navigate([''])
  })

 }
}
