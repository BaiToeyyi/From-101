import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { User } from '../user';
import { from } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})
export class FormComponent implements OnInit {
  formGroup: FormGroup;
  @Output() change = new EventEmitter();
  constructor(
    private formBulid: FormBuilder
  ) { 
    
  }

  ngOnInit() {
    this.formGroup = this.formBulid.group({
      firstName: ['',[Validators.required, Validators.minLength(2)]],
      lastName: ['',[Validators.required, Validators.minLength(2)]],
      email: ['',[Validators.required,this.EmailValidator]],
      age: ['22', [Validators.min(0),Validators.max(99)]]
    })
  }
  EmailValidator(control: AbstractControl){
    const value = control.value;
    if(value && value.includes('@')){
      return null;
    }
    return{
      email: true
    }
  }
  onSubmit(form: FormGroup){
    // console.log(form.valid, form.invalid)
    // console.log((<FormControl>form.get('firstName')).errors);

    if(form.valid){
      const {firstName, lastName, email,age} = form.value;
      console.log(firstName, lastName, email, age);
      const user = new User(firstName, lastName, email, age);
      console.log(user);
      this.change.emit(user);
      console.log(user);
    }else{
      ['firstName', 'lastName', 'age', 'email'].forEach((key: string) => {
        console.log(form.get(key).errors);
        form.get(key).markAsTouched();
        // console.log(form.get(key).touched);
      })
    }
  }
}
