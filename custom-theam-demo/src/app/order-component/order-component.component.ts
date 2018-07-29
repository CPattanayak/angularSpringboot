import{Component, OnInit}from '@angular/core';
import {LoginModel}from '../login/login.model';
import { Observable}from 'rxjs/Observable';
import {FormArray, FormControl, FormGroup, Validators,FormBuilder}from '@angular/forms';
import {MatPaginator,MatTableDataSource,MatDialog}from '@angular/material';

@Component({
  selector: 'app-order-component',
  templateUrl: './order-component.component.html',
  styleUrls: ['./order-component.component.scss']
})
export class OrderComponentComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }


  orderForm: FormGroup;
  items: any[] = [];
  formArray: FormArray;

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      customerName: '',
      email: '',
      items: new FormArray([ this.createItem() ])
    });
     this.formArray=<FormArray>this.orderForm.get('items');
  }
  addItem()
  {
    (<FormArray>this.orderForm.get('items')).push( this.createItem());
     this.formArray=<FormArray>this.orderForm.get('items');
  }
  createItem(): FormGroup {
    return this.formBuilder.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    });
  }
  onSubmit()
  {
    // console.debug(this.orderForm.value);
    if (this.orderForm.valid) {
     // console.log(this.orderForm.value);
      let itemsArray= <FormArray>this.orderForm.get('items');
      itemsArray.controls.forEach(arr=>{
        console.log(arr.get('name').value);
        console.log(arr.get('description').value);
        console.log(arr.get('price').value);
      });

    }
  }
}
