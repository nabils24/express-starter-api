const userdb = require("../database/user.json");
const fs = require("fs");

/**
 * description: add user to database
 * @param {string} id
 * @param {string} username
 * @param {number} age
 * @param {string} email
 * @returns {void}
 */
const adduser = (id, username, age, email) =>
  new Promise((resolve, reject) => {
    const user = {
      id,
      username,
      age,
      email,
    };
    userdb.push(user);
    fs.writeFileSync("./database/user.json", JSON.stringify(userdb));
    resolve({
      status: 200,
      message: "Success add user",
    });
  });

/**
 * description: find user by id
 * @param {string} id
 * @returns {object}
 */
const finduser = (id) =>
  new Promise((resolve, reject) => {
    const user = userdb.find((user) => user.id === id);
    if (!user) {
      reject({
        status: 404,
        message: "User not found",
      });
    }
    resolve({
      status: 200,
      message: "Success!",
      result: user,
    });
  });

/**
 * description: delete user by id
 * @param {string} id
 * @returns {void}
 */
const deleteuser = (id) =>
  new Promise((resolve, reject) => {
    const user = userdb.find((user) => user.id === id);
    if (!user) {
      reject({
        status: 404,
        message: "User not found",
      });
    }
    const newuser = userdb.filter((user) => user.id !== id);
    fs.writeFileSync("./database/user.json", JSON.stringify(newuser));
    resolve({
      status: 200,
      message: "Success delete user",
    });
  });

/**
 * description: update user by id
 * @param {string} id
 * @param {string} username
 * @param {number} age
 * @param {string} email
 * @returns {void}
 */
const updateuser = (id, username, age, email) =>
  new Promise((resolve, reject) => {
    const user = userdb.find((user) => user.id === id);
    if (!user) {
      reject({
        status: 404,
        message: "User not found",
      });
    }
    user.username = username;
    user.age = age;
    user.email = email;
    fs.writeFileSync("./database/user.json", JSON.stringify(userdb));
    resolve({
        status: 200,
        message: "Success update user",
        result: user,
    });
  });

module.exports = {
  adduser,
  finduser,
  deleteuser,
  updateuser,
};
