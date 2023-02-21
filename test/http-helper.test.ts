const request = require("supertest")
const baseURL = "http://localhost:3000"

describe("GET /todos", () => {
    const newTodo = {
        id: 2,
        item: "Drink water",
        completed: false,
    }
    beforeAll(async () => {
        await request(baseURL).post("/todo").send(newTodo);
    })

    afterAll(async () => {
        await request(baseURL).delete(`/todo/${newTodo.id}`)
    })

    it("should return 200", async () => {
        const response = await request(baseURL).get("/todos");
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe(null);
    });

    it("should return todos", async () => {
        const response = await request(baseURL).get("/todos");
        expect(response.body.data.length >= 1).toBe(true);
    });
});

describe("POST /todo", () => {
    const newTodo = {
        id: 10,
        item: "Drink water",
        completed: false,
    }
    afterAll(async () => {
        await request(baseURL).delete(`/todo/${newTodo.id}`)
    })
    it("should add an item to todos array", async () => {
        const response = await request(baseURL).post("/todo").send(newTodo);
        const lastItem = response.body.data[response.body.data.length - 1];
        expect(response.statusCode).toBe(201);
        expect(lastItem.item).toBe(newTodo["item"]);
        expect(lastItem.completed).toBe(newTodo["completed"]);
    });
});

describe("Update one todo (PUT /todo)", () => {
    const newTodo = {
        id: 1100,
        item: "Habib Mevlüt",
        completed: false,
    }
    beforeAll(async () => {
        await request(baseURL).post("/todo").send(newTodo);
    })
    // afterAll(async () => {
    //     await request(baseURL).delete(`/todo/${newTodo.id}`)
    // })
    it("should update item if it exists", async () => {
        const response = await request(baseURL).put(`/todos/${newTodo.id}`)
            .send({completed: true});
        expect(response.statusCode).toBe(201);
        expect(response.body.data.completed).toBe(true);
    });
});

// describe("Delete one todo", () => {
//     const newTodo = {
//         id: 1100,
//         item: "Habib Mevlüt",
//         completed: false,
//     }
//     beforeAll(async () => {
//         await request(baseURL).post("/todo").send(newTodo);
//     })
//     it("should delete one item", async () => {
//         const response = await request(baseURL).delete(`/todos/2`);
//         const todos = response.body.data
//         const exists = todos.find(todo => {
//             newTodo.id === todo.id
//         })
//         expect(exists).toBe(undefined)
//     });
// });
