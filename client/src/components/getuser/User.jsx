import React, { useEffect, useState } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import "./user.css";
import { Link } from 'react-router-dom';

const User = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [editedValues, setEditedValues] = useState({});
    const [filter, setFilter] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [sortOrder, setSortOrder] = useState("asc"); // Sorting order state

    // Dropdown options
    const statusOptions = ["Pending", "Done"];
    const paymentModeOptions = ["G-Pay", "Cash"];
    const paymentStatusOptions = ["Pending", "Done"];

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`https://hitakshi-pay-api.vercel.app/api/getall`);
            setUsers(response.data);
            setFilteredUsers(response.data);
        }
        fetchData();
    }, []);

    useEffect(() => {
        let filteredData = users;
        if (filter) {
            filteredData = users.filter(user => user.status === filter);
        }
        if (searchQuery) {
            filteredData = filteredData.filter(user =>
                user.fname.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        setFilteredUsers(filteredData);
    }, [filter, searchQuery, users]);

    const deleteUser = async (userId) => {
        await axios.delete(`https://hitakshi-pay-api.vercel.app/api/delete/${userId}`)
            .then((response) => {
                setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
                toast.success(response.data.msg, { position: 'top-right' });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleEditClick = (user) => {
        setEditingUser(user._id);
        setEditedValues({
            fname: user.fname,
            payment: user.payment,
            status: user.status,
            paymentMode: user.paymentMode,
            personName: user.personName,
            paymentStatus: user.paymentStatus
        });
    }

    const handleChange = (e) => {
        setEditedValues({
            ...editedValues,
            [e.target.name]: e.target.value
        });
    }

    const handleSave = async (userId) => {
        await axios.put(`https://hitakshi-pay-api.vercel.app/api/update/${userId}`, editedValues)
            .then((response) => {
                setUsers((prevUser) => prevUser.map((user) =>
                    user._id === userId ? { ...user, ...editedValues } : user
                ));
                setEditingUser(null);
                toast.success(response.data.msg, { position: 'top-right' });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const calculateTotalPayment = () => {
        return filteredUsers.reduce((total, user) => {
            if (filter === "Done" && user.status !== "Done") return total;
            return total + parseFloat(user.payment);
        }, 0);
    }

    const handleSort = () => {
        const sortedUsers = [...filteredUsers].sort((a, b) => {
            if (sortOrder === "asc") {
                return a.fname.localeCompare(b.fname);
            } else {
                return b.fname.localeCompare(a.fname);
            }
        });
        setFilteredUsers(sortedUsers);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sort order
    }

    return (
        <div className='userTable'>
            <Link to={"/add"} className='addButton'>Add User</Link>
            <div className="btn-wrapper">
                <div className="right-data">
                    <div className="filter-data">
                        <label>Filter :</label>
                        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
                            <option value="">All</option>
                            <option value="Pending">Pending</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                </div>
                <div className="search-header-display-full">
                    <form method="get">
                        <input
                            type="text"
                            name="search"
                            className="search-words"
                            placeholder="Search Name Here..."
                            aria-label="Search"
                            autoComplete="off"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="header-search-btn" aria-label="Search">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                <path d="M16.031 14.6168L20.3137 18.8995L18.8995 20.3137L14.6168 16.031C13.0769 17.263 11.124 18 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18 11.124 17.263 13.0769 16.031 14.6168ZM14.0247 13.8748C15.2475 12.6146 16 10.8956 16 9C16 5.1325 12.8675 2 9 2C5.1325 2 2 5.1325 2 9C2 12.8675 5.1325 16 9 16C10.8956 16 12.6146 15.2475 13.8748 14.0247L14.0247 13.8748Z" fill="#222222"></path>
                            </svg>
                        </button>
                    </form>
                </div>
                <button className="sort-btn" onClick={handleSort}>
                    Sort by Name: ({sortOrder === "asc" ? "A-Z" : "Z-A"})
                </button>
            </div>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>User Name</th>
                        <th>Total Payment: {calculateTotalPayment()}</th>
                        <th>Status</th>
                        <th>Payment Mode</th>
                        <th>Working Person</th>
                        <th>Payment Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredUsers.map((user, index) => {
                            const isEditing = user._id === editingUser;
                            return (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        {isEditing ?
                                            <input type="text" name="fname" value={editedValues.fname} onChange={handleChange} />
                                            : user.fname}
                                    </td>
                                    <td>
                                        {isEditing ?
                                            <input type="text" name="payment" value={editedValues.payment} onChange={handleChange} />
                                            : user.payment}
                                    </td>
                                    <td>
                                        {isEditing ?
                                            <select name="status" value={editedValues.status} onChange={handleChange}>
                                                {statusOptions.map(option => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))}
                                            </select>
                                            : user.status}
                                    </td>
                                    <td>
                                        {isEditing ?
                                            <select name="paymentMode" value={editedValues.paymentMode} onChange={handleChange}>
                                                {paymentModeOptions.map(option => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))}
                                            </select>
                                            : user.paymentMode}
                                    </td>
                                    <td>
                                        {isEditing ?
                                            <input type="text" name="personName" value={editedValues.personName} onChange={handleChange} />
                                            : user.personName}
                                    </td>
                                    <td>
                                        {isEditing ?
                                            <select name="paymentStatus" value={editedValues.paymentStatus} onChange={handleChange}>
                                                {paymentStatusOptions.map(option => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))}
                                            </select>
                                            : user.paymentStatus}
                                    </td>
                                    <td className='actionButtons'>
                                        {isEditing ?
                                            <>
                                                <button className='save' onClick={() => handleSave(user._id)}>Save</button>
                                                <button onClick={() => setEditingUser(null)}>Cancel</button>
                                            </>
                                            :
                                            <>
                                                <button onClick={() => deleteUser(user._id)}><i className="fa-solid fa-trash"></i></button>
                                                <button className="edit" onClick={() => handleEditClick(user)}><i className="fa-solid fa-pen-to-square"></i></button>
                                            </>
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default User;


