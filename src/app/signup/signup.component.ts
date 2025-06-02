import { Component } from '@angular/core';
import {FormBuilder , FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
signupForm!: FormGroup;
constructor(  
private router:Router
){}






imageUrl = '/assets/images/space.jpg';

onSubmit(){

}
login() {
    this.router.navigate(['/login'])
  }

}
