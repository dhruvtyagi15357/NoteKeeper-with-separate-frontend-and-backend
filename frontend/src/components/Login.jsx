import React from "react";
import { useNavigate } from "react-router-dom"

const Login = () => {
  
  // get the host from the env file

  const host = import.meta.env.VITE_MONGODB + ":" + import.meta.env.VITE_PORT;
  // const host = "http://localhost:5000";
  
  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // email and password from the form input
    const email = e.target[0].value;
    const password = e.target[1].value;

    console.log(email, password)
    const url = `${host}/api/auth/login`;
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({email, password})
    });

    const responseJson = await response.json();
    console.log(responseJson)
    if (responseJson.success){
      localStorage.setItem('token', responseJson.authToken)
      navigate("/")
    } else {
      alert("Invalid Credentials")
    }

  };
  return (
    <form onSubmit={handleSubmit} className="my-5">
      <div className="row mb-3">
        <label htmlFor="email" className="col-sm-2 col-form-label">
          Email address
        </label>
        <div className="col-sm-10">
          <input
            type="email"
            className="form-control"
            id="email"
            name="Email"
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="password" className="col-sm-2 col-form-label">
          Password
        </label>
        <div className="col-sm-10">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Sign in
      </button>
    </form>
  );
};

export default Login;
