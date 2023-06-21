import { Component } from '@angular/core';
import { EmployeeList } from '../employee';
import { EmployeeService } from '../employee.service';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css'],
})
export class AddemployeeComponent {
  employee: EmployeeList = 
  {
    id: '',
    employeeId: '',
    fname: '',
    lname: '',
    email: '',
    mobile: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
    position: '',
    salary:0,
  };
  constructor(
    private employeeServive: EmployeeService,
    private route: Router
  ) {}
  successMessage:string='';
  addEmployee(employeeForm: NgForm) {
    this.employeeServive.addEmployeeData(this.employee).subscribe((data) => {
      this.successMessage="Employee data added successfully!";
      employeeForm.reset();
      // this.employeeServive.employee = data;
      this.route.navigate(['employee']);
    });
  }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
}
