import bodyParser from "body-parser";
import expres from "express";

const app = expres();
const port = 3000;

app.use(expres.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

const day = new Date().getDay();
const month = new Date().getMonth();
const date = new Date().getDate();
const year = new Date().getFullYear();

const tasks = {
    today: [],
    work: []
  };

const dayA =['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const monthA =['January','February','March','April','May','June','July','August','September','October','November','December'];

app.get("/",(req,res)=>{
    res.render("./index.ejs",{
        day:dayA[day],
        month:monthA[month],
        date: date,
        year: year,
        task: tasks.today,
        });
});

app.get("/work",(req,res)=>{
    res.render("./work.ejs",{task: tasks.work,});
});

app.post("/",(req,res)=>{
    tasks.today.push(req.body['taskItem']);
    res.render("./index.ejs",{
        day:dayA[day],
        month:monthA[month],
        date: date,
        year: year,
        task: tasks.today,
        });
});

app.post("/work",(req,res)=>{
    tasks.work.push(req.body['taskItem']);
    res.render("./work.ejs",{
        task: tasks.work,
        });
});


app.listen(port,()=>{console.log(`server has been sarted at port ${port}!`);});