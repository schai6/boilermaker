const app = require('./server');
const {
  db
} = require('./server/db/models');

const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!
db.sync()
  .then(() => {
    app.listen(port, function () {
      console.log(`Your server, listening on port ${port}`);
    });
  });
