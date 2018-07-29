import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from '../login.model';
import { LoginServiceService } from '../login-service.service';
@Component({
  selector: 'app-new-login',
  templateUrl: './new-login.component.html',
  styleUrls: ['./new-login.component.scss'],
  providers: [LoginServiceService]
})
export class NewLoginComponent implements OnInit {
  signupForm: FormGroup;
  loginModel: LoginModel = new LoginModel();
  constructor(private loginService: LoginServiceService) { }

  ngOnInit() {
    this.createForm();
  }
  createForm()
  {
    this.signupForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password' :new FormControl(null, Validators.required),
      'address':new FormControl(null),
      'email':new  FormControl(null,[Validators.required,Validators.email]),
      'gender':new FormControl('M'),
      'phone' :new FormControl(null,Validators.required)
    });
  }
  onSubmit() {
    if (this.signupForm.valid) {
   // console.log(this.signupForm);
    this.loginModel.address=this.signupForm.get('address').value;
    this.loginModel.email=this.signupForm.get('email').value;
    this.loginModel.gender=this.signupForm.get('gender').value;
    this.loginModel.password=this.signupForm.get('password').value;
    this.loginModel.phone=this.signupForm.get('phone').value;
    this.loginModel.username=this.signupForm.get('username').value;
    this.loginService.createUser(this.loginModel).subscribe(
      data =>{console.log(data)
        this.signupForm.reset();
      },
       error =>{
        console.log(error);
        this.signupForm.reset(this.signupForm.value);
       } 
    )
   // this.signupForm.reset(this.signupForm.value);

    }
  }
}
