import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../shared/services/data.service'


@Component({
  selector: 'app-assignments-dialog',
  templateUrl: './assignments-dialog.component.html',
  styleUrls: ['./assignments-dialog.component.css']
})

export class AssignmentsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, private _snackBar: MatSnackBar, private dataService: DataService) { }

  approveAssignment(row) {
    this.dataService.approveAssigment(row.id, row.parent_id).subscribe(res => {
      row.assignment_status = true
      this._snackBar.open('Assignment Approved', 'Close', { duration: 3000 })
    })
  }

  ngOnInit(): void {
  }

}
