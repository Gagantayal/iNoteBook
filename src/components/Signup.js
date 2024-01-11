import React, { useState } from "react";
import {useNavigate } from "react-router-dom";

const Signup = (props) => {
    const [credentials,setCredentials] = useState({name:"", email:"", password:""})
    let navigate = useNavigate(); 
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {name,email,password} = credentials
        const response = await fetch("http://localhost:5000/api/auth",{
            method:'POST',
            headers:{
              'content-Type':'application/json',
            },
            body:JSON.stringify({name,email,password})
          });
          const json = await response.json()
          console.log(json)
          if(json.authToken){
            localStorage.setItem('token',json.authToken)
            navigate("/")
            props.showAlert("Accout Created successfully","sucess")
          }
          else{
            props.showAlert("wrong credentials","Danger")
          }

    }
    const onChange = (e)=>{
        setCredentials({...credentials,[e.target.name]: e.target.value})
    }
  return (
    <div>
      <h2 >Create your accout for free !!!</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control" 
            value={credentials.name}
            id="name"
            name="name"
            onChange={onChange}
            
          />
          </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control" 
            id="email"
            name="email"
            value={credentials.email}
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control" 
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
      </form>

    </div>
  )
}

export default Signup
