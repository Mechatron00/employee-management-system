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

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit{
  editEmployeeForm!: FormGroup;
  sessionStorageKey = 'employee';
  constructor(
    private fb: FormBuilder,
    private editEmployeeService: EditemployeeService,
    private router: Router
  ) {}
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
  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: BeforeUnloadEvent) {
    this.router.navigate(['employee']);
  }

  ngOnInit(): void {
    const emp: EmployeeList = this.editEmployeeService.employee;

    // window.sessionStorage.setItem('employee', JSON.stringify(emp))
    // const savedData=window.sessionStorage.getItem('employee')
    // console.log(savedData);

    // this.editEmployeeForm = new FormGroup(
    //   {
    //   employeeId: new FormControl({ value: emp.employeeId, disabled: true }),
    //   fname: new FormControl({ value: emp.fname || '',disabled: false },{validators:[Validators.required, Validators.minLength(3)]}),
    //   // [emp.fname, [Validators.required, Validators.minLength(3)]],
    //   lname: new FormControl({ value: emp.lname, disabled: false },{validators:[Validators.required, Validators.minLength(3)]}),
    //   // [emp.lname,[Validators.required, Validators.minLength(3)]],
    //   email: new FormControl({ value: emp.email, disabled: false },{validators:[Validators.required, Validators.email]}),
    //   // [emp.email,[Validators.required, Validators.email]],
    //   mobile: new FormControl({ value: emp.mobile, disabled: false },{validators:[Validators.minLength(10),Validators.maxLength(10)]}),
    //   // [emp.mobile,[Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
    //   addressLine1:new FormControl({ value: emp.addressLine1, disabled: false },{validators:[Validators.required, Validators.maxLength(25)]}),
    //   //  [emp.addressLine1,[Validators.required, Validators.maxLength(25)]],
    //   addressLine2: new FormControl({ value: emp.addressLine2, disabled: false },{validators:[Validators.maxLength(25)]}),
    //   // [emp.addressLine2,[Validators.maxLength(25)]],
    //   city: new FormControl({ value: emp.city, disabled: false }),
    //   // [emp.city],
    //   state: new FormControl({ value: emp.state, disabled: false }),
    //   // [emp.state],
    //   country:new FormControl({ value: emp.country, disabled: false }),
    //   //  [emp.country],
    //   zipcode:new FormControl({ value: emp.zipcode, disabled: false },{validators:[Validators.required, Validators.maxLength(6)]}),
    //   //  [emp.zipcode,[Validators.required, Validators.maxLength(6)]],
    //   position: new FormControl({ value: emp.position, disabled: false }),
    //   // [emp.position],
    //   salary:new FormControl({ value: emp.salary, disabled: false }),
    //   //  [emp.salary,[Validators]],
    // });
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
      this.initializeForm(); // Initialize form with default values
    }
  }

  initializeForm(emp?: EmployeeList): void {
    this.editEmployeeForm = new FormGroup({
      employeeId: new FormControl({ value: emp?.employeeId, disabled: true }),
      fname: new FormControl(
        { value: emp?.fname || '', disabled: false },
        { validators: [Validators.required, Validators.minLength(3)] }
      ),
      // [emp.fname, [Validators.required, Validators.minLength(3)]],
      lname: new FormControl(
        { value: emp?.lname, disabled: false },
        { validators: [Validators.required, Validators.minLength(3)] }
      ),
      // [emp.lname,[Validators.required, Validators.minLength(3)]],
      email: new FormControl(
        { value: emp?.email, disabled: false },
        { validators: [Validators.required, Validators.email] }
      ),
      // [emp.email,[Validators.required, Validators.email]],
      mobile: new FormControl(
        { value: emp?.mobile, disabled: false },
        { validators: [Validators.minLength(10), Validators.maxLength(10)] }
      ),
      // [emp.mobile,[Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
      addressLine1: new FormControl(
        { value: emp?.addressLine1, disabled: false },
        { validators: [Validators.required, Validators.maxLength(25)] }
      ),
      //  [emp.addressLine1,[Validators.required, Validators.maxLength(25)]],
      addressLine2: new FormControl(
        { value: emp?.addressLine2, disabled: false },
        { validators: [Validators.maxLength(25)] }
      ),
      // [emp.addressLine2,[Validators.maxLength(25)]],
      city: new FormControl({ value: emp?.city, disabled: false }),
      // [emp.city],
      state: new FormControl({ value: emp?.state, disabled: false }),
      // [emp.state],
      country: new FormControl({ value: emp?.country, disabled: false }),
      //  [emp.country],
      zipcode: new FormControl(
        { value: emp?.zipcode, disabled: false },
        { validators: [Validators.required, Validators.maxLength(6)] }
      ),
      //  [emp.zipcode,[Validators.required, Validators.maxLength(6)]],
      position: new FormControl({ value: emp?.position, disabled: false }),
      // [emp.position],
      salary: new FormControl({ value: emp?.salary, disabled: false }),
      //  [emp.salary,[Validators]],
    });
  }

  editEmployee() {
    const id: string = this.editEmployeeService.employee.id as string;
    const data = this.editEmployeeForm.getRawValue() as EmployeeList;
    this.editEmployeeService.editEmployeeData(id, data).subscribe((data) => {});
    this.router.navigate(['employee']);
  }

}
