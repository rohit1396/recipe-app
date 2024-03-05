import mongoose, { connect } from "mongoose";

mongoose
  .connect(
    "mongodb+srv://rohitgaikwad726:rohit1396@cluster0.3tahmua.mongodb.net/recipes?retryWrites=true&w=majority"
  )
  .then(() => console.log("Mongo Db Connected"))
  .catch((err) => console.log(err));

export default connect;
