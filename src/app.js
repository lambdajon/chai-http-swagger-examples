const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer')
const app = express();
const swagger = require('./swagger/swagger');

app.use(bodyParser.json());
app.use(swagger);


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/static')
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.')[1]
    cb(null, `${file.fieldname + '_' + Date.now()}.${ext}`)
  }
})

const upload = multer({ storage: storage })

let users = [
  {
    id: 1,
    username: 'Abdul',
    position: 'Engineer'
  },
  {
    id: 2,
    username: 'Bilal',
    position: 'Manager'
  }
];

const data = {
  msg: 'OK',
  data: [
    { id: 1, username: 'Abdul', position: 'Engineer' },
    { id: 2, username: 'Bilal', position: 'Manager' },
    
  ]
}

app.get('/', (req, res) => {
  res.sendStatus(200)
  res.json({
    msg: "HELLO WORLD"
  });
});

app.get('/users', (req, res) => {
  res.json({ msg: 'OK', data: users });
});

app.post('/users', upload.single('avatar'), (req, res) => {
  const newUser = req.body;
  const lasatID = users[users.length - 1].id;

  newUser.id = lasatID + 1;
  users.push(newUser);
  res.json(newUser);
});

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const targetUser = users.find((user) => user.id == userId);

  if (!targetUser) {
    return res.status(404).json({

      msg: 'NOT_FOUND'
    });
  }
  res.json(targetUser);
});

app.put('/users/:id', (req, res) => {
  const userId = req.params.id;

  const { username, position } = req.body;

  if (!username && !position) {
    return res.json({
      code: 400,
      msg: 'BAD_REQUEST'
    });
  }
  const targetUser = users.find((user) => user.id == userId);

  if (!targetUser) {
    return res.json({
      code: 404,
      msg: 'NOT_FOUND'
    });
  }

  if (username) {
    targetUser.username = username;
  }
  if (position) {
    targetUser.position = position;
  }

  users = users.map((user) => {
    if (user.id == userId) {
      return targetUser;
    }
    return user;
  });

  res.json(targetUser);
});

app.delete('/users/:id', (req, res) => {

  const userId = req.params.id;
  const targetUser = users.find((user) => user.id == userId);

  if (!targetUser) {
    return res.status(404).json({
      msg: 'NOT_FOUND'
    });
  }

  users = users.filter((user) => user.id != userId)

  res.json(targetUser);
});

app.get('/private', (req, res) => {
  if(!req.headers.authorization){
    res.status(403).json({
      msg: 'Unauthorized'
    })
  }
  res.json({
    msg: 'PRIVATE_MESSAGE'
  });
});




module.exports.server = app;

