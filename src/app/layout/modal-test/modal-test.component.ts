import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { routerTransition } from '../../router.animations';
import { ApiService } from '../../shared/api.service';
import { ModalDataComponent } from '../modal-data/modal-data.component';


export interface PayrollData {
  Id: string;
  EmployeeName: string;
  basic_pay: number;
  allowance: number;
  current_salary: number;
  last_increment: number;
  last_increment_date: string;
  last_salary_release_date: string;
}


@Component({
  selector: 'app-modal-test',
  templateUrl: './modal-test.component.html',
  styleUrls: ['./modal-test.component.css'],
  animations: [routerTransition()]
})


export class ModalTestComponent implements OnInit {

  payrollData: any;

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
  // dataSource: MatTableDataSource<PayrollData>;
  constructor(public dialog: MatDialog,
    private formbuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.getAllPayrolls();
  }

  openDialog() {
    this.dialog.open(ModalDataComponent, {
      data: {
        type: 'add'
      },
    });
  }

  getAllPayrolls() {
    this.api.getPayrolls()
      .subscribe(res => {
        this.payrollData = res;
        console.log(this.payrollData);
      })
  }

  onEdit(item: any) {
    // this.showAdd = false;
    // this.showUpdate = true;


    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      type: 'edit',
      id: item.employees_id,
      name: item.employee.name,
      basic_pay: item.basic_pay,
      allowance: item.allowance,
      current_salary: item.current_salary,
      last_increment: item.last_increment,
      last_increment_date: item.last_increment_date,
      last_salary_release_date: item.last_salary_release_date,
    };
    console.log(dialogConfig.data)
    this.dialog.open(ModalDataComponent, dialogConfig);


  }

}

