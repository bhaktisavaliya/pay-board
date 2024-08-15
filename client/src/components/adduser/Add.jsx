import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "./add.css";
import toast from 'react-hot-toast';

const Add = () => {

  // Initial state with all fields
  const initialUserState = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    payment: 0,
    status: "pending",
    paymentMode: "gpay",
    personName: "",
    paymentStatus: "pending"
  };

  const [user, setUser] = useState(initialUserState);
  const navigate = useNavigate();

  // Input handler to update state dynamically
  const inputHandler = (e) => {
      const { name, value } = e.target;
      setUser({ ...user, [name]: value });
  }

  // Submit handler to send form data to the backend
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://hitakshi-pay-api.vercel.app/api/create`, user);
      toast.success(response.data.msg, { position: "top-right" });
      navigate("/users");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='addUser'>
        <Link to={"/users"}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m8 5l-5 5l5 5"/><path d="M3 10h8c5.523 0 10 4.477 10 10v1"/></g></svg>Back</Link>
        <h3>Add New User</h3>
        <form className='addUserForm' onSubmit={submitForm}>
            <div className="inputGroup">
                <label htmlFor="fname">First name</label>
                <input type="text" onChange={inputHandler} id="fname" name="fname" autoComplete='off' placeholder='First name' />
            </div>
            <div className="inputGroup">
                <label htmlFor="payment">Payment</label>
                <input type="number" onChange={inputHandler} id="payment" name="payment" autoComplete='off' placeholder='Payment' />
            </div>
            <div className="inputGroup">
                <label htmlFor="status">Status</label>
                <select id="status" name="status" onChange={inputHandler}>
                    <option value="pending">Pending</option>
                    <option value="done">Done</option>
                </select>
            </div>
            <div className="inputGroup">
                <label htmlFor="paymentMode">Payment Mode</label>
                <select id="paymentMode" name="paymentMode" onChange={inputHandler}>
                    <option value="gpay">GPay</option>
                    <option value="cash">Cash</option>
                </select>
            </div>
            <div className="inputGroup">
                <label htmlFor="personName">Working Person</label>
                <input type="text" onChange={inputHandler} id="personName" name="personName" autoComplete='off' placeholder='Working Person' />
            </div>
            <div className="inputGroup">
                <label htmlFor="paymentStatus">Payment Status</label>
                <select id="paymentStatus" name="paymentStatus" onChange={inputHandler}>
                    <option value="pending">Pending</option>
                    <option value="done">Done</option>
                </select>
            </div>
            <div className="inputGroup">
                <button type="submit">ADD Data</button>
            </div>
        </form>
    </div>
  );
}

export default Add;
