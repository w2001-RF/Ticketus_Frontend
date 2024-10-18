import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {
  userForm!: FormGroup;
  passwordForm!: FormGroup;
  user!: User;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}  

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Load current user data
    const userId = this.authService.getCurrentUser().Sub;
    this.userService.getUser(userId).subscribe((user: User) => {
      this.user = user;
      this.userForm.patchValue({
        username: user.UserName,
        email: user.Email
      });
    },
    (error) => {
      console.error('Error fetching user data:', error);
      this.snackBar.open('Failed to load user data', 'Close', { duration: 3000 });
    }
  );
  }

  // Save user info
  saveUserInfo(): void {
    if (this.userForm.valid) {
      this.userService.updateUser(this.userForm.value).subscribe(
        (updatedUser) => {
          this.snackBar.open('User info updated successfully', 'Close', { duration: 3000 });
        },
        (error) => {
          console.error('Error updating user info:', error);
          this.snackBar.open('Failed to update user info', 'Close', { duration: 3000 });
        }
      );
    }
  }

  // Change user password
  changePassword(): void {
    const userId = this.authService.getCurrentUser().Sub;
    if (this.passwordForm.valid) {
      const currentPassword = this.passwordForm.get('currentPassword')?.value;
      const newPassword = this.passwordForm.get('newPassword')?.value;

      if (currentPassword && newPassword) {
        this.userService.changePassword(userId, currentPassword, newPassword).subscribe({
          next: () => {
            this.snackBar.open('Password changed successfully!', 'Close', { duration: 3000 });
          },
          error: (err) => {
            console.error('Error changing password:', err);
            this.snackBar.open('Error changing password. Please try again.', 'Close', { duration: 3000 });
          }
        });
      } else {
        this.snackBar.open('Please fill out both fields.', 'Close', { duration: 3000 });
      }
    }
  }
}
