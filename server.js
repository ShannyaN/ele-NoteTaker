const express = require('express');
const app = express();
const path=require('path');
const fs = require('fs');

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
    return console.log("success")
})
app.get('/api/notes/:title',(req,res)=>{
    for (let i = 0; i < notes.length; i++) {
        if (req.params.title === notes[i].title){
            res.json(notes[i])
            return console.log("success")
        }else{
            return res.status(404)};
    }
    
})

app.post('/api/notes', (req,res)=> {
    const {title} = req.body;
    const {text} = req.body;
    const newNote = {
        title,
        text,
    }
    // //console.log("request:" + request);
    // const {title} = req.body;
    // console.log("title: " + title)
    // const {text} = req.body;
    // console.log("text: " + text)
    // const newNote ={
    //     title,
    //     text
    // }
    console.log("NN:" + newNote);
    notes.push(newNote);
    console.log(notes)
    //const notesJSON = JSON.stringify(notes, null, 2);
    fs.writeFile('./db/db.json', JSON.stringify(notes), err => {
        if (err) {
          console.error(err);
        }else{
            res.json(notes)
        }
        // file written successfully
      });
})

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));