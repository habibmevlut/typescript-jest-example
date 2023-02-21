"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
var todos = [];
// Get all todos
exports.app.get("/todos", function (req, res) {
    return res.status(200).json({
        data: todos,
        error: null,
    });
});
exports.app.post("/todo", function (req, res) {
    try {
        var _a = req.body, id = _a.id, item = _a.item, completed = _a.completed;
        var newTodo = {
            id: id,
            item: item,
            completed: completed,
        };
        todos.push(newTodo);
        return res.status(201).json({
            data: todos,
            error: null,
        });
    }
    catch (error) {
        return res.status(500).json({
            data: null,
            error: error,
        });
    }
});
