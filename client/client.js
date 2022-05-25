const todoList = document.getElementById('todoList');

// dodaje todosa również do lokalnego stanu []
function addTodo() {
    const todoDescription = document.getElementById('todoInput');
    const description = todoDescription.value;

    fetch('http://localhost:3000/createTodo', {
        body: JSON.stringify({ description, done: false }),
        method: "post",
        headers: {
			"Content-Type": "application/json",
		},
    })
    .then(response => response.json())
    setTimeout(loadTodos, 100)
}

// to samo co funkcja z lini 25
function resToJson(response){
    return response.json();
}

// aktualizuje loklany stan []
function loadTodos() {
    fetch('http://localhost:3000/getTodos')
    .then(response => response.json())
    // .then(resToJson)
    .then(renderTodos)
}

const renderTodos = (todos) => {
    todoList.innerHTML = '';
    todos.forEach(t => {
        todoList.innerHTML += `<li id="t${t.id}" class="todo_item"> ${t.description} </li>`

        const listItem = document.getElementById(`t${t.id}`)

        listItem.addEventListener("click", () => {
            fetch(`http://localhost:3000/completeTodo/${t.id}`, { method: "patch" })
            .then(response => response.json())
        })
    })
}


loadTodos();