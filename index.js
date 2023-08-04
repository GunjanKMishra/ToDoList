import bodyParser from "body-parser";
import expres from "express";

const app = expres();
const port = 3000;

app.use(expres.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

var day = new Date().getDay();
var month = new Date().getMonth();
var date = new Date().getDate();
var year = new Date().getFullYear();
var taskToday= [];
var taskWork= [];

var dayA =['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var monthA =['January','February','March','April','May','June','July','August','September','October','November','December'];

app.get("/",(req,res)=>{
    res.render("./index.ejs",{
        day:dayA[day],
        month:monthA[month],
        date: date,
        year: year,
        task: taskToday,
        });
});

app.get("/work",(req,res)=>{
    res.render("./work.ejs",{task: taskWork,});
});

app.post("/",(req,res)=>{
    taskToday.push(req.body['taskItem']);
    res.render("index.ejs",{
        day:dayA[day],
        month:monthA[month],
        date: date,
        year: year,
        task: taskToday,
        });
});

app.post("/work",(req,res)=>{
    taskWork.push(req.body['taskItem']);
    res.render("work.ejs",{
        task: taskWork,
        });
});


app.listen(port,()=>{console.log(`server has been sarted at port ${port}.`);});