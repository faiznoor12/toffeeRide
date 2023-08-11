import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Employees } from 'src/app/model/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent {
  empId!: number;
  err: boolean = false;

  employeeForm: FormGroup = this.formBuilder.group({
    fristName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['', Validators.required],
    dateOfBirth: [
      '',
      [Validators.required, Validators.pattern(/^\d{2}-\d{2}-\d{4}$/)],
    ],
    dateOfJoing: [
      '',
      [Validators.required, Validators.pattern(/^\d{2}-\d{2}-\d{4}$/)],
    ],
    mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    email: ['', [Validators.required, Validators.email]],
    adderssLine1: ['', Validators.required],
    adderssLine2: ['', Validators.required],
    street: ['', Validators.required],
    district: ['', Validators.required],
    state: ['', Validators.required],
    country: ['', Validators.required],
    pinCode: ['', Validators.required],
  });

  constructor(
    public employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toaster: HotToastService
  ) {}

  get fc() {
    return this.employeeForm.controls;
  }

  submit() {
    const form = this.employeeForm.value;

    if (form.invalid) {
      this.err = true;
    } else {
      this.err = false;

      const Employee: Partial<Employees> = {
        empFirstName: form.fristName,
        empLastName: form.lastName,
        empGender: form.gender,
        empDateOfBirth: form.dateOfBirth,
        empPhoneNumber: form.mobile,
        empEmailId: form.email,
        empHomeAddrLine1: form.adderssLine1,
        empHomeAddrLine2: form.adderssLine2,
        empHomeAddrStreet: form.street,
        empHomeAddrDistrict: form.district,
        empHomeAddrState: form.state,
        empHomeAddrCountry: form.country,
        empHomeAddrPinCode: form.pinCode,
        empDateOfJoining: form.dateOfJoing,
      };

      this.employeeService
        .addEmployee(Employee)
        .pipe(
          this.toaster.observe({
            loading: 'Adding Employee.....',
            success: 'Added successfully!',
            error: 'Email or Mobile Number already in use',
          })
        )
        .subscribe((res) => {
          this.router.navigateByUrl(`/employee/${res.id}`);
        });
    }
  }
}
