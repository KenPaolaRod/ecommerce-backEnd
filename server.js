const mongoose = require("mongoose");
dotenv = require('dotenv');

dotenv.config({path: './config.env'});
const app = require('./index');

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD)

 mongoose.connect(DB).then(() => console.log('connected'))


const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log(`listening to ${port}`);
});



