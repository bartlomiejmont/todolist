const todoList = document.getElementById('todoList');
const todoInput = document.getElementById('todoInput')

todoInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addTodo();
    }
});

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
    rerender();
}

function rerender() {
    setTimeout(loadTodos, 100)
}

// to samo co funkcja z lini 25
function resToJson(response) {
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
        todoList.innerHTML += `<li id="t${t.id}"> ${t.description} </li>`

        const listItem = document.getElementById(`t${t.id}`)

        listItem.classList.add('todo_item')

        if (t.done) {
            listItem.classList.add('todo_item_done')
        }
        // t.done ? listItem.classList.add('todo_item_done'):
        // t.done && listItem.classList.add('todo_item_done');
    })

    document.querySelectorAll('.todo_item').forEach(item => {
        item.addEventListener('click', event => {
            const url = `http://localhost:3000/completeTodo/${item.id.slice(1)}`;
            fetch(url, { method: "post" })
                .then(response => response.json())
            rerender();
        })
    })

}


loadTodos();