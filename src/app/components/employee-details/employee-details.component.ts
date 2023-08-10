import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute } from '@angular/router';
import { Employees } from 'src/app/model/employee.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent {

  constructor(private employeeService:EmployeeService,private activeRoute:ActivatedRoute){}

  id!:number
  employee!:Employees

  ngOnInit(): void {
   this.activeRoute.params.subscribe(res=> this.id = res['id'])
   this.employeeService.getEmployee(this.id).subscribe(res=> this.employee = res)
  }

}
