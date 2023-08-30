import React, { useState, useEffect } from "react";
import { api } from "../api/axios";
import { Link } from "react-router-dom";

function EmployeeDetail() {
  const [search, setSearch] = useState("");
  const [record, setRecord] = useState([]);

  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    salary: "",
  });

  //  Object Destructuring
  const { fname, lname, email, phone, salary } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // On Page load display all records
  const loadEmployeeDetail = async () => {
    const res = await api.get('/employee');
    setRecord(res.data);
  };

  useEffect(() => {
    loadEmployeeDetail();
  }, []);

  // Insert Employee Records
  const submitEmployeeRecord = async (e) => {
    e.preventDefault();
    e.target.reset();
    await api.post("/employee", user);
    alert("New Employee Data Successfully Inserted");

    loadEmployeeDetail();
  };

  // Search Records here
  const searchRecords = () => {
    // alert(search);
    api
      .get(`/employee/searchRecord/${search}`)
      .then((response) => {
        setRecord(response.data);
      });
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    if (event.target.value === "") {
      loadEmployeeDetail(); // Fetch all records when search box is cleared
    }
  };

  // Delete Employee Record
  const deleteRecord = async (employeeId) => {
    // console.log('employeeId', employeeId);
    await api.delete(`/employee/${employeeId}`);
    loadEmployeeDetail();
}

  return (
    <div className="container">
      <h4 className="mb-3 text-center mt-4">CRUD Operation in MERN</h4>
      <div className="row mt-3">
        <div className="col-sm-4">
          <div
            className="box p-3 mb-3 mt-5"
            style={{ border: "1px solid #d0d0d0" }}
          >
            <form onSubmit={submitEmployeeRecord}>
              <h5 className="mb-3 ">Insert Employee Records</h5>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control  mb-4"
                  name="fname"
                  value={fname}
                  onChange={(e) => onInputChange(e)}
                  placeholder="Enter FirstName"
                  required=""
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control  mb-4"
                  name="lname"
                  value={lname}
                  onChange={(e) => onInputChange(e)}
                  placeholder="Enter LastName"
                  required=""
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control mb-4"
                  name="email"
                  value={email}
                  onChange={(e) => onInputChange(e)}
                  placeholder="Enter Email"
                  required=""
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control mb-4"
                  name="phone"
                  value={phone}
                  onChange={(e) => onInputChange(e)}
                  placeholder="Enter Phone"
                  required=""
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control mb-2"
                  name="salary"
                  value={salary}
                  onChange={(e) => onInputChange(e)}
                  placeholder="Enter Salary"
                  required=""
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block mt-4">
                Insert Record
              </button>
            </form>
          </div>
        </div>
        <div className="col-sm-8">
          <h5 className="text-center  ml-4 mt-4  mb-5">View Records</h5>
          <div className="input-group mb-4 mt-3">
            <div className="form-outline">
              <input
                type="text"
                id="form1"
                onChange={handleSearchChange}
                className="form-control"
                placeholder="Search Employee Here from FirstName"
                style={{ backgroundColor: "#ececec" }}
              />
            </div>
            <button
              type="button"
              onClick={searchRecords}
              className="btn btn-success"
            >
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
          <table className="table table-hover  table-striped table-bordered ml-4 ">
            <thead>
              <tr>
                <th>#</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {record.map((val) => (
                <tr key={val.id}>
                  <td>{val.id}</td>
                  <td>{val.first_name}</td>
                  <td>{val.last_name}</td>
                  <td>{val.email}</td>
                  <td>{val.phone}</td>
                  <td>{val.salary}</td>
                  <td>
                    <a
                      className="text-danger mr-2"
                      onClick={() => {
                        const confirmBox = window.confirm(
                          "Do you really want to delete " + val.first_name
                        );
                        if (confirmBox === true) {
                          deleteRecord(val.id);
                        }
                      }}
                    >
                      {" "}
                      <i
                        className="far fa-trash-alt"
                        style={{ fontSize: "18px", marginRight: "5px" }}
                      ></i>{" "}
                    </a>

                    <Link
                      className=" mr-2"
                      to={`/EditEmployee/editID/${val.id}`}
                    >
                      <i className="fa fa-edit" aria-hidden="true"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetail;
