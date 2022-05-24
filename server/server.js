const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({
    extended: true
}))

//                    |
// Tu będą endpointy \/
//
const todos = [
    { id: 1, description: 'napisz maila', done: false },
    { id: 2, description: 'zmyj naczynia', done: false }
];
//
app.get('/getTodos', (req, res) => {
    res.send(todos);
})

app.get('/getTodo/:id', (req, res) => {
    const id = req.params.id;
    res.send(todos.find( t => t.id == id) || {})
})

app.post('/createTodo', (req, res) => {
    const todo = {
        // przypisujemy id o 1 większy od ostatniego
        id: todos[todos.length - 1].id + 1,
        description: req.body.description,
        done: req.body.done
    }
    todos.push(todo);
    res.send(todo);
})


//

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})