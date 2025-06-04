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

  private validCredentials = {
    email: 'anbu@email.com',
    password: 'hello123'
  };

constructor(private fb: FormBuilder,private router:Router,)
{
  this.loginForm = this.fb.group({email: ['', [Validators.required,Validators.email]],password: ['', Validators.required]})
}

imageUrl = '/assets/images/space.jpg';

 onSubmit() {
    if (this.loginForm.invalid) return;

    const formValue = this.loginForm.value;
    
    if (formValue.email === this.validCredentials.email && 
        formValue.password === this.validCredentials.password) {
      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid credentials!');
    }
  }


login(){
  this.router.navigate(['/signup'])
}

}


