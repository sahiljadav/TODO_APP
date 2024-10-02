const mongoose = require("mongoose");

mongoose.connect(
 "mongodb+srv://sahiljadav:SahiL1507@cluster0.ravm8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
}, { timestamps: true });


const todo = mongoose.model("todos", todoSchema);
module.exports = {
  todo,
};
