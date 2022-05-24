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
}