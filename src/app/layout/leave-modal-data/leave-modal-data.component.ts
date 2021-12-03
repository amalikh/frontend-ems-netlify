import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import { EmployeeModel } from '../employee/employee.model';
import { Leave } from '../leave/leave.model';

@Component({
  selector: 'app-leave-modal-data',
  templateUrl: './leave-modal-data.component.html',
  styleUrls: ['./leave-modal-data.component.css']
})
export class LeaveModalDataComponent implements OnInit {

  createleave: FormGroup;
  leaveModelObj: Leave = new Leave();
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employees: string[];
  leaveData: any;
  isEdit: Boolean = false
  showAdd: Boolean = true;
  showUpdate: boolean;
  ToastText = '';
  leaveType: string[] = ['sick', 'casual', 'annual', 'marriage'];
  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar

  ) {
    if (data['type'] == 'edit') {
      this.isEdit = true,
      this.showAdd = false,
      this.showUpdate = true
    }
   }

  ngOnInit(): void {

    this.getAllEmployee();
    this.createleave = this.formbuilder.group({
      // status: [''],
      leave_type: [''],
      from_date: [''],
      to_date: [''],
      description: [''],
      employees_id: ['']
    })

    if (this.isEdit) {
      console.log("I am here")
      console.log(this.data);
      this.createleave.setValue({
        employees_id: this.data.employees_id,
        status: this.data.status,
        leave_type: this.data.leave_type,
        from_date: this.data.from_date,
        to_date: this.data.to_date,
        description: this.data.description
      });
    }

  }

  getFontSize() {
    return 13
  }
  getAllEmployee() {
    this.api.getAllActiveEmployee()
      .subscribe(res => {
        this.employees = res;
      })
  }
  getAllLeaves() {
    this.api.getAllLeave()
      .subscribe(res => {
        this.leaveData = res;
        console.log(this.leaveData);
      })
  }
  addLeave() {

    const fromDate = formatDate(this.createleave.value.from_date, 'yyyy-MM-dd', 'en-US');
    const toDate = formatDate(this.createleave.value.to_date, 'yyyy-MM-dd', 'en-US');

    this.leaveModelObj.status = 'Pending';
    this.leaveModelObj.leave_type = this.createleave.value.leave_type;
    this.leaveModelObj.from_date = fromDate;
    this.leaveModelObj.to_date = toDate;
    this.leaveModelObj.description = this.createleave.value.description;
    this.leaveModelObj.employees_id = this.createleave.value.employees_id;

    // console.log(this.leaveModelObj);
    this.api.postLeave(this.leaveModelObj)
      .subscribe(res => {
        console.log(res);
        alert("Add successfully");
        this.createleave.reset();
      },
        err => {
          alert("something wrong");
        });
  }

  cancelBtn() {
    let ref = document.getElementById('cancel')
    ref?.click();
    this.createleave.reset();
  }

  update() {
    const fromDate = formatDate(this.createleave.value.from_date, 'yyyy-MM-dd', 'en-US');
    const toDate = formatDate(this.createleave.value.to_date, 'yyyy-MM-dd', 'en-US');

    this.leaveModelObj.status = this.createleave.value.status;
    this.leaveModelObj.leave_type = this.createleave.value.leave_type;
    this.leaveModelObj.from_date = fromDate;
    this.leaveModelObj.to_date = toDate;
    this.leaveModelObj.description = this.createleave.value.description;
    this.leaveModelObj.employees_id = this.createleave.value.employees_id;
    this.leaveModelObj.id = this.data.id;

    console.log(this.leaveModelObj);

    this.api.updateLeave(this.leaveModelObj, this.data.id)
      .subscribe(res => {
        this.ToastText = 'Updated Successfully'
        this.ToastMsg(this.ToastText);
        this.getAllLeaves();
        this.createleave.reset();
      })
  }
refresh(){
  this.getAllLeaves();
}
ToastMsg(msg:any){
  this._snackBar.open(msg, '', {
    duration: 2000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
  });
  }
}
