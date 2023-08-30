const pool = require("../config/db/config");

class EmployeeData {
  constructor(employee) {
    this.first_name = employee.fname;
    this.last_name = employee.lname;
    this.email = employee.email;
    this.phone = employee.phone;
    this.salary = employee.salary;
  }

  // GET ALL EMPLOYEES
  static getAllEmployees(result) {
    pool.query("SELECT * FROM employees", (err, res) => {
      if (err) {
        console.log("Error while fetching employees", err);
        result(err, null);
      } else {
        console.log("Employees fetched successfully");
        result(null, res.rows); // Using res.rows for PostgreSQL
      }
    });
  }

  // get employee by Name for Search Data by name
  static getEmployeeByName(first_name, result) {
    pool.query(
      "SELECT * FROM employees WHERE first_name = $1",
      [first_name],
      (err, res) => {
        if (err) {
          console.log("Error while fetching employee by name", err);
          result(err, null);
        } else {
          result(null, res.rows); // Using res.rows for PostgreSQL
        }
      }
    );
  }

  // create new employee
  static createEmployee(employeeReqData, result) {
    pool.query(
      "INSERT INTO employees (first_name, last_name, email, phone, salary) VALUES ($1, $2, $3, $4, $5)",
      [
        employeeReqData.first_name,
        employeeReqData.last_name,
        employeeReqData.email,
        employeeReqData.phone,
        employeeReqData.salary,
      ],
      (err, res) => {
        if (err) {
          console.log("Error while inserting data", err);
          result(err, null);
        } else {
          console.log("Employee created successfully");
          result(null, res);
        }
      }
    );
  }

  // get employee by ID for update
  static getEmployeeByID(id, result) {
    pool.query(
      "SELECT * FROM employees WHERE id = $1",
      [id],
      (err, res) => {
        if (err) {
          console.log("Error while fetching employee by id", err);
          result(err, null);
        } else {
          result(null, res.rows); // Using res.rows for PostgreSQL
        }
      }
    );
  }

  // update employee
  static updateEmployee(id, employeeReqData, result) {
    pool.query(
      "UPDATE employees SET first_name = $1, last_name = $2, email = $3, phone = $4, salary = $5 WHERE id = $6",
      [
        employeeReqData.first_name,
        employeeReqData.last_name,
        employeeReqData.email,
        employeeReqData.phone,
        employeeReqData.salary,
        id,
      ],
      (err, res) => {
        if (err) {
          console.log("Error while updating the employee", err);
          result(err, null);
        } else {
          console.log("Employee updated successfully");
          result(null, res);
        }
      }
    );
  }

  // delete employee
  static deleteEmployee(id, result) {
    pool.query(
      "DELETE FROM employees WHERE id = $1",
      [id],
      (err, res) => {
        if (err) {
          console.log("Error while deleting the employee", err);
          result(err, null);
        } else {
          result(null, res);
        }
      }
    );
  }
}

module.exports = EmployeeData;
