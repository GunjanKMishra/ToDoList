import bodyParser from "body-parser";
import expres from "express";
import 'dotenv/config';
import session from "express-session";

const app = expres();
const port = 3000;

app.use(expres.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
  secret: process.env.secret_key,
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));

const day = new Date().getDay();
const month = new Date().getMonth();
const date = new Date().getDate();
const year = new Date().getFullYear();

const dayA =['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const monthA =['January','February','March','April','May','June','July','August','September','October','November','December'];

app.get("/",(req,res)=>{
    req.session.tasksToday = [];
    res.render("./index.ejs",{
        day:dayA[day],
        month:monthA[month],
        date: date,
        year: year,
        task: req.tasksToday,
        });
});

app.get("/work",(req,res)=>{
    req.session.tasksWork = [];
    res.render("./work.ejs",{task: tasksWork,});
});

app.post("/",(req,res)=>{
    try {
    req.session.tasksToday.push(req.body['taskItem']);
    res.render("./index.ejs",{
        day:dayA[day],
        month:monthA[month],
        date: date,
        year: year,
        task: req.session.tasksToday,
        });        
    } catch (error) {
      res.redirect("/");
    }

});

app.post("/work",(req,res)=>{
    try {
    req.session.tasksWork.push(req.body['taskItem']);
    res.render("./work.ejs",{
        task: req.session.tasksWork,
        });        
    } catch (error) {
        res.redirect("/work");
    }

});


app.listen(port,()=>{console.log(`server has been sarted at port ${port}!`);});