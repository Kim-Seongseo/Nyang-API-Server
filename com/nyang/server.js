const express = require('express');
const bodyParser = require('body-parser');
const db = require('./domain/entity/index');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.Member = require('./domain/entity/member/member');

console.log(db.Memeber);
db.sequelize.sync({ alter: true });

app.get('/api/user/1', (req, res) => {
  res.status('400').end();
});

app.post('/api/post/user/', (req, res) => {
  const id = req.body.id;
  const username = req.body.username;
  const date = req.body.date;
  const task = req.body.task;
  console.log(id, username, date, task);
  db.Member.create({ id, username, date, task }).then((member) => {
    res.status(200).json(member);
  });
});

app.listen(9000, () => {
  console.log('server is running localhost:9000');
});
