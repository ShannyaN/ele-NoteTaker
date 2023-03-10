const express = require('express');
const app = express();
const path=require('path');

//DATA
const notes = require('./db/db.json')

const PORT = process.env.PORT || 3001;
//Middleware
//app.use(express.json());
//app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public/index.html'));
})

app.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public/notes.html'));
})

app.get('/api/notes',(req,res)=>{
    res.json(notes)
})
app.get('/api/notes/:title',(req,res)=>{
    for (let i = 0; i < notes.length; i++) {
        if (req.params.title=== notes[i].title){
            return res.json(notes[i])
        };
        
    }
})
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));