import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../shared/api.service';
import { Payroll } from '../payroll/payroll.model';


@Component({
  selector: 'app-payroll-dialog',
  templateUrl: './payroll-dialog.component.html',
  styleUrls: ['./payroll-dialog.component.css']
})
export class PayrollDialogComponent implements OnInit {

  createPayroll: FormGroup;
  basic_pay: string;
  employees: string[];
  payrollModelObj: Payroll = new Payroll();


  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<PayrollDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.basic_pay = data.basic_pay;
  }

  ngOnInit(): void {
    this.getAllEmployee();

    this.createPayroll = this.formbuilder.group({
      basic_pay: [this.basic_pay, []],
      allowance: [''],
      current_salary: [''],
      last_increment: [''],
      last_increment_date: [''],
      last_salary_release_date: [''],
      employees_id: ['']
    });
  }

  getAllEmployee() {
    this.api.getAllEmployee()
      .subscribe(res => {
        this.employees = res;
      })
  }

  // save() {
  //   this.dialogRef.close(this.createPayroll.value);
  // }

  save(){
    const fromDate = formatDate(this.createPayroll.value.last_increment_date, 'yyyy-MM-dd', 'en-US');
    const toDate = formatDate(this.createPayroll.value.last_salary_release_date, 'yyyy-MM-dd', 'en-US');
    
      this.payrollModelObj.basic_pay = this.createPayroll.value.basic_pay;
      this.payrollModelObj.allowance = this.createPayroll.value.allowance;
      this.payrollModelObj.current_salary = this.createPayroll.value.current_salary;
      this.payrollModelObj.last_increment = this.createPayroll.value.last_increment;
      this.payrollModelObj.last_increment_date = fromDate;
      this.payrollModelObj.last_salary_release_date = toDate;
      this.payrollModelObj.employees_id = this.createPayroll.value.employees_id;
    
      console.log(this.payrollModelObj);
      this.api.postPayroll(this.payrollModelObj)
      .subscribe(res =>{
        console.log(res);
        alert("Added payroll successfully");
      },
      err =>{
        alert("something wrong");
      });
    
    }


  close() {
    this.dialogRef.close();
  }

}
