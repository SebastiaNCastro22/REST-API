const express = require('express');
const app = express();

app.use(express.json());

const studentsUsers = [
    {id: 1, name: 'Sebastian', age: 20, enroll: true},
    {id: 2, name: 'Daniela', age: 20, enroll:false},
    {id: 3, name: 'Monserrad', age: 19, enroll:true},
];

app.get('/',(req,res)=>{
    res.send('Node JS api');
})

app.get('/api/studentsUsers', (req,res)=>{
    res.send(studentsUsers);
})

app.get('/api/studentsUsers/:id', (req,res)=>{
    const studentUser = studentsUsers.find(c => c.id == parseInt(req.params.id));
    if(!studentUser) return res.status(404).send('Estudiante no encontrado');
    else res.send(studentUser);
})

app.post('/api/studentsUsers', (req,res)=>{
    const studentUser = {
        id: studentsUsers.length + 1,
        name: req.body.name,
        age: parseInt(req.body.age),
        enroll: (req.body.enroll === 'true')
    }
    studentsUsers.push(studentUser);
    res.send(studentUser);
})

app.delete('/api/studentsUsers/:id', (req,res)=>{
    const studentUser = studentsUsers.find(c => c.id === parseInt(req.params.id));
    if(!studentUser) return res.status(404).send('Estudienate no encontrado');

    const index = studentsUsers.indexOf(studentUser);
    studentsUsers.splice(index,1);
    res.send(studentUser);

});

const port = process.env.port || 80;
app.listen(port,() => console.log(`Escuchando un puerto ${port}...`))
