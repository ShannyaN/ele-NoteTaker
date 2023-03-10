const express = require('express');
const app = express();
const path=require('path');

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
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));