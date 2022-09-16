import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/Employee';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute , ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.css']
})
export class EditemployeeComponent implements OnInit {
  id:any;
  employee:Employee={
    firstName:"",
    lastName:"",
    email:"",
    country:"",
    city:"",
    phone:"",
    salary:"",
  }
  disableSalaryEdit:boolean=true
  disableSalary: any;


  constructor(public employeeService:EmployeeService , public router:Router , public activatedRoute:ActivatedRoute, public flashMessagesService:FlashMessagesService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    this.employeeService.getEmployee(this.id).subscribe((action:any)=>{
      let emp:any=action.payload.toJSON()
      emp['$key']=action.key

      this.employee = emp
      console.log(emp);

    })
  }
  mySubmit(fo:NgForm)
  {

    if(!fo.valid){
         this.flashMessagesService.show('Please write correct info ',{cssClass:'alert-danger',timeout:6000});
         this.router.navigate(['edit-employee/'+ this.id]);
      // this.verifyForm = fo.value;
      // console.log( this.verifyForm);

    }else
    {
      this.employeeService.ubdateEmployee(this.id, fo.value);
      this.flashMessagesService.show(' Employee updated successfuly ! ',{cssClass:'alert-success',timeout:6000});
      this.router.navigate(['employee/'+ this.id])
      console.log("false");
    }




  }
}
