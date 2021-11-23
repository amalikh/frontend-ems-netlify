import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar, } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css'],
})

export class NewTaskComponent implements OnInit {
  countryList: Array<any> = []

  alert: boolean = false;
  isLinear: Boolean = false;

  createtask: FormGroup;
  addpayment: FormGroup;

  collections = [{ question: '', answer: '', choices: '' }]

  parting = ''
  days = 0

  isDisabled = false

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dataservice: DataService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar) {

    this.countryList = this.dataservice.countries

    this.initializeForm()
  }


  initializeForm() {
    this.createtask = this._formBuilder.group({
      title: ['', Validators.required,],
      description: ['', Validators.required],
      url: ['', Validators.required]
    });

    this.addpayment = this._formBuilder.group({
      reward: ['', Validators.required],
      numberofdays: ['', Validators.required],
      hits: ['', Validators.required],
      location: [''],
      rate: [''],
      workers: ['', Validators.required]
    });
  }

  createhit() {
    this.isDisabled = true
    let data = {}
    data['title'] = this.createtask.get('title').value;
    data['description'] = this.createtask.get('description').value
    data['url'] = this.createtask.get('url').value;
    data['localevalue'] = this.addpayment.get('location').value;
    data['approval_rate'] = this.addpayment.get('rate').value;
    data['reward'] = this.addpayment.get('reward').value;
    data['max_assignments'] = this.addpayment.get('hits').value;
    data['parting'] = this.parting;
    data['days'] = this.days;
    data['collections'] = this.collections;
    data['blockworkers'] = this.addpayment.get('workers').value;

    if (this.parting == 'yes') {
      data['days'] = this.days;
    }
    else {
      delete data['days']
    }


    if ('localevalue' in data || data['localevalue'] == null || data['localevalue'].length == 0 || data['localevalue'] == '') {
      delete data['localevalue']
    }

    this.dataservice.createTask(data).subscribe((result) => {

      this.isDisabled = false
      let text = ''
      if (result['error']) {
        text = 'error'
      }
      else {
        text = ' Create Successfully !'
      }
      this._snackBar.open(text, 'Close', {
        duration: 2000,
        horizontalPosition: 'left',
        verticalPosition: 'bottom',
      });
      this.alert = true;

      if (result['error']) {
      } else {
        this.router.navigate(["/existingtask"])
      }
    })
  }

  addQuestion() {
    this.collections.push({ question: '', answer: '', choices: '' })
  }

  removeQuestion() {
    this.collections.pop()
  }

  getFontSize() {
    return 13
  }

  fillForm() {
    let data = this.dataservice.selectedTask
    this.createtask = this._formBuilder.group({
      title: [data['title'], Validators.required,],
      description: [data['description'], Validators.required],
      url: [data['url'], Validators.required]
    });

    this.addpayment = this._formBuilder.group({
      reward: [data['reward'], Validators.required],
      dateofexpire: [data['dateofexpire'], Validators.required],
      numberofdays: [data['numberofdays'], Validators.required],
      hits: [data['max_assignments'], Validators.required],
      location: [data['localevalue']],
      rate: [data['approval_rate']],
      workers: [data['blockworkers']]
    });


    this.collections = data['collections']
    this.parting = data['parting']
    this.days = data['days']
  }


  ngOnInit(): void {
    let isPredefined = this.route.snapshot.queryParamMap.get('isPreDefined')
    if (isPredefined) {
      if (this.dataservice.selectedTask) {
        this.fillForm()
      }
    }
  }
}
