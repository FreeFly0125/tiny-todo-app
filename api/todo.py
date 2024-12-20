from data import TODOS
from datetime import datetime


class TodoList:
    def __init__(self):
        self.todoList = [
            {
                "id": todo["id"],
                "text": todo["text"],
                "done": todo["done"] if "done" in todo else False,
                "created": todo["created"] if "created" in todo else datetime.now(),
            }
            for todo in TODOS
        ]

    def getStatus(self):
        total_todos = len(self.todoList)
        done_todos = sum(1 for todo in self.todoList if todo["done"])

        return {
            "total": total_todos,
            "done": done_todos,
            "remaining": total_todos - done_todos,
        }

    def getTodos(self):
        return sorted(self.todoList, key=lambda x: x["created"], reverse=True)

    def createTodo(self, text: str):
        new_todo = dict(
            id=f"todo{len(self.todoList) + 1}",
            text=text,
            done=False,
            created=datetime.now(),
        )
        self.todoList.append(new_todo)
        return new_todo

    def updateTodoStatus(self, todo_id: str):
        for todo in self.todoList:
            if todo["id"] == todo_id:
                todo["done"] = not todo["done"]
                return todo
        return False
