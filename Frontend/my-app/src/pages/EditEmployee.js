import React, { useState, useEffect } from "react";
import { api } from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
 
const EditEmployee = () => {
   
  let navigate = useNavigate(); //The useNavigate hook gives you access to the navigate instance that you may use to navigate.
  const { id } = useParams();  //The useParams() hook helps us to access the URL parameters from a current route. 
//   console.log('id :::', id);
 
  const [user ,setUser] = useState({
      fname:"",
      lname:"",
      email:"",
      phone:"",
      salary:""
  })
 
 
  const { fname, lname, email, phone, salary } = user;
 
  const onInputChange = e => {
    setUser({ ...user,[e.target.name]: e.target.value });
  };
 
  useEffect(() => {
    loadUser();
  }, []);
 
   
  const updateEmployee = async e => {
    e.preventDefault();
    await api.put(`/employee/${id}`, user);
    navigate("/");
  };
 
  const loadUser =  async () => {
   const res = await api.get(`/employee/${id}`);

   const obj = {
    id: id,
    update: true,
    fname : res.data.response[0].first_name,
    lname : res.data.response[0].last_name,
    email : res.data.response[0].email,
    phone : res.data.response[0].phone,
    salary : res.data.response[0].salary,
   }
   setUser(obj);
  };
 
  return (
    <div className="container">
     <div className="row mt-4"> 
      <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
        <h4 className="text-center mb-4">Edit A employee</h4>
       
          <h5 className="text-success">Employee ID : {user.id} </h5>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter First Name"
              name="fname"
              value={fname}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Last Name"
              name="lname"
              value={lname}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Email"
              name="email"
              value={email}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Phone"
              name="phone"
              value={phone}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Salary"
              name="salary"
              value={salary}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button onClick={updateEmployee} className="btn btn-secondary btn-block">Update Employee</button>
       
       </div>
      </div> 
    </div>
  );
};
 
export default EditEmployee;