import { Injectable } from '@angular/core';
import { EmployeeList } from '../employee';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditemployeeService 
{
  constructor(private http: HttpClient) {}

  employee!: EmployeeList;

  editEmployeeData(id:string,emp:EmployeeList)
  {
   return this.http.put<EmployeeList>(`http://localhost:8080/employee/${id}`,emp);
  }
}
