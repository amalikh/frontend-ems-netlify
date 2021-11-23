import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EmployeeModel } from '../../layout/employee/employee.model';
import { ApiService } from '../../shared/api.service';
import { routerTransition } from '../../router.animations';
import { Leave } from './leave.model';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css'],
  animations: [routerTransition()]
})
export class LeaveComponent implements OnInit {

  createleave: FormGroup;
  leaveModelObj: Leave = new Leave();
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employees: string[];

  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,


  ) { }

  ngOnInit(): void {

this.getAllEmployee();
    this.createleave = this.formbuilder.group({
      category: [''],
      designation: [''],
      leave_type:[''],
      from_date: [''],
      to_date: [''],
      description: [''],
      employees_id: ['']
    })
  }

  getFontSize() {
    return 13
  }
  getAllEmployee() {
    this.api.getAllEmployee()
      .subscribe(res => {
        this.employees = res;
      })
  }

  addLeave(){
  const fromDate = formatDate(this.createleave.value.from_date, 'yyyy-MM-dd', 'en-US');
  const toDate = formatDate(this.createleave.value.to_date, 'yyyy-MM-dd', 'en-US');
  
    this.leaveModelObj.category = this.createleave.value.category;
    this.leaveModelObj.designation = this.createleave.value.designation;
    this.leaveModelObj.leave_type = this.createleave.value.leave_type;
    this.leaveModelObj.from_date = fromDate;
    this.leaveModelObj.to_date = toDate;
    this.leaveModelObj.employees_id = this.createleave.value.employees_id;
  
    // console.log(this.leaveModelObj);
    this.api.postLeave(this.leaveModelObj)
    .subscribe(res =>{
      console.log(res);
      alert("Add successfully");
      
    },
    err =>{
      alert("something wrong");
    });
  
  }

  cancelBtn(){
    let ref = document.getElementById('cancel')
        ref?.click();
        this.createleave.reset();
  }

}
