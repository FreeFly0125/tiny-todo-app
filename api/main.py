from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from model import TodoCreate
from todo import TodoList

app = FastAPI()

app.todoManager = TodoList()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/status")
async def status():
    status = app.todoManager.getStatus()
    return {"status": "OK", "info": status}


@app.get("/todos")
async def get_todos():
    return app.todoManager.getTodos()


@app.put("/todos/{todo_id}/done")
async def mark_todo_done(todo_id: str):
    res = app.todoManager.updateTodoStatus(todo_id)
    if not res:
        raise HTTPException(status_code=404, detail="Todo not found")
    return res


@app.post("/todos", status_code=201)
async def create_todo(todo: TodoCreate):
    res = app.todoManager.createTodo(todo.text)
    return res
