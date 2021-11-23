import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-existingtask-details',
  templateUrl: './existingtask-details.component.html',
  styleUrls: ['./existingtask-details.component.css']
})

export class ExistingtaskDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void { }

}
