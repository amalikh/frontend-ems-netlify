import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DataService } from '../../shared/services/data.service'
import { MatDialog } from '@angular/material/dialog';
import { RouterOutlet, Router, ActivationStart } from '@angular/router';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl } from '@angular/forms';
import { ExistingtaskDetailsComponent } from '../existing-task/existingtask-details/existingtask-details.component';

export interface UserData {
  Title: string;
  Reward: string;
  CreationTime: string;
  HITStatus: string;
}

@Component({
  selector: 'app-completed-task',
  templateUrl: './completed-task.component.html',
  styleUrls: ['./completed-task.component.css'],
  animations: [routerTransition()]

})
export class CompletedTaskComponent implements OnInit {

  selectedRow = {}

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });


  displayedColumns: string[] = ['Title',
    'Reward',
    'CreationTime',
    'Max Assignments',
    'Remaining',
    'Approved',
    'actions'
  ];
  
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(RouterOutlet) outlet: RouterOutlet;

  completedhits


  constructor(private dataservice: DataService,
    private router: Router, public dialog: MatDialog) { }


  getallCompletedHITS() {
    this.dataservice.fetchCompletedHits().subscribe(res => {
      res['data'].forEach(element => {
        element['approved'] = parseInt(element['max_assignments']) - parseInt(element['assignments_remaining'])
    });
      this.completedhits = res['data']
      this.dataSource = new MatTableDataSource(this.completedhits);
      this.applyThis()
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.getallCompletedHITS();
    this.router.events.subscribe(e => {
      if (e instanceof ActivationStart && e.snapshot.outlet == 'administration')
        this.outlet.deactivate();
    })
  }

  applyThis() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  openEdit(row) {
    this.selectedRow = row
    const dialogRef = this.dialog.open(ExistingtaskDetailsComponent, {
      data: row
    });
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.dataservice.selectedTask = this.selectedRow
          this.router.navigate(['/newtask'], { queryParams: { isPreDefined: true } })
        }
      },
    );
  }

  refresh(){
    this.getallCompletedHITS();
  }


}
