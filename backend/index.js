const express = require("express");
const { createTodo, updateTodo } = require("./zod");
const { todo } = require("./db"); 
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors({}));

// CREATE Todo
app.post("/todos", async (req, res) => {
  const { title, description, completed } = req.body;
  try {
    // Input validation
    const validTodo = createTodo.parse({ title, description, completed });
    
    const newTodo = new todo({
      title: validTodo.title,
      description: validTodo.description,
      completed: validTodo.completed || false,
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ error: "Server Error", details: error.message });
  }
});

// READ Todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await todo.find();
    res.json({ todos });
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// UPDATE Todo (Toggle Completion)
app.put("/todos/:title", async (req, res) => {
  const title = req.params.title;
  const { completed } = req.body;
  
  try {
    const updatedTodo = await todo.findOneAndUpdate(
      { title },
      { completed },
      { new: true }
    );
    
    if (updatedTodo) {
      res.json(updatedTodo);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (e) {
    console.error("Error updating todo:", e);
    res.status(500).json({ error: "Server Error" });
  }
});

// FULL UPDATE Todo (title, description, completed)
app.put("/todos/update/:title", async (req, res) => {
  const title = req.params.title;
  const updateData = {
    title: req.body.title,
    description: req.body.description,
    ...(req.body.completed !== undefined && { completed: req.body.completed }),
  };

  try {
    const updatedTodo = await todo.findOneAndUpdate(
      { title },
      updateData,
      { new: true }
    );

    if (updatedTodo) {
      res.json(updatedTodo);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (e) {
    console.error("Error updating todo:", e);
    res.status(500).json({ error: "An error occurred while updating the todo" });
  }
});

// DELETE Todo
app.delete("/todos/delete/:title", async (req, res) => {
  const { title } = req.params;

  try {
    const deletedTodo = await todo.findOneAndDelete({ title });

    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(4000, () => {
  console.log("Server is started on port 4000...");
});
