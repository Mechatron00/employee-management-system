import { Injectable } from '@angular/core';
import { EmployeeList } from './employee';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService 
{
  employee: EmployeeList[] = [];

  constructor(private http: HttpClient) {}

  getEmployees$ = this.http
    .get<EmployeeList[]>('http://localhost:8080/employee')
    .pipe(shareReplay());


  getEmployeeData() {
    return this.http.get<EmployeeList[]>('http://localhost:8080/employee');
  }
  getEmployee(id:string) {
    return this.http.get<EmployeeList>(`http://localhost:8080/employee/${id}`);
  }
 

  addEmployeeData(employee: EmployeeList) {
    return this.http.post<EmployeeList[]>(
      'http://localhost:8080/employee',
      employee
    );
  }
  deleteEmployee(id:string)
  {
    return this.http.delete<EmployeeList[]>(`http://localhost:8080/employee/${id}`)
  }
  
  editEmployeeData(id:string,employee:EmployeeList)
  {
   return this.http.put<EmployeeList[]>(`http://localhost:8080/employee/${id}`,employee);
  }

}
