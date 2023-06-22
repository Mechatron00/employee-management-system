package com.employee.controller;

import com.employee.model.Employee;
import com.employee.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/employee")
public class EmployeeController
{
    @Autowired
    private EmployeeService employeeService;

    //get all employees data
    @GetMapping
    public ResponseEntity<?> getAllEmployees()
    {
        return  employeeService.getAllEmployees();
    }

    //get by id
    @GetMapping("/{id}")
    public ResponseEntity<?> getEmployeeById(@PathVariable String id)
    {
        return employeeService.getEmployeeById(id);
    }

    @PostMapping
    public ResponseEntity<?> addEmployee(@RequestBody Employee employee)
    {
        return employeeService.addEmployee(employee);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable String id,@RequestBody Employee employee)
    {

        return employeeService.updateEmployee(id, employee);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable String id)
    {
        return employeeService.deleteEmployee(id);
    }
}
