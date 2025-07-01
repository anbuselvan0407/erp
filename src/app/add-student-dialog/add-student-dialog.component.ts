import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-student-dialog',
  templateUrl: './add-student-dialog.component.html',
  styleUrls: ['./add-student-dialog.component.scss']
})
export class AddStudentDialogComponent {
  studentForm: FormGroup;
  submitted = false;

  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      grade: ['', Validators.required],
    });
  }






onSubmit() {
  this.submitted = true;

  if (this.studentForm.valid) {
    const formValue = this.studentForm.value;
    formValue.age = Number(formValue.age);
    this.dialogRef.close(formValue);
  }
}

  hasUnsavedChanges(): boolean {
  return this.studentForm.dirty && !this.submitted;

}

onCancel() {
  if (this.studentForm.dirty && !this.submitted) {
    const confirmClose = confirm('You have unsaved changes. Do you really want to discard them?');
    if (!confirmClose) return;
  }
  this.dialogRef.close();
}

}

