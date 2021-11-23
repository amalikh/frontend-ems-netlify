import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../shared/api.service';
import { EmployeeModel } from '../employee/employee.model';

@Component({
  selector: 'app-employee-edit-dialog',
  templateUrl: './employee-edit-dialog.component.html',
  styleUrls: ['./employee-edit-dialog.component.css']
})

export class EmployeeEditDialogComponent implements OnInit {

  formValue: FormGroup
  id = this.data.id;
  employees: string[];
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData: any;
  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<EmployeeEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { console.log(JSON.stringify(data)) }

  ngOnInit(): void {


    this.formValue = this.formbuilder.group({
      name: [''],
      father_name: [''],
      dob: [''],
      doj: [''],
      designation: [''],
      communication_add: [''],
      permanent_add: [''],
      contact_no: [''],
      email: [''],
      salary: ['']
    })
    this.formValue.setValue({
      name:this.data.name,
      father_name: this.data.father_name,
      dob: this.data.dob,
      doj: this.data.doj,
      designation: this.data.designation,
      communication_add: this.data.communication_add,
      permanent_add: this.data.permanent_add,
      contact_no: this.data.contact_no,
      email: this.data.email,
      salary: this.data.salary
    });
  }
  
  update() {
    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.father_name = this.formValue.value.fathername;
    this.employeeModelObj.dob = this.formValue.value.dob;
    this.employeeModelObj.doj = this.formValue.value.doj;
    this.employeeModelObj.designation = this.formValue.value.designation;
    this.employeeModelObj.communication_add = this.formValue.value.communication_add;
    this.employeeModelObj.permanent_add = this.formValue.value.permanent_add;
    this.employeeModelObj.contact_no = this.formValue.value.contact_no;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this.employeeModelObj.id = this.id;
    console.log(this.employeeModelObj);
    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
      .subscribe(res => {
        alert("Updated!");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      })
  }
  getAllEmployee() {
    this.api.getAllEmployee()
      .subscribe(res => {
        this.employeeData = res;
      })
  }
  close() {
    this.dialogRef.close();
  }
}
