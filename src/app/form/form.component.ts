import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})
export class FormComponent implements OnInit {
  formGroup: FormGroup;
  constructor(
    private formBulid: FormBuilder
  ) { 
    
  }

  ngOnInit() {
    this.formGroup = this.formBulid.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      age: ['22']
    })
  }
  onSubmit(form: FormGroup){
    const {firstName, lastName, email,age} = form.value;
    console.log(firstName, lastName, email, age);
    const user = new User(firstName, lastName, email, age);
    console.log(user);
  }
}
