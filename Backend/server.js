const express = require('express');
const app = express();
 const sequelize = require('./config/db')
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
