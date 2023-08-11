import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Employees } from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl = environment.baseUrl

  constructor(private http:HttpClient) { }

  getAllEmployee():Observable<Employees[]>{
    return this.http.get<Employees[]>(this.baseUrl)
  }
  getEmployee(id:number):Observable<Employees>{
    return this.http.get<Employees>(`${this.baseUrl}/${id}`)
  }
  updateEmployee(id:number , employee :Partial<Employees>): Observable<Employees>{
    return this.http.put<Employees>(`${this.baseUrl}/${id}`,employee)
  }
  addEmployee( employee :Partial<Employees>): Observable<Employees>{
    return this.http.post<Employees>(this.baseUrl,employee)
  }
  deleteEmployee(id:number){
    return this.http.delete<Employees>(`${this.baseUrl}/${id}`)
  }


}
