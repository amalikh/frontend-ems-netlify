import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EmployeeModel } from '../../layout/employee/employee.model';
import { ApiService } from '../../shared/api.service';
import { formatDate } from '@angular/common';

// import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload';
import { Console } from 'console';

const URL = 'https://em-system-heroku.herokuapp.com/uploads';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  animations: [routerTransition()]

})
export class EmployeeComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;

  createEmployee: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employees: string[] = ['abc', 'efg', 'hij'];
  fileAttr = 'Choose File';
  selectedFile: File = null;
  dataimage: any;
  imgBase64Path:any;
  // public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'current_photo' });
  
  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.createEmployee = this.formbuilder.group({
      name: [''],
      father_name: [''],
      dob: [''],
      doj: [''],
      designation: [''],
      communication_add: [''],
      permanent_add: [''],
      current_photo: [''],
      contact_no: [''],
      email: [''],
      salary: ['']

    })

    // this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    // this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    //      console.log('ImageUpload:uploaded:', item, status, response);
    //      alert('File uploaded successfully');
    // };
  }

  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: File) => {
        this.fileAttr += file.name;
        console.log(this.fileAttr);
      });

      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        this.dataimage = image.src;
        console.log("image.src", image.src);

        image.onload = rs => {
          let imgBase64Path = e.target.result;
          // this.dataimage = imgBase64Path;
          console.log("imgBase64Path", imgBase64Path);
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      console.log("imgFile.target.files[0]", imgFile.target.files[0])
      console.log(this.fileInput.nativeElement.value)
      // this.dataimage = this.fileInput.nativeElement.value;
      
      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = "";

    } else {
      this.fileAttr = 'Choose File';
    }
  }

  onFileSelect(event: any) {
    this.selectedFile = <File>event.target.files;
    // let fData: FormData = new FormData;
    // fData.append("file", file);
    this.fileAttr = '';
    this.fileAttr += this.selectedFile.name;
    // console.log(this.fileAttr);
    console.log(this.createEmployee.get('current_photo').setValue(this.selectedFile.name));
  }


  cancelBtn() {
    let ref = document.getElementById('cancel')
    ref?.click();
    this.createEmployee.reset();
  }

  addEmployee() {


    // if (!this.createEmployee.get('current_photo').value) {
    //   alert('Please fill valid details!');
    //   return false;
    // }

    // const formData = new FormData();
    // formData.append('current_photo', this.selectedFile.name, this.createEmployee.get('current_photo').value.file);
    // formData.append('agentId', '007');

    const dob = formatDate(this.createEmployee.value.dob, 'yyyy-MM-dd', 'en-US');
    const doj = formatDate(this.createEmployee.value.doj, 'yyyy-MM-dd', 'en-US');

    this.employeeModelObj.name = this.createEmployee.value.name;
    this.employeeModelObj.father_name = this.createEmployee.value.father_name;
    this.employeeModelObj.dob = dob;
    this.employeeModelObj.doj = doj;
    this.employeeModelObj.designation = this.createEmployee.value.designation;
    this.employeeModelObj.communication_add = this.createEmployee.value.communication_add;
    this.employeeModelObj.permanent_add = this.createEmployee.value.permanent_add;
    this.employeeModelObj.current_photo = this.dataimage;
    this.employeeModelObj.contact_no = this.createEmployee.value.contact_no;
    this.employeeModelObj.email = this.createEmployee.value.email;
    this.employeeModelObj.salary = this.createEmployee.value.salary;

    console.log(this.createEmployee);
    this.api.postEmployee(this.employeeModelObj)
      .subscribe(res => {
        console.log(res);
        alert("Add successfully");
      },
        err => {
          console.log(err)
          // alert("something wrong");
        });

  }





  onFileSelected(event) {
    if (event.target.value) {
      this.selectedFile = <File>event.target.file.path;
      console.log("Name:: " + this.selectedFile);
    }

  }
  fileInputLabel: string;



}
