const express = require('express');
const app = express();
const path=require('path');
const fs = require('fs');
const {v4: uuidv4} = require('uuid');

//DATA
const notes = require('./db/db.json')

const PORT = process.env.PORT || 3001;
//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public/index.html'));
    return console.log("success");
})

app.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public/notes.html'));
    return console.log("success");
})

app.get('/api/notes',(req,res)=>{
    res.json(notes);
    return console.log("success");
})

app.get('/api/notes/:id',(req,res)=>{
    for (let i = 0; i < notes.length; i++) {
        if (req.params.id === notes[i].id){
            res.json(notes[i]);
            console.log(notes[i]);
            return console.log("success");
        }else{
            return res.status(404)};
    }
    
})

app.post('/api/notes', (req,res)=> {
    const {title} = req.body;
    const {text} = req.body;
    const newNote = {
        id: uuidv4(),
        title,
        text,
    };
    notes.push(newNote);
    console.log(notes)
    fs.writeFile('./db/db.json', JSON.stringify(notes), err => {
        if (err) {
          console.error(err);
        }else{
            res.json(notes);
        }
      });
})

app.delete('/api/notes/:id',(req,res)=>{
    for (let i = 0; i < notes.length; i++) {
        if (req.params.id === notes[i].id){
            notes.splice(i,1);
            console.log("Successful deletion");
            fs.writeFile('./db/db.json', JSON.stringify(notes), err => {
                if (err) {
                  console.error(err);
                }else{
                    res.json(notes);
                }
              });
           // return res.json(notes[i])
        //}else{
           // return res.status(404)};
    }}
    
})

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));