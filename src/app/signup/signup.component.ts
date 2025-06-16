import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-signup',
 
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
signupForm!: FormGroup;
constructor(  
private fb: FormBuilder,
private auth: AuthService,
private router:Router
){this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });}






imageUrl = '/assets/images/space.jpg';

  onSubmit() {
    if (this.signupForm.valid) {
      this.auth.signup(this.signupForm.value).subscribe({
        next: (res: any) => {
          this.auth.storeToken(res.token);
          alert('Signup successful!');
          this.router.navigate(['/login']);
        },
        error: (err: any) => {
          alert('Signup failed: ' + (err.error?.error || 'Server error'));
        }
      });
    }
  }
login() {
    this.router.navigate(['/login'])
  }

}
