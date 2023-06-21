import { Component, Input, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { EmployeeList } from './employee';

import { Router } from '@angular/router';
import { EditemployeeService } from './edit-employee/editemployee.service';
import { PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { MatCellDef } from '@angular/material/table';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  title = 'Employee management system';
  employees: EmployeeList[] = [];
  public pageSlice = this.employees.slice(0, 5);
  columnsToDisplay = [
    // 'serial',
    'employeeId',
    'fname',
    'lname',
    'email',
    'mobile',
    'edit',
    'delete',
  ];

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private editEmployeeService: EditemployeeService
  ) {}

  ngOnInit(): void {
    this.getAllEmployees();
    // this.employeeService.getEmployees$.subscribe(data =>
    //   {
    //     this.employees=data
    //   })
  }
  getAllEmployees() {
    this.employeeService.getEmployeeData().subscribe((data) => {
      this.employees = data;
      // console.log(this.employees);
      this.pageSlice = this.employees.slice(0, 5);
    });
  }
  deleteEmployee(employee: EmployeeList, id: string) {
    // console.log(id);
    if (
      confirm(`Do you really want to delete ${employee.employeeId} data`) ==
      true
    ) {
      this.employeeService.deleteEmployee(id).subscribe((data) => {
        this.employeeService.getEmployeeData().subscribe((data) => {
          this.employees = data;
          this.pageSlice = this.employees.slice(0, 5);
        });
      });
    } else {
      this.getAllEmployees();
    }
  }
  sendEmployee(employee: EmployeeList) {
    // console.log(employee);
    this.editEmployeeService.employee = employee;
    this.router.navigate(['edit']);
  }
  onPageChange(event: PageEvent) {
    // console.log(event);
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.employees.length) {
      // console.log(this.employees.length);

      endIndex = this.employees.length;
    }
    this.pageSlice = this.employees.slice(startIndex, endIndex);
  }
  applyFilter(event: Event) {
    // console.log(event);

    const filterValue = (event.target as HTMLInputElement).value;
    // console.log(filterValue);
    this.pageSlice = this.employees.filter((employee) => {
      return (
        employee.fname.toLowerCase().includes(filterValue.toLowerCase()) ||
        employee.lname.toLowerCase().includes(filterValue.toLowerCase()) ||
        employee.employeeId.toLowerCase().includes(filterValue.toLowerCase()) ||
        employee.email.toLowerCase().includes(filterValue.toLowerCase())
      );
    });
    this.pageSlice = this.pageSlice.slice(0, 5);
    // console.log(this.pageSlice);
  }
}
