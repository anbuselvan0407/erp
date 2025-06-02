import { Component } from '@angular/core';
import {FormBuilder , FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({

  selector: 'app-login',
  // standalone: true,
  templateUrl: './login.component.html',

  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
loginForm!: FormGroup;

constructor(private fb: FormBuilder,private router:Router,)
{
  this.loginForm = this.fb.group({email: ['', Validators.required],password: ['', Validators.required]})
}

imageUrl = '/assets/images/space.jpg';

onSubmit(){
 alert("button clicked");
  this.router.navigate(['/dashboard'])
}


login(){
  this.router.navigate(['/signup'])
}

}


