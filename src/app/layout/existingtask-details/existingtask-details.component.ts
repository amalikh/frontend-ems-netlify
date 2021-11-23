import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../shared/services/data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-existingtask-details',
  templateUrl: './existingtask-details.component.html',
  styleUrls: ['./existingtask-details.component.css']
})
export class ExistingtaskDetailsComponent implements OnInit {

  existslist;

  alert: boolean = false;
  updatelists: FormGroup;
  addpayment: FormGroup;

  data = [{ question: '', answer: '', type: '', choices: '' }]

  constructor(private dataservice: DataService,
    public dialog: MatDialog,
    private router: ActivatedRoute,
  ) {
    this.updatelists = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      url: new FormControl(''),
    });

    this.addpayment = new FormGroup({
      reward: new FormControl(''),
      dateofexpire: new FormControl(''),
      numberofdays: new FormControl(''),
      parting: new FormControl(''),
      hits: new FormControl(''),
      location: new FormControl(''),
      rate: new FormControl(''),
    })
  }


  getallexists() {
    this.dataservice.fetchExistingHits().subscribe(res => {
      this.existslist = res
    })
  }

  getFontSize() {
    return 13
  }

  ngOnInit(): void {
    this.dataservice.getCurrentTaskData(this.router.snapshot.params.id).subscribe((result) => {
      this.updatelists = new FormGroup({
        title: new FormControl(result[0]['title']),
        description: new FormControl(result[0]['description']),
        url: new FormControl(result[0]['url']),
      })
      this.addpayment = new FormGroup({
        reward: new FormControl(result[0]['reward']),
        dateofexpire: new FormControl(result[0]['duration']),
        numberofdays: new FormControl(result[0]['num_of_days']),
        parting: new FormControl(result[0]['parting']),
        hits: new FormControl(result[0]['max_assignments']),
        location: new FormControl(result[0]['localevalue']),
        rate: new FormControl(result[0]['approval_rate']),

      })
    })
  }


  updatehits() {
    let data = {}
    data['title'] = this.updatelists.get('title').value;
    data['description'] = this.updatelists.get('description').value
    data['url'] = this.updatelists.get('url').value;
    data['collections'] = this.updatelists;
    data['reward'] = this.addpayment.get('reward').value;
    data['duration'] = this.addpayment.get('dateofexpire').value;
    data['max_assignments'] = this.addpayment.get('hits').value;
    data['parting'] = this.addpayment.get('parting').value;
    data['num_of_days'] = this.addpayment.get('numberofdays').value;
    data['localevalue'] = this.addpayment.get('location').value;
    data['approval_rate'] = this.addpayment.get('rate').value;

    this.dataservice.updatehits(this.router.snapshot.params.id, data).subscribe((result) => {
      this.alert = true;
    })
  }


  addData() {
    this.data.push({ question: '', answer: '', type: '', choices: '' })
  }




}
