import React, { useEffect, useState } from 'react';
import axios from 'axios';

function User() {
  const [users, setUsers] = useState([]);
  const getUser = () => {
    axios
      .get('/users')
      .then((res) => {
        setUsers(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUser();
  }, []);
  const addUser = (event) => {
    event.preventDefault();
    const obj = {
      email: event.target.email.value,
      password: event.target.password.value,
      dob: event.target.dob.value,
      userinfo: event.target.userinfo.value,
    };
    axios.post('/users', obj).then((res) => {
      getUser();
      console.log(res.data);
    });
  };
  const deleteItem = (index) => {
    axios.delete(`/users/${index}`).then((res) => {
      console.log(res.data);
      getUser();
    });
  };
  return (
    <div className="container">
      <div className="form">
        <h1>Add User</h1>
        <form onSubmit={addUser}>
          <div>
            <b>Enter Email:</b>
          </div>
          <input type="email" placeholder="Email Address" name="email" />
          <br />
          <div>
            <b>Enter Password:</b>
          </div>
          <input type="password" placeholder="Password" name="password" />
          <br />
          <div>
            <b>Choose Date of Birth:</b>
          </div>
          <input type="date" placeholder="enter Date Of Birth" name="dob" />
          <br />
          <div>
            <b>Enter user Information:</b>
          </div>
          <textarea placeholder="User Information" name="userinfo" />
          <br />

          <button type="submit">Add User</button>
        </form>
        <button type="button" onClick={() => deleteItem('deleteAll')}>
          Delete all Users
        </button>
      </div>
      <div className="list">
        <h1>Users List</h1>
        <table>
          <tr>
            <th>Email</th>
            <th>password</th>
            <th>user Info</th>
            <th>Date of birth</th>
            <th>Delete</th>
          </tr>
          {users.map((user) => (
            <tr>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.userinfo}</td>
              <td>{user.dob}</td>
              <td>
                <button
                  type="button"
                  className="del-item"
                  onClick={() => deleteItem(user.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
export default User;
