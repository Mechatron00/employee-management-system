import { Component, HostListener, OnInit } from '@angular/core';
import { EmployeeList } from '../employee';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EditemployeeService } from './editemployee.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  editEmployeeForm!: FormGroup;
  sessionStorageKey = 'employee';
  constructor(
    private fb: FormBuilder,
    private editEmployeeService: EditemployeeService,
    private router: Router,
    private employeeService: EmployeeService
  ) {}
  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: BeforeUnloadEvent) {
    this.router.navigate(['employee']);
  }
  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(event: Event) {
    const formData = this.editEmployeeForm.getRawValue() as EmployeeList;
    console.log(formData);
    if (formData) {
      sessionStorage.setItem(this.sessionStorageKey, JSON.stringify(formData));
    } else {
      const savedData = sessionStorage.getItem(this.sessionStorageKey);
      sessionStorage.setItem(this.sessionStorageKey, JSON.stringify(savedData));
    }
  }

  ngOnInit(): void {
    const emp: EmployeeList = this.editEmployeeService.employee;
    // console.log(emp);

    const savedData = sessionStorage.getItem(this.sessionStorageKey);
    // console.log(savedData);

    if (emp) {
      const empData: EmployeeList = emp;
      // console.log(empData);
      this.initializeForm(empData);
    } else if (savedData) {
      const empData: EmployeeList = JSON.parse(savedData) as EmployeeList;
      // console.log(empData);
      this.initializeForm(empData);
    } else {
      this.initializeForm();
    }
  }

  initializeForm(emp?: EmployeeList): void {
    this.editEmployeeForm = new FormGroup({
      id: new FormControl({ value: emp?.id, disabled: false }),
      employeeId: new FormControl({ value: emp?.employeeId, disabled: true }),
      fname: new FormControl(
        { value: emp?.fname || '', disabled: false },
        { validators: [Validators.required, Validators.minLength(3)] }
      ),
      lname: new FormControl(
        { value: emp?.lname, disabled: false },
        { validators: [Validators.required, Validators.minLength(3)] }
      ),

      email: new FormControl(
        { value: emp?.email, disabled: false },
        { validators: [Validators.required, Validators.email] }
      ),
      mobile: new FormControl(
        { value: emp?.mobile, disabled: false },
        { validators: [Validators.minLength(10), Validators.maxLength(10)] }
      ),
      addressLine1: new FormControl(
        { value: emp?.addressLine1, disabled: false },
        { validators: [Validators.required, Validators.maxLength(25)] }
      ),
      addressLine2: new FormControl(
        { value: emp?.addressLine2, disabled: false },
        { validators: [Validators.maxLength(25)] }
      ),
      city: new FormControl({ value: emp?.city, disabled: false }),
      state: new FormControl({ value: emp?.state, disabled: false }),
      country: new FormControl({ value: emp?.country, disabled: false }),
      zipcode: new FormControl(
        { value: emp?.zipcode, disabled: false },
        { validators: [Validators.required, Validators.maxLength(6)] }
      ),
      position: new FormControl({ value: emp?.position, disabled: false }),
      salary: new FormControl({ value: emp?.salary, disabled: false }),
    });
  }

  // employee:EmployeeList = this.editEmployeeService.employee;

  editEmployee() {
    // console.log("Employee data:", this.employee);

    const id: string = this.editEmployeeForm.value.id;
    const data = this.editEmployeeForm.getRawValue() as EmployeeList;
    // console.log(id);
    // console.log(data);
    this.editEmployeeService.editEmployeeData(id, data).subscribe(
      (response) => {
        // console.log('Employee data updated successfully:', response);
        this.router.navigate(['employee']);
        this.employeeService.employeeUpdated();
      },
      (error) => {
        console.error('An error occurred while updating employee data:', error);
      }
    );
  }
}
