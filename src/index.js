const express = require('express');
const app = express();
const port = 3000;


let users = {}
let currentId = 0;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/users', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    
    if (typeof name === 'undefined' || typeof email === 'undefined') 
    {
        res.sendStatus(404);
        return;
    } 
    
    //skip if current id used
    while(currentId in users)
        currentId++
    
    users[currentId] = {"name": name, "email": email}
    res.status(201).json({"id": currentId, "name": name, "email": email});

    currentId++
    
});

app.get('/users/:id', (req, res) => {
    const id = Number.parseInt(req.params.id);
    
    if (typeof id === 'undefined' || !Number.isInteger(id) || !(id in users))
    {
        res.sendStatus(404);
        return
    }
    
    const user = users[id]
    res.json({"id": id, "name": user.name, "email": user.email});
    
});

app.put('/users/:id', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const id = Number.parseInt(req.params.id);
    
    if (typeof name === 'undefined' || typeof email === 'undefined' || typeof id === 'undefined' || !Number.isInteger(id)) 
    {
        res.sendStatus(404);
        return;
    } 
    
    users[id] = {"name": name, "email": email}
    res.json({"id": id, "name": name, "email": email});
    
});

app.delete('/users/:id', (req, res) => {
    const id = Number.parseInt(req.params.id);
    
    if (typeof id === 'undefined' || !Number.isInteger(id) || !(id in users))
    {
        res.sendStatus(404);
        return
    }
    
    delete users[id]
    res.sendStatus(204);
    
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing