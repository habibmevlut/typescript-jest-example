const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen(3000, () => console.log("Listening at port 3000"))


const todos = [];
app.get("/todos", (req, res) => {
    return res.status(200).json({
        data: todos,
        error: null,
    });
});

app.post("/todo", (req, res) => {
    try {
        const {id, item, completed} = req.body;
        const newTodo = {
            id,
            item,
            completed,
        };
        todos.push(newTodo);
        return res.status(201).json({
            data: todos,
            error: null,
        });
    } catch (error) {
        return res.status(500).json({
            data: null,
            error: error,
        });
    }
});

app.put("/todos/:id", (req, res) => {
    try {
        const id = req.params.id
        const todo = todos.filter((todo) => todo.id === id);
        console.log(todo)
        if (!todo) {
            throw new Error("Todo not found")
        }
        todo.completed = req.body.completed;
        return res.status(201).json({
            data: todo,
            error: null,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: null,
            error: error,
        });
    }
});

app.delete("/todos/:id", (req, res) => {
    try {
        const id = req.params.id
        const todo = todos[0]
        if(todo) {
            todos.splice(id, 1)
        }
        return res.status(200).json({
            data: todos,
            error: null,
        });
    } catch (error) {
        return res.status(500).json({
            data: null,
            error: error,
        });
    }
});
