const express = require('express');
const cors = require('cors')
const app = express();
const sequelize = require('./config/db')
const farmerRoutes = require('./routes/farmerRoutes')
const buyerRoutes = require('./routes/buyerRoutes')
const contractRoutes = require('./routes/contractRoutes')
const generalRoutes = require('./routes/generalRoutes')

app.use(cors())
app.use(express.json());
app.use('/farmer', farmerRoutes);
app.use('/buyer', buyerRoutes);
app.use('/contract', contractRoutes);
app.use('/general', generalRoutes)

app.get('/', function (req, res) {
  res.send('Krishi')
})

sequelize.sync()
  .then(() => {
    app.listen(8080, () => {
      console.log('Server is running on port 8080');
    });
  })
  .catch(err => {
    console.error('Failed to sync database and start server:', err);
  });