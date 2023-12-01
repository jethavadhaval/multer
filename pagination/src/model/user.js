import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  isActive: { type: Boolean },
  picture: { type: String },
  age: { type: String },
  name: { type: String },
  gender: { type: String },
  email: { type: String },
  address: { type: String },
  registered: { type: Date },
});

export default mongoose.model("User", userSchema);
