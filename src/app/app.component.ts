import { Component, OnInit } from '@angular/core';
import {
  EmailValidator,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

interface UserDto {
  username: string;
  email: string;
  type: 'user' | 'admin';
  password: string;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private user: any;
  private loading: boolean;
  private error: string;

  constructor(private fb: FormBuilder) {}

  userTypes = [
    { label: 'User', value: 'user' },
    { label: 'Admin', value: 'admin' },
  ];

  userForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: new FormControl('', [
      Validators.pattern('[ -~]*[a-z][ -~]*'),
      Validators.pattern('[ -~]*[A-Z][ -~]*'),
      Validators.pattern('[ -~]*(?=[ -~])[^0-9a-zA-Z][ -~]*'),
    ]),
    type: ['', Validators.required],
  });

  get password() {
    return this.userForm.get('password');
  }

  async onSubmit() {
    try {
      this.error = null;
      this.user = null;
      this.loading = true;
      const user = await this.createUser(this.userForm.value);
      this.user = user;
    } catch (error) {
      this.error = error?.message || error;
    } finally {
      this.loading = false;
    }
  }

  // CODE HERE
  //
  // I want to be able to create a new user for the application. Implement a reactive form that I can submit
  //
  // Form:
  // - username (required, min 3, max 24 characters)
  // - email (required, valid email address)
  // - type (required, select dropdown with either 'user' or 'admin')
  // - password (required, min 5, max 24 characters, upper and lower case, at least one special character)
  //
  // Requirements:
  // The form should submit a valid UserDto object (call createUser() function)
  // The submit button should be disabled if the form is invalid
  // The submit button should be disabled while the submit request is pending
  // If the request fails the button must become submittable again (error message must not be displayed)
  // Errors should be displayed under each input if not valid
  //
  // Futher Notes:
  // Styling is not important, use default HTML elements (no angular material or bootstrap)

  ngOnInit() {}

  private async createUser(user: UserDto) {
    await new Promise((res) => setTimeout(res, 2500));

    if (Math.random() < 0.5) {
      return Promise.reject('Request Failed');
    }
    // Backend call happening here.
    return { username: user.username, email: user.email, type: user.type };
  }
}
