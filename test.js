// alert("raam aam khaata hai")
document.querySelector("input.check").addEventListener("click",(Event)=>
{
    const text = document.querySelector("p");
    console.log(Event.target);
    if ((Event.target).checked == true) {
        text.style.textDecoration = "line-through";
    }
    else{
        text.style.textDecoration = "none";
    }
});
