import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EmployeeModel } from '../../layout/employee/employee.model';
import { ApiService } from '../../shared/api.service';
import { routerTransition } from '../../router.animations';
import { Leave } from './leave.model';
import { formatDate } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalDataComponent } from '../modal-data/modal-data.component';
import { LeaveModalDataComponent } from '../leave-modal-data/leave-modal-data.component';
import { MatSnackBar } from '@angular/material/snack-bar';


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
  leaveData: any;
  ToastText = '';
  isLoading: Boolean = true

  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {

    this.getAllLeaves();
    this.getAllEmployee();
    this.createleave = this.formbuilder.group({
      status: [''],
      designation: [''],
      leave_type: [''],
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
        this.isLoading = false
      })
  }

  addLeave() {
    const fromDate = formatDate(this.createleave.value.from_date, 'yyyy-MM-dd', 'en-US');
    const toDate = formatDate(this.createleave.value.to_date, 'yyyy-MM-dd', 'en-US');

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

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.afterAllClosed.subscribe(data => this.myLoadingFunction())
    dialogConfig.data = {
      type: 'add'

    };
    this.dialog.open(LeaveModalDataComponent, dialogConfig);
  }

  getAllLeaves() {
    this.api.getAllLeave()
      .subscribe(res => {
        this.leaveData = res;
        console.log(this.leaveData);
      })
  }

  onEdit(item: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.afterAllClosed.subscribe(data => this.myLoadingFunction())
    dialogConfig.data = {
      type: 'edit',
      id: item.id,
      employees_id: item.employees_id,
      name: item.employee.name,
      status: item.status,
      designation: item.employee.designation,
      leave_type: item.leave_type,
      from_date: item.from_date,
      to_date: item.to_date,
      description: item.description,
    };
    console.log(dialogConfig.data)
    this.dialog.open(LeaveModalDataComponent, dialogConfig);
  }


  myLoadingFunction() {
    this.ngOnInit();
  }

  ToastMsg(msg: any) {
    this._snackBar.open(msg, '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  changeStatus(id: number, status: any) {
    console.log(id, status)
    this.api.updateLeaveStatus(status, id)
      .subscribe(res => {
        console.log(status);
        this.ToastText = 'Accepted'
        this.ToastMsg(this.ToastText);
        this.getAllLeaves();
      })
  }
}
