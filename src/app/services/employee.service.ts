import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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



}
