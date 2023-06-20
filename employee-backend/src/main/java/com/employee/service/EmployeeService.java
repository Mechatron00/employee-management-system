package com.employee.service;

import com.employee.model.Employee;
import com.employee.repository.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService
{
    @Autowired
    private EmployeeRepo employeeRepo;

    //add employee data
    public ResponseEntity<?> addEmployee(Employee employee)
    {
        if (employee != null)
        {
            Employee newEmployee = employeeRepo.save(employee);
            return new ResponseEntity<>(newEmployee, HttpStatus.CREATED);
        }
        else return ResponseEntity.badRequest().body("Enter all required data");
    }

    //get all employees
    public ResponseEntity<?> getAllEmployees()
    {
        List<Employee> employeeList = employeeRepo.findAll();

            return new ResponseEntity<>(employeeList, HttpStatus.OK);

    }

    //get employee by id
    public ResponseEntity<?> getEmployeeById(String id)
    {
        Optional<Employee> isExisted = employeeRepo.findById(id);
        if(isExisted.isPresent())
        {
            Employee existed = isExisted.get();
            return new ResponseEntity<>(existed, HttpStatus.OK);
        }
        else return ResponseEntity.badRequest().body("Employee not fount");
    }

    //update employee
//    private String fname;
//    private String lname;
//    private String email;
//    private String mobile;
//    private String addressLine1;
//    private String addressLine2;
//    private String city;
//    private String state;
//    private String country;
//    private String zipcode;
//    private String position;
//    private double salary;
    public ResponseEntity<?> updateEmployee(String id, Employee employee)
    {
        Optional<Employee> isExisted = employeeRepo.findById(id);
        if(isExisted.isPresent())
        {
            Employee existed = isExisted.get();
            existed.setEmployeeId(employee.getEmployeeId());
            existed.setFname(employee.getFname());
            existed.setLname(employee.getLname());
            existed.setEmail(employee.getEmail());
            existed.setMobile(employee.getMobile());
            existed.setAddressLine1(employee.getAddressLine1());
            existed.setAddressLine2(employee.getAddressLine2());
            existed.setCity(employee.getCity());
            existed.setState(employee.getState());
            existed.setCountry(employee.getCountry());
            existed.setZipcode(employee.getZipcode());
            existed.setPosition(employee.getPosition());
            existed.setSalary(employee.getSalary());

            Employee updated = employeeRepo.save(existed);
            return  new ResponseEntity<>(updated, HttpStatus.OK);
        }
        else return ResponseEntity.badRequest().body("Employee not found");
    }

    //delete employee
    public ResponseEntity<?> deleteEmployee(String id)
    {
        Optional<Employee> isExisted = employeeRepo.findById(id);
        if(isExisted.isPresent())
        {
            Employee present = isExisted.get();
            employeeRepo.delete(present);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else return ResponseEntity.badRequest().body("Employee not found");
    }
}
