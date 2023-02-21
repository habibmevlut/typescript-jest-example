const express = require("express")
const app = express()
app.listen(3000, () => console.log("Listening at port 3000"))


const todos = [];
// Get all todos
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
