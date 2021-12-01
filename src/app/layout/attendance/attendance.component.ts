import { Component, Input, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DataService } from '../../shared/services/data.service'
import { MatDialog } from '@angular/material/dialog';
import { RouterOutlet, Router, ActivationStart } from '@angular/router';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { EmployeeModel } from '../../layout/employee/employee.model';
import { MatRadioModule } from '@angular/material/radio';
import { Attendance } from './attendace.model';
import { formatDate } from '@angular/common';
import { forkJoin } from "rxjs/observable/forkJoin";
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  ToastText = '';
  displayedColumns: string[] = [
    'Id',
    'Name',
    // 'PresentStatus',
    'Status',
    'InTime',
    'OutTime',
    'Action'
  ];
  totalActiveEmployees:any;
  activeEmployeeData:any;
  doa = formatDate(this.todaysDate, 'yyyy-MM-dd', 'en-US');

  dataSource: MatTableDataSource<UserData> = new MatTableDataSource([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  title: any;
  isLoaded: Boolean = false

  @ViewChild(RouterOutlet) outlet: RouterOutlet;

  existslist: any;
  public r1: any;
  public r2: any;


  constructor(
    private api: ApiService,
    private router: Router,
    public dialog: MatDialog,
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private _snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
    // this.getAllEmployee();
    // this.getAllAttendanceOfCurrentDate();

    this.combine();
    this.router.events.subscribe(e => {
      if (e instanceof ActivationStart && e.snapshot.outlet === 'administration')
        this.outlet.deactivate();
    })


    this.formValue = this.formbuilder.group({
      // status: ['', [Validators.required]],
      status: ['', [Validators.required]],
      in_time: [''],
      out_time: [''],
      employees_id: ['']
    })
    // this.formValue.setValue({
    //   in_time:a3.in_time
    // });


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
        this.getAllActiveEmployee();
      })
  }

  refresh() {
    this.getAllActiveEmployee();
  }

  getAllActiveEmployee(){
    this.api.getAllActiveEmployee()
      .subscribe(res => {
        this.dataSource = res;
        console.log(this.dataSource);

      })
  }

  markAttendance(row: any) {
    let date_ob = new Date();
    // let hours = date_ob.getHours();
    // let minutes = date_ob.getMinutes();
    // let TimeNow = (hours + ":" + minutes);
    let TimeNow = Date.now();
    let spanValue = row.status;
    let spanValueInTime = row.in_time;
    let spanValueOutTime = row.out_time;

    console.log("span value: " + spanValueInTime);
    if (this.formValue.valid) {

      this.attendanceModelObj.status = this.formValue.value.status;
      if (this.attendanceModelObj.status == "Absent" || this.attendanceModelObj.status == "Off") {
        this.attendanceModelObj.in_time = null;
        this.attendanceModelObj.out_time = null;
        this.formValue.controls['in_time'].disable();
        this.formValue.controls['out_time'].disable();
        // this.formValue.isNam
      } else {
        this.attendanceModelObj.in_time = TimeNow;
        this.attendanceModelObj.out_time = null;
      }

      this.attendanceModelObj.date_of_attendance = this.doa;
      if (!row.employees_id) {

        this.attendanceModelObj.employees_id = row.id;
      }
      else {

        this.attendanceModelObj.employees_id = row.employees_id;
      }

      console.log(this.attendanceModelObj);
      let textt = ''
      this.api.postAttendance(this.attendanceModelObj)
        .subscribe(res => {
          this.ToastText = 'Created Successfully'
          this.ToastMsg(this.ToastText);
          this.ngOnInit();
        },
          err => {
            this.ToastText = 'Error'
            this.ToastMsg(this.ToastText);
          });
    }
    else if(spanValue == 'Present' && spanValueOutTime == null){
      this.attendanceModelObj.date_of_attendance = this.doa;
      if (!row.employees_id) {

        this.attendanceModelObj.employees_id = row.id;
      }
      else {

        this.attendanceModelObj.employees_id = row.employees_id;
      }

      console.log(this.attendanceModelObj);
      let textt = ''
      this.api.postAttendance(this.attendanceModelObj)
        .subscribe(res => {
          this.ToastText = 'Created Successfully'
          this.ToastMsg(this.ToastText);
          this.ngOnInit();
        },
          err => {
            this.ToastText = 'Error in updating'
            this.ToastMsg(this.ToastText);
          });
    }
else if((spanValue == 'Absent') || (spanValue == 'Off')){
  this.ToastText = ' You Already Marked Your attendance'
  this.ToastMsg(this.ToastText);
}
else if((spanValueInTime != null && spanValueOutTime !=null)){
  this.ToastText = ' You Already Marked Your attendance'
  this.ToastMsg(this.ToastText);
}
    else {
      this.ToastText = ' Status [Present, Absent, Off]'
      this.ToastMsg(this.ToastText);
    }




  }

  getAllAttendanceOfCurrentDate() {
    this.api.getAttendanceOfCurrentDate()
      .subscribe(res => {
        this.dataSource = res;
        console.log(this.dataSource);

      })


  }
  combine() {
    this.api.requestDataFromMultipleSources()
      .subscribe(responseList => {

        let a1 = responseList[0]
        let a2 = responseList[1]
        const a3 = a1.map(t1 => ({ ...t1, ...a2.find(t2 => t1.id === t2.employees_id) }))

        this.dataSource.data = a3
        console.log(a3);
        this.isLoaded = true

      });


  }

  ToastMsg(msg:any){
    // this.ToastText = ' You Already Marked Your attendance'
  this._snackBar.open(msg, 'Close', {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'bottom',
  });
  }

}
