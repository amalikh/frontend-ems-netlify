import { Component, OnInit, } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DataService } from '../../shared/services/data.service'
import { RouterOutlet, Router, ActivationStart } from '@angular/router';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData {
  Id: string;
  Num_blocker: string;
  CreationTime: string;
}

@Component({
  selector: 'app-blockworkers',
  templateUrl: './blockworkers.component.html',
  styleUrls: ['./blockworkers.component.css'],
  animations: [routerTransition()]
})
export class BlockworkersComponent implements OnInit {

  displayedColumns: string[] = [
    'Id',
    'Num_blocker',
    'CreationTime',
    'actions'
  ];

  dataSource: MatTableDataSource<UserData>;
  @ViewChild(RouterOutlet) outlet: RouterOutlet;

  blockWorkers = []

  constructor(private dataservice: DataService, private router: Router) { }

  getBlockedWorkers() {
    this.dataservice.getBlockedWorkers().subscribe(res => {
      this.blockWorkers = res['data']
      this.dataSource = new MatTableDataSource(this.blockWorkers);
    })
  }

  unblock(id) {
    this.dataservice.unblockWorker(id).subscribe(res => {
      this.getBlockedWorkers()
    })
  }


  ngOnInit(): void {
    this.getBlockedWorkers();
    this.router.events.subscribe(e => {
      if (e instanceof ActivationStart && e.snapshot.outlet === 'administration')
        this.outlet.deactivate();
    })
  }

}
