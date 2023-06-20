import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { AddemployeeComponent } from './employee/addemployee/addemployee.component';
import { EditEmployeeComponent } from './employee/edit-employee/edit-employee.component';

const routes: Routes = 
[
  {path:'',component:EmployeeComponent},
  {path:'employee',component:EmployeeComponent},
  {path:'add',component:AddemployeeComponent},
  {path:'edit',component:EditEmployeeComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
