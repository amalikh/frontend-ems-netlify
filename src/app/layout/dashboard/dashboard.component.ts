import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { threadId } from 'worker_threads';
import { UserModel } from '../../dashboard.model';
import { ApiService } from '../../shared/api.service';
import { EmployeeEditDialogComponent } from '../employee-edit-dialog/employee-edit-dialog.component';
// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeModel } from '../employee/employee.model';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  closeModal: string;
  totalEmployees:any;
  totalAttendance:any;
  totalLeave:any;
  totalActiveEmployees:any;
  activeEmployeeData:any;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData: any;
  showAdd: boolean;
  showUpdate: boolean;
  name = '';
  ToastText = '';

  baseurl = "https://em-system-heroku.herokuapp.com/"
  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
    public router: Router,
    private dialog: MatDialog,
    private modalService: NgbModal,
    private _snackBar: MatSnackBar

  ) {
    this.api.getusername()
    .subscribe(data => this.name = data.toString(),
      error => this.router.navigate(['/login']))
  }

  ngOnInit(): void {

    this.getAllEmployee();
    this.getAllAttendance();
    this.getAllLeave();
    this.getAllActiveEmployee();
  }
  clickAddEmployee() {
    // this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  // postEmployeeDetails() {
  //   this.employeeModelObj.name = this.formValue.value.name;
  //   this.employeeModelObj.email = this.formValue.value.email;
  //   this.employeeModelObj.password = this.formValue.value.password;
  //   this.api.postEmployee(this.employeeModelObj)
  //     .subscribe(res => {
  //       console.log(res);
  //       alert("Added successfully");
  //       let ref = document.getElementById('cancel')
  //       ref?.click();
  //       this.formValue.reset();
  //       this.getAllEmployee();

  //     },
  //       err => {
  //         alert("something went rong");
  //       })
  // }

  getAllEmployee() {
    this.api.getAllEmployee()
      .subscribe(res => {
        this.employeeData = res;
        this.totalEmployees = res.length;
      })
  }

  getAllAttendance() {
    this.api.getAllAttendance()
      .subscribe(res => {
        this.totalAttendance = res.length;
      })
  }
  getAllLeave() {
    this.api.getAllLeave()
      .subscribe(res => {
        this.totalLeave = res.length;
      })
  }

  getAllActiveEmployee(){
    this.api.getAllActiveEmployee()
    .subscribe(res => {
      this.activeEmployeeData = res;
      this.totalActiveEmployees = res.length;
    })
  }

  onEdit(item: any) {
    this.showAdd = false;
    this.showUpdate = true;


    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id:item.id,
      name: item.name,
      father_name: item.father_name,
      dob: item.dob,
      doj: item.doj,
      designation: item.designation,
      communication_add: item.communication_add,
      permanent_add: item.permanent_add,
      contact_no: item.contact_no,
      email: item.email,
      salary: item.salary,
    };
    // console.log(dialogConfig.data)
    this.dialog.open(EmployeeEditDialogComponent, dialogConfig);


  }


  onLogout() {
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }


  triggerModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ToastMsg(msg:any){
    this._snackBar.open(msg, '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    }

  deleteEmployee(item: any) {
    let is_active = false;
    this.api.deleteEmployee(is_active,item.id)
      .subscribe(res => {
        this.ToastText = 'Deleted Successfully'
        this.ToastMsg(this.ToastText);
        this.getAllActiveEmployee();
      })
  }

}
