import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Payroll } from '../payroll/payroll.model';
import { ApiService } from '../../shared/api.service';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-modal-data',
  templateUrl: './modal-data.component.html',
  styleUrls: ['./modal-data.component.css']
})
export class ModalDataComponent implements OnInit {

  createPayroll: FormGroup;
  employees: string[];
  payrollModelObj: Payroll = new Payroll();
  isEdit: Boolean = false

  constructor(private formbuilder: FormBuilder, private api: ApiService, @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data['type'] == 'edit') {
      this.isEdit = true
    }
  }

  ngOnInit(): void {
    this.createPayroll = this.formbuilder.group({
      basic_pay: [''],
      allowance: [''],
      current_salary: [''],
      last_increment: [''],
      last_increment_date: [''],
      last_salary_release_date: [''],
      employees_id: ['']
    });

    this.getAllEmployee();

    if (this.isEdit) {
      console.log("I am here")
      this.createPayroll.setValue({
        employees_id: this.data.id,
        basic_pay: this.data.basic_pay,
        allowance: this.data.allowance,
        current_salary: this.data.current_salary,
        last_increment: this.data.last_increment,
        last_increment_date: this.data.last_increment_date,
        last_salary_release_date: this.data.last_salary_release_date
      });
    }
  }

  getAllEmployee() {
    this.api.getAllEmployee()
      .subscribe(res => {
        this.employees = res;
      })
  }

  save() {
    let fromDate = formatDate(this.createPayroll.value.last_increment_date, 'yyyy-MM-dd', 'en-US');
    let toDate = formatDate(this.createPayroll.value.last_salary_release_date, 'yyyy-MM-dd', 'en-US');

    this.payrollModelObj.basic_pay = this.createPayroll.value.basic_pay;
    this.payrollModelObj.allowance = this.createPayroll.value.allowance;
    this.payrollModelObj.current_salary = this.createPayroll.value.current_salary;
    this.payrollModelObj.last_increment = this.createPayroll.value.last_increment;
    this.payrollModelObj.last_increment_date = fromDate;
    this.payrollModelObj.last_salary_release_date = toDate;
    this.payrollModelObj.employees_id = this.createPayroll.value.employees_id;

    console.log(this.payrollModelObj);
    this.api.postPayroll(this.payrollModelObj)
      .subscribe(res => {
        console.log(res);
        alert("Added payroll successfully");
        // let ref = document.getElementById('cancel')
        // ref?.click();
      },
        err => {
          alert("something wrong");
        });

  }
}
