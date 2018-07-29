import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators,NgForm,FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-log-on',
  templateUrl: './log-on.component.html',
  styleUrls: ['./log-on.component.scss']
})
export class LogOnComponent implements OnInit {
  signupForm: FormGroup;
  constructor(public form: FormBuilder) { }

  ngOnInit() {
   
    this.createForm();
  }
  createForm()
  {
    this.signupForm = this.form.group({
      'username': new FormControl('', Validators.required),
      'password' :new FormControl('', Validators.required)
    });
  }
  onSubmit() {
    
    if (this.signupForm.valid) {
    console.log(this.signupForm);
    
    //this.signupForm.reset();

    }
    
   
  }
  
 

}
