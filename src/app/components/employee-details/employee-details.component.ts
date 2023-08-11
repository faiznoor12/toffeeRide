import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employees } from 'src/app/model/employee.model';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent {

  constructor(private employeeService:EmployeeService,private activeRoute:ActivatedRoute,private toaster : HotToastService , private router: Router){}

  id!:number
  employee!:Employees

  ngOnInit(): void {
   this.activeRoute.params.subscribe(res=> this.id = res['id'])
   this.employeeService.getEmployee(this.id).subscribe(res=> this.employee = res)
  }

  deleteEmployee(){
    this.employeeService.deleteEmployee(this.id).pipe(
      this.toaster.observe({
        loading: 'deleting...',
        success: 'Employee deleted successfully!',
        error:  'Something went wrong'
      })).subscribe( ()=> this.router.navigateByUrl('/') )
  }

}
