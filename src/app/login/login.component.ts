import { Component } from '@angular/core';
import {FormBuilder , FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({

  selector: 'app-login',
  // standalone: true,
  templateUrl: './login.component.html',

  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
loginForm!: FormGroup;



constructor(private fb: FormBuilder,private auth: AuthService,private router:Router,)
{
  this.loginForm = this.fb.group({email: ['', [Validators.required,Validators.email]],password: ['', Validators.required]})
}

imageUrl = '/assets/images/space.jpg';

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Logging in with:', this.loginForm.value); // Debug
      this.auth.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          this.auth.storeToken(res.token);

          alert('Login successful!');
          this.router.navigate(['/dashboard']);
        },
        error: (err: any) => {
          console.error('Login error:', err);
          alert('Login failed: ' + (err.error?.error || 'Server error'));
        }
      });
    }
  }


login(){
  this.router.navigate(['/signup'])
}

}


