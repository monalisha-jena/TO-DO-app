// This setup allows you to interact with the to-do list server using Postman

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let todos = [];
let idCounter = 1;

// GET request http://localhost:3000/todos - Retrieve all to-do items
app.get('/todos', (req, res) => {
    res.json(todos);
});

// POST request http://localhost:3000/todos - Add a new to-do item
app.post('/todos', (req, res) => {
    const newTodo = {
        id: idCounter++, 
        task: req.body.task || 'Unnamed Task'
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// DELETE request http://localhost:3000/todos/3 - Remove a specific to-do item by its ID
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = todos.findIndex(todo => todo.id === id);

    if (index !== -1) {
        const deletedTodo = todos.splice(index, 1);
        res.json(deletedTodo[0]);
    } else {
        res.status(404).json({ message: 'To-do item not found' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`The server is running on ${port}`);
});

