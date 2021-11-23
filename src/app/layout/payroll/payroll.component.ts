import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RouterOutlet } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import { routerTransition } from '../../router.animations';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PayrollDialogComponent } from '../payroll-dialog/payroll-dialog.component';

export interface PayrollData {
  Id: string;
  EmployeeName: string;
  basic_pay: number;
  allowance: number;
  current_salary: number;
  last_increment:number;
  last_increment_date:string;
  last_salary_release_date:string;
}

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css'],
  animations: [routerTransition()]

})
export class PayrollComponent implements OnInit {

  selectedRow = {}

  formValue: FormGroup

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  name: string;
  displayedColumns: string[] = [
    'Emp Name',
    'Basic Pay',
    'Allowance',
    'Current Salary',
    'Last Increment',
    'Last Increment Date',
    'Last Salary Release Date',
    'Action'
  ];
  dataSource: MatTableDataSource<PayrollData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(RouterOutlet) outlet: RouterOutlet;

  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
    private dialog: MatDialog) { }

    openDialog() {

      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      dialogConfig.data = {
        name: this.name
    };

      this.dialog.open(PayrollDialogComponent, dialogConfig);

      const dialogRef = this.dialog.open(PayrollDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => console.log("Dialog output:", data)
    );    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    // this.getAllEmployee();
    this.getAllPayrolls();

  }

  applyThis() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  refresh() {
    // this.getallCompletedHITS();
  }

  
  openEdit(row) {
 
  }

  // getAllEmployee() {
  //   this.api.getAllEmployee()
  //     .subscribe(res => {
  //       this.dataSource = res;
  //     })
  // }

  getAllPayrolls() {
    this.api.getPayrolls()
      .subscribe(res => {
        this.dataSource = res;
      })
  }
  

}
