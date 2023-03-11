//DEPENDENCIES
const express = require('express');
const app = express();
const path=require('path');
const fs = require('fs');
const {v4: uuidv4} = require('uuid');

//DATA
const notes = require('./db/db.json')
const PORT = process.env.PORT || 3001;

//MIDDLEWARE  
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));

//SENDING TO HTML PAGES
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public/index.html'));
    return console.log("success");
})

app.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public/notes.html'));
    return console.log("success");
})

//GET ALL
app.get('/api/notes',(req,res)=>{
    res.json(notes);
    return console.log("success");
})
//GET SINGLE
app.get('/api/notes/:id', (req, res) => {
    let note;
    for (let i = 0; i < notes.length; i++) { 
        if (req.params.id === notes[i].id) {//FINDING NOTE WITH MATCHING ID IN ARRAY
            note = notes[i];
            res.json(note);
            return console.log("success");
        
    }
     
}});
//POST NOTE
app.post('/api/notes', (req,res)=> {
    const {title} = req.body;
    const {text} = req.body;
    //STRUCTURE OF OBJECT TO BE ADDED TO NOTES
    const newNote = {
        id: uuidv4(), //ID PICKED AT RANDOM
        title,
        text,
    };
    notes.push(newNote); //ADDED TO ARRAY
    console.log(notes)
    fs.writeFile('./db/db.json', JSON.stringify(notes), err => { //UPDATE DATABASE FILE
        if (err) {
          console.error(err);
        }else{
            res.json(notes);
        }
      });
})
//DELETE NOTE
app.delete('/api/notes/:id',(req,res)=>{
    for (let i = 0; i < notes.length; i++) { //LOOKING FOR NOTE ID SELECTED WITHIN EXISTING NOTES ARRAY
        if (req.params.id === notes[i].id){ //WHEN FOUND
            notes.splice(i,1); //REMOVE FROM ARRAY
            console.log("Successful deletion");
            res.status(200);
            fs.writeFile('./db/db.json', JSON.stringify(notes), err => { //UPDATE DATABASE FILE
                if (err) {
                  console.error(err);
                }else{
                    res.json(notes);
                }
                return
              });
            } 
    }
    
})

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));