import { Component } from '@angular/core';
import { Employees } from 'src/app/model/employee.model';
// import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  allEmployees!: Employees[];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeeService.getAllEmployee().subscribe((res) => {
      this.allEmployees = res;
      console.log(this.allEmployees);
    });
  }

  searchEmployee(input: string){
    if(!input) return this.getAllEmployees()
     this.employeeService.getAllEmployee().subscribe(res=>{
      this.allEmployees = res.filter(employee => {
        return employee.empFirstName.toLowerCase().includes(input.toLowerCase()) 
      })
     })
  }

}
