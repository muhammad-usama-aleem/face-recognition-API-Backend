const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors())
const database = {
    users:[
        {
            id: '123',
            name: 'John',
            password: 'cookies',
            email: 'john@gmail.com',
            entries: '0',
            joined: new Date()
        },
        {
            id: '124',
            name: 'amily',
            password: 'garden',
            email: 'amily@gmail.com',
            entries: '0',
            joined: new Date()
        }
    ],
    login:[
        {
            id: "987",
            hash: "",
            email: 'john@gmail.com'
        }
    ]
}

app.get('/', (req, res)=>{
    res.send(database.users);
})

app.post('/signin', (req, res) =>{
    console.log(req.body.email);
    if(req.body.email === database.users[0].email  && req.body.password === database.users[0].password){
        res.json(database.users[0]);
    }else{
        res.status(400).json('error');
    }
})

app.post('/register', (req, res) =>{
    const { name, password, email} = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: '0',
        joined: new Date()
    })
    res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res)=>{
    const {id} = req.params;
    let found = false;
    database.users.forEach(user =>{
        if(user.id === id){
            found = true
            return res.json(user);
        }
    })
    if (!found){
        res.status(404).json('not found');
    }
})

app.put('/image', (req, res) =>{
    const {id} = req.body;
    let found = false;
    database.users.forEach(user =>{
        if(user.id === id){
            found = true
            user.entries++
            return res.json(user.entries);
        }
    })
    if (!found){
        res.status(404).json('not found');
    }
})

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3001, () =>{
    console.log('i am 3001');
})