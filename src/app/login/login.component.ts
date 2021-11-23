import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { DataService } from '../shared/services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../dashboard.model';
import { request } from 'http';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    alertCtrl: any;
    loginModelObj: UserModel = new UserModel();
    loginRes: any;
    errorMessage: string = 'No Account Registered';

    constructor(
        private formBuilder: FormBuilder,
        // private dataservice: DataService,
        private api: ApiService,
        private http: HttpClient,
        public router: Router
    ) {
        // this.loginForm = this._formBuilder.group({
        //     username: ['', Validators.required],
        //     pass: ['', Validators.required],
        // });
    }

    ngOnInit() { 
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            pass: ['', Validators.required]
        })
    }

    login(){
    this.loginModelObj.email = this.loginForm.value.username;
    this.loginModelObj.password = this.loginForm.value.pass;

        this.api.login(this.loginModelObj)
        .subscribe(res => {
            this.loginRes = res;
            console.log(res);
            if (res) {
                localStorage.setItem('token', this.loginRes.token)
                // localStorage.setItem('isLoggedin', 'true')

                this.router.navigate(['/dashboard']);
            } else {
                alert("Incorrect user and password");
            }
          })

    }


    // onLoggedin() {
    //     let username = this.loginForm.value.username;
    //     let pass = this.loginForm.value.pass;
    //     let result = this.dataservice.login(username, pass);
    //     if (result) {
    //         localStorage.setItem('isLoggedin', 'true')
    //         this.router.navigate(['/newtask']);
    //     }
    //     else {
    //     }
    // }

}
