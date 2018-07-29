import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef,MatDialog} from '@angular/material';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from '../login.model';
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-update-login',
  templateUrl: './update-login.component.html',
  styleUrls: ['./update-login.component.scss'],
  providers: [LoginServiceService]
})
export class UpdateLoginComponent implements OnInit {
  signupForm: FormGroup;
  loginModel: LoginModel = new LoginModel();
  constructor(public dialogRef: MatDialogRef<UpdateLoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private loginService: LoginServiceService) { }

  ngOnInit() {
    this.createForm();
  }
  onNoClick(): void {
    
    this.dialogRef.close();
  }
  createForm()
  {
    this.signupForm = new FormGroup({
      'username': new FormControl(this.data.rowData.username, Validators.required),
      'password' :new FormControl(this.data.rowData.password, Validators.required),
      'address':new FormControl(this.data.rowData.address),
      'email':new  FormControl(this.data.rowData.email,[Validators.required,Validators.email]),
      'gender':new FormControl(this.data.rowData.gender),
      'phone' :new FormControl(this.data.rowData.phone,Validators.required)
    });
  }
  onSubmit() {
    if (this.signupForm.valid) {
   // console.log(this.signupForm);
   this.loginModel.id=this.data.rowData.id;
    this.loginModel.address=this.signupForm.get('address').value;
    this.loginModel.email=this.signupForm.get('email').value;
    this.loginModel.gender=this.signupForm.get('gender').value;
    this.loginModel.password=this.signupForm.get('password').value;
    this.loginModel.phone=this.signupForm.get('phone').value;
    this.loginModel.username=this.signupForm.get('username').value;
    this.loginService.updateUser(this.loginModel.id,this.loginModel).subscribe(
      data =>{console.log(data)
        this.onNoClick();
      },
       error =>{
        console.log(error);
        this.onNoClick();
       } 
    )
   // this.signupForm.reset(this.signupForm.value);

    }
  }

}
