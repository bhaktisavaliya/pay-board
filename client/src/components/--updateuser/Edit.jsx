import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import "../adduser/add.css";
import toast from 'react-hot-toast';

const Edit = () => {

  const initialUserState = {
    fname: "",
    status: "pending",
    paymentMode: "gpay",
    personName: "",
    paymentStatus: "pending"
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(initialUserState);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  useEffect(() => {
    axios.get(`https://hitakshi-pay-api.vercel.app/api/getone/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios.put(`https://hitakshi-pay-api.vercel.app/api/update/${id}`, user)
      .then((response) => {
        toast.success(response.data.msg, { position: "top-right" });
        navigate("/");
      })
      .catch(error => console.log(error));
  };

  return (
    <div className='addUser'>
      <Link to={"/"}>Back</Link>
      <h3>Update User</h3>
      <form className='addUserForm' onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fname">First name</label>
          <input
            type="text"
            value={user.fname}
            onChange={inputChangeHandler}
            id="fname"
            name="fname"
            autoComplete='off'
            placeholder='First name'
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="payment">Payment</label>
          <input
            type="number"
            value={user.payment}
            onChange={inputChangeHandler}
            id="payment"
            name="payment"
            autoComplete='off'
            placeholder='Payment'
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={user.status}
            onChange={inputChangeHandler}
          >
            <option value="pending">Pending</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div className="inputGroup">
          <label htmlFor="paymentMode">Payment Mode</label>
          <select
            id="paymentMode"
            name="paymentMode"
            value={user.paymentMode}
            onChange={inputChangeHandler}
          >
            <option value="gpay">GPay</option>
            <option value="cash">Cash</option>
          </select>
        </div>
        <div className="inputGroup">
          <label htmlFor="personName">Working Person</label>
          <input
            type="text"
            value={user.personName}
            onChange={inputChangeHandler}
            id="personName"
            name="personName"
            autoComplete='off'
            placeholder='Working Person'
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="paymentStatus">Payment Status</label>
          <select
            id="paymentStatus"
            name="paymentStatus"
            value={user.paymentStatus}
            onChange={inputChangeHandler}
          >
            <option value="pending">Pending</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div className="inputGroup">
          <button type="submit">UPDATE USER</button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
