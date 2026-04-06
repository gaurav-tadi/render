const express = require("express");
const app = express();

app.use(express.json());

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons", (req, res) => {
    res.json(persons)
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.post("/api/persons", (req, res) => {
    const content = req.body
    if(!content){
      return res.status(400).end()
    } 
    const person = persons.find(person => person.name === content.name)
    if (person) return res.status(400).json({error: 'name must be unique'})
    const newPerson = {
      id: generateId(),
      name: content.name,
      number: content.number
    }
    persons.push(newPerson)
    return res.json(newPerson)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(person => person.id === id)
  if(!person){ 
    return res.status(404).end()
  }
  return res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.findIndex(person => person.id === id)
  if(!person) return res.status(404).end()
  persons.splice(person, 1)
  res.status(204).end()
})

app.get('/info', (req, res) => {
    let currentTime = new Date
    const total = persons.length
    res.send(`
        <p>Phonebook has info for ${total} people</p>
        <p>${currentTime}</p>
        `)
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
