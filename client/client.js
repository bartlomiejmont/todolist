const todoList = document.getElementById('todoList');

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
    loadTodos()
}

// to samo co funkcja z lini 22
function resToJson(response){
    return response.json();
}

function loadTodos() {
    fetch('http://localhost:3000/getTodos')
    .then(response => response.json())
    // .then(resToJson)
    .then(renderTodos)
}

const renderTodos = (todos) => {
    todoList.innerHTML = '';
    todos.forEach(t => {
        todoList.innerHTML += `<li> ${t.description} </li>`
    })
}




loadTodos();