import express from 'express';

const app = express();
const tasks = [];

app.use(express.json())

app.get('/', (req, res) => {
  res.send("Hello world!!!!");
});

app.get('/tasks', (req, res) => {
  res.send(JSON.stringify(tasks)).status(200);
});

app.post('/tasks', (req, res) => {
  const body = req.body;
  tasks.push(body);
  res.send("Task created").status(201);
});

app.put('/tasks/:id', (req, res) => {
  const body = req.body;
  const id = req.params.id;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i]?.id == id) {
      tasks[i] = body;
    }
  }
  res.send("Task updated").status(200);
});

app.delete('/tasks/:id', (req, res) => {
  const id = req.params.id;
  let index = null;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i]?.id == id) {
      index = i;
      break;
    }
  }
  if (index != null) {
    tasks.splice(index, 1);
  }
  res.send("Task deleted").status(200);
});

const port = parseInt(process.env.PORT || '3000');

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
