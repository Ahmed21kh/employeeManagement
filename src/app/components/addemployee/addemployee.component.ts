import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/Employee';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { timeout } from 'rxjs-compat/operator/timeout';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {
  firstName=""
  lastName=""
  email=""
  country=""
  city=""
  phone=""
  disableSalary=true
  verifyForm=""
  itemarray :any=[];
  employee:Employee={
    firstName:"",
    lastName:"",
    email:"",
    country:"",
    city:"",
    phone:"",
    salary:"",
  }

  constructor(public employeeService :EmployeeService , public flashMessagesService :FlashMessagesService, public router:Router) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(employee=>{
      employee.forEach(action=>{
        let emp:any = action.payload.toJSON()
        emp["$key"]=action.key
        this.itemarray.push(emp as Employee )
      });


    });






  }
  mySubmit(fo:NgForm)
  {
    if(this.disableSalary){
      fo.value.salary=2000
    }
    if(!fo.valid){
         this.flashMessagesService.show('Please write correct info ',{cssClass:'alert-danger',timeout:6000});
         this.router.navigate(['add-employee']);
      // this.verifyForm = fo.value;
      // console.log( this.verifyForm);

    }else
    {
      this.employeeService.addEmployees(fo.value);
      this.flashMessagesService.show('Thanks new employee added successfuly ! ',{cssClass:'alert-success',timeout:6000});
      this.router.navigate([''])
      console.log("false");
    }




  }

}
