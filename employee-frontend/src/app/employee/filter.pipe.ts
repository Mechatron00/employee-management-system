import { Pipe, PipeTransform } from '@angular/core';
import { EmployeeList } from './employee';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(employees: EmployeeList[], employeeId:string): EmployeeList[] 
  {
    return employees.filter((employee)=>employee.employeeId === employeeId);
  }

}
