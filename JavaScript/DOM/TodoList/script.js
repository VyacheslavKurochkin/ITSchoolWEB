document.addEventListener("DOMContentLoaded", function () {
    const addTodoForm = document.querySelector(".add-todo-form");
    const todoList = document.querySelector(".todo-list");
    const newTodoTextField = document.querySelector(".new-todo-input");

    addTodoForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let newTodoText = newTodoTextField.value.trim();
        newTodoTextField.classList.remove("invalid");

        if (newTodoText.length === 0) {
            newTodoTextField.classList.add("invalid");

            return;
        }

        const newTodo = document.createElement("li");
        newTodo.classList.add("todo-item");

        function setViewMode() {
            newTodo.innerHTML = `<div class="todo-item-text"></div>
                                 <div class="todo-item-controls">
                                        <button class="delete-button" type="button">Удалить</button>
                                        <button class="edit-button" type="button">Редактировать</button>
                                 </div>`;

            newTodo.querySelector(".todo-item-text").textContent = newTodoText;

            newTodo.querySelector(".delete-button").addEventListener("click", function () {
                newTodo.remove();
            });

            newTodo.querySelector(".edit-button").addEventListener("click", function () {
                newTodo.innerHTML = `<div class="edit-todo-item-text">
                                        <input type="text" class="edit-todo-item-text-field">
                                        <div class="error-message">Необходимо указать текст</div>
                                    </div>
                                    <div class="todo-item-controls">
                                        <button class="cancel-button" type="button">Отменить</button>
                                        <button class="save-button" type="button">Сохранить</button>
                                    </div>`;

                const editTodoItemTextField = newTodo.querySelector(".edit-todo-item-text-field");
                editTodoItemTextField.value = newTodoText;

                editTodoItemTextField.addEventListener("keydown", function () {
                    editTodoItemTextField.classList.remove("invalid");
                });

                newTodo.querySelector(".cancel-button").addEventListener("click", function () {
                    setViewMode();
                });

                newTodo.querySelector(".save-button").addEventListener("click", function () {
                    editTodoItemTextField.classList.remove("invalid");
                    const changedTodoText = editTodoItemTextField.value.trim();

                    if (changedTodoText.length === 0) {
                        editTodoItemTextField.classList.add("invalid");
                        return;
                    }

                    newTodoText = changedTodoText;
                    setViewMode();
                });
            });
        }

        setViewMode();

        todoList.append(newTodo);

        newTodoTextField.value = "";
    });
});