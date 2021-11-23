import { Component, OnInit, } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DataService } from '../../shared/services/data.service'
import { RouterOutlet, Router, ActivationStart } from '@angular/router';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AssignmentsDialogComponent } from '../assignments-dialog/assignments-dialog.component';

export interface Assignments {
  worker_id: string;
  id: string;
  actual_answer: string;
  submitted_answer: string;
  assignment_status: Boolean;
  parent_id: string;
}

export interface Tasks {
  title: string;
  id: string;
  creation_date: string;
  max_assignments: string;
}

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
  animations: [routerTransition()]
})
export class AssignmentsComponent implements OnInit {

  displayedColumns: string[] = [
    'title',
    'creation_date',
    'max_assignments',
    'assignments_remaining',
    'actions'
  ];

  dataSource: MatTableDataSource<Tasks>;
  @ViewChild(RouterOutlet) outlet: RouterOutlet;

  constructor(private dataService: DataService, private router: Router, public dialog: MatDialog) { }

  getAllTasks() {
    this.dataService.fetchAllHits().subscribe(res => {
      this.dataSource = new MatTableDataSource(res['data']);
    })
  }

  openAssignmentsModal(parent_id) {
    this.dataService.fetchAssignmentsForParent(parent_id).subscribe(res => {
      const dialogRef = this.dialog.open(AssignmentsDialogComponent, {
        minWidth: "400px",
        data: res['data']
      });
      dialogRef.afterClosed().subscribe(() => {
        this.getAllTasks();
      });
    })
  }


  ngOnInit(): void {
    this.getAllTasks();
    this.router.events.subscribe(e => {
      if (e instanceof ActivationStart && e.snapshot.outlet === 'administration')
        this.outlet.deactivate();
    })
  }

}
