import { Component, Input, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DataService } from '../../shared/services/data.service'
import { MatDialog } from '@angular/material/dialog';
import { RouterOutlet, Router, ActivationStart } from '@angular/router';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { EmployeeModel } from '../../layout/employee/employee.model';
import { MatRadioModule } from '@angular/material/radio';
import { Attendance } from './attendace.model';
import { formatDate } from '@angular/common';


export interface UserData {
  Id: string;
  Name: string;
  PresentStatus: string;
  InTime: string;
  OutTime: string;
}

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
  animations: [routerTransition()]
})
export class AttendanceComponent implements OnInit {
  @Input() name: string;
  emp_id: number;
  pstatus: string;
  status: string[] = ['Present', 'Absent', 'Off'];
  employeeModelObj: EmployeeModel = new EmployeeModel();
  attendanceModelObj: Attendance = new Attendance();
  formValue: FormGroup
  todaysDate = new Date();
  employeeData: any;
  selectedRow = {}
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  doa = formatDate(this.todaysDate, 'yyyy-MM-dd', 'en-US');

  displayedColumns: string[] = [
    'Id',
    'Name',
    'PresentStatus',
    'InTime',
    'OutTime',
    'Action'
  ];

  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  title: any;

  @ViewChild(RouterOutlet) outlet: RouterOutlet;

  existslist: any;


  constructor(
    private api: ApiService,
    private router: Router,
    public dialog: MatDialog,
    private formbuilder: FormBuilder

  ) { }

  ngOnInit(): void {
    this.getAllEmployee();
  
    this.router.events.subscribe(e => {
      if (e instanceof ActivationStart && e.snapshot.outlet === 'administration')
        this.outlet.deactivate();
    })
    

    this.formValue = this.formbuilder.group({
      status: [''],
      in_time: [''],
      out_time: [''],
      employees_id:['']
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();


    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // openEdit(row) {
  //   this.selectedRow = row
  //   const dialogRef = this.dialog.open(ExistingtaskDetailsComponent, {
  //     data: row
  //   });
  //   dialogRef.afterClosed().subscribe(
  //     data => {
  //       if (data) {
  //         this.dataservice.selectedTask = this.selectedRow
  //         this.router.navigate(['/newtask'], { queryParams: { isPreDefined: true } })
  //       }
  //     },
  //   );
  // }



  applyThis() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  cancel(row) {
    this.api.deleteEmployee(row.active_child)
      .subscribe(res => {
        this.getAllEmployee();
      })
  }

  refresh() {
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.api.getAllEmployee()
      .subscribe(res => {
        this.dataSource = res;
      })
  }

markAttendance(row: any){
  
  this.attendanceModelObj.status = this.formValue.value.status;
  this.attendanceModelObj.in_time = this.formValue.value.in_time;
  this.attendanceModelObj.out_time = this.formValue.value.out_time;
  this.attendanceModelObj.date_of_attendance = this.doa;
  this.attendanceModelObj.employees_id = row.id;

  // console.log(this.attendanceModelObj);
  this.api.postAttendance(this.attendanceModelObj)
  .subscribe(res =>{
    console.log(res);
    alert("Marked successfully");
  },
  err =>{
    alert("something went rong");
  });

}


}
