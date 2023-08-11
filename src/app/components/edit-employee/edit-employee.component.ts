import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Employees } from 'src/app/model/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
})
export class EditEmployeeComponent {
  empId!: number;

  employeeForm: FormGroup = this.formBuilder.group({
    fristName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['', Validators.required],
    dateOfBirth: [ '',[Validators.required, Validators.pattern(/^\d{2}-\d{2}-\d{4}$/)]],
    dateOfJoing: [ '',[Validators.required, Validators.pattern(/^\d{2}-\d{2}-\d{4}$/)]],
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
    private activedRouter: ActivatedRoute,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private router:Router,
    private toaster:HotToastService
  ) {}

  ngOnInit(): void {
    this.activedRouter.params.subscribe(res => this.empId = res['id']);
    this.employeeService.getEmployee(this.empId).subscribe(employee => {

      this.fc['fristName'].setValue(employee.empFirstName)
      this.fc['lastName'].setValue(employee.empLastName)
      this.fc['gender'].setValue(employee.empGender)
      this.fc['dateOfBirth'].setValue(employee.empDateOfBirth)
      this.fc['dateOfJoing'].setValue(employee.empDateOfJoining)
      this.fc['mobile'].setValue(employee.empPhoneNumber)
      this.fc['email'].setValue(employee.empEmailId)
      this.fc['adderssLine1'].setValue(employee.empHomeAddrLine1)
      this.fc['adderssLine2'].setValue(employee.empHomeAddrLine2)
      this.fc['street'].setValue(employee.empHomeAddrStreet)
      this.fc['district'].setValue(employee.empHomeAddrDistrict)
      this.fc['state'].setValue(employee.empHomeAddrState)
      this.fc['country'].setValue(employee.empHomeAddrCountry)
      this.fc['pinCode'].setValue(employee.empHomeAddrPinCode)

    })
  }

  get fc(){
    return this.employeeForm.controls
  }

  submit(){

    const form = this.employeeForm.value

    const updatedEmployee: Partial<Employees> = {
      empFirstName:form.fristName,
      empLastName:form.lastName,
      empGender:form.gender,
      empDateOfBirth:form.dateOfBirth,
      empPhoneNumber:form.mobile,
      empEmailId:form.email,
      empHomeAddrLine1:form.adderssLine1,
      empHomeAddrLine2:form.adderssLine2,
      empHomeAddrStreet:form.street,
      empHomeAddrDistrict:form.district,
      empHomeAddrState:form.state,
      empHomeAddrCountry:form.country,
      empHomeAddrPinCode:form.pinCode,
      empDateOfJoining:form.dateOfJoing
    }

    this.employeeService.updateEmployee(this.empId,updatedEmployee).pipe(
      this.toaster.observe({
        loading: 'Saving...',
        success: 'Editing successfull!',
        error: 'Something went wrong!!!'
      })).subscribe(res=>{
      this.router.navigateByUrl(`/employee/${this.empId}`)
    })

  }

}
