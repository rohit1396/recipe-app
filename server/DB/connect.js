import mongoose, { connect } from "mongoose";

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Mongo Db Connected"))
  .catch((err) => console.log(err));

export default connect;
