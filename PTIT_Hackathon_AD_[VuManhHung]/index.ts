interface ITodoList {
    id: number;
    name: string;
    completed: boolean;
}

class TodoList implements ITodoList {
    id: number;
    name: string;
    completed: boolean;

    constructor(name: string) {
        this.id = Math.floor(Math.random() * 10000) + 10000;
        this.name = name;
        this.completed = false;
    }

    renderJob(element: HTMLElement) {
        const jobItem = document.createElement("li");
        jobItem.id = `job-${this.id}`;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = this.completed;
        checkbox.addEventListener("change", (event) => {
            const isChecked = event.target.checked;
            if (isChecked) {
                jobName.style.textDecoration = 'line-through';
            } else {
                jobName.style.textDecoration = 'none';
            }
            this.updateJob(isChecked);
            TodoList.saveToLocalStorage(todoList);
        });

        const editButton = document.createElement("button");
        editButton.textContent = "Sửa";
        editButton.classList.add("edit-button");

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Xoá";
        deleteButton.classList.add("delete-button");

        const jobName = document.createElement("span");
        jobName.textContent = this.name;

        jobItem.appendChild(checkbox);
        jobItem.appendChild(jobName);
        jobItem.appendChild(editButton);
        jobItem.appendChild(deleteButton);

        element.appendChild(jobItem);

        editButton.addEventListener("click", () => {
            // Thêm logic xử lý sự kiện khi nhấn nút "Sửa" nếu cần
        });

        deleteButton.addEventListener("click", () => {
Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
    const index = todoList.findIndex((job) => job.id === this.id);
    if (index !== -1) {
        todoList.splice(index, 1);
        jobItem.remove();
        TodoList.saveToLocalStorage(todoList);
    }
  }
});
          
        });
    }

    static createJob(name: string): TodoList {
        return new TodoList(name);
    }

    updateJob(completed: boolean) {
        this.completed = completed;
    }

    deleteJob() {
        // Thêm logic xử lý xóa công việc nếu cần
    }

    static saveToLocalStorage(todoList: TodoList[]) {
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }

    static loadFromLocalStorage(): TodoList[] {
        const storedList = localStorage.getItem("todoList");
        return storedList ? JSON.parse(storedList) : [];
    }
}

const todoInput = document.getElementById("new-todo-input") as HTMLInputElement;
const addTodoButton = document.getElementById("add-todo-button")!;
const todoListElement = document.getElementById("todo-list")!;
let todoList: TodoList[] = TodoList.loadFromLocalStorage();

todoList.forEach((job) => {
    const todoItem = new TodoList(job.name);
    todoItem.renderJob(todoListElement);
});

addTodoButton.addEventListener("click", () => {
    const newTodoText = todoInput.value.trim();
    if (newTodoText) {
        const newJob = TodoList.createJob(newTodoText);
        todoList.push(newJob);
        newJob.renderJob(todoListElement);
        TodoList.saveToLocalStorage(todoList);
        todoInput.value = "";
    }
});
