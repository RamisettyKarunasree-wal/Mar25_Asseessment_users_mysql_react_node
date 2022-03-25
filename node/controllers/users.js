const connector = require('../connect');
const createUsersTable = (req, res) => {
  var sql =
    'create table users(id int AUTO_INCREMENT PRIMARY KEY,email varchar(100),password varchar(100),userinfo text,dob date)';
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
};

const getUsers = (req, res) => {
  var sql = 'select * from users';
  connector.query(sql, function (err, results) {
    res.json({ err, results });
  });
};
const viewUser = (req, res) => {
  var sql = `select * from users where id=${Number(req.params.id)}`;
  connector.query(sql, function (err, results) {
    res.json({ err, results });
  });
};
const postUsers = (req, res) => {
  const { email, password, userinfo, dob } = req.body;
  var sql = `insert into users (email, password, userinfo, dob) values ("${email}", "${password}", "${userinfo}", "${dob}")`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
};
const deleteUsers = (req, res) => {
  let sql;
  if (req.params.id === 'deleteAll') {
    sql = 'truncate table users';
  } else {
    sql = `delete from users where id=${Number(req.params.id)}`;
  }
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
};
const updateUsers = (req, res) => {
  const { email, password, userinfo, dob } = req.body;
  var sql = `update users set email="${email}", password="${password}", userinfo="${userinfo}", dob="${dob}" where id=${Number(
    req.params.id
  )}`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
};
module.exports = {
  getUsers,
  postUsers,
  deleteUsers,
  updateUsers,
  createUsersTable,
  viewUser,
};
