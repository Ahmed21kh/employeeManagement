import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService:AuthService , public router:Router) { }

  ngOnInit(): void {
  }
 logout(){
  this.authService.logout().subscribe(()=>{
    this.router.navigate([''])
  })

 }
}