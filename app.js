const  bodyparser = require("body-parser"),
        methodOverride = require("method-override"),
        mongoose = require("mongoose"),
        express = require("express"),      
        app = express(); 

mongoose.connect("mongodb://localhost:27017/crash_app", {useNewUrlParser: true});
app.set("view engine", "ejs")
app.use(express.static("public")); 
// bodyperser get d info from d form (skycolor) here for example
app.use(bodyparser.urlencoded({extended: true}))
app.use(methodOverride("_method")); 


let todoSchema = new mongoose.Schema({
   list: "String"
}); 
let Todo = mongoose.model("Todo", todoSchema);

// Todo.create({
//     list: "buy tea"
// }, function(err, todo){
//     if(err){
//         console.log("error");
//     } else{
//         console.log(todo)
//     }
//     }); 


// new
app.get("/", function(req, res){
    res.redirect("list");
}); 

// Index
app.get("/list", function(req, res){
    Todo.find({}, function(err, todoski){
        if (err){
            console.log(err)
        } else{
            res.render("index", {todos: todoski});
        }
    })
    
});
// create
app.post("/list", function(req, res){
    // bodyperser get d info from d form
    Todo.create(req.body, function(err, newTodo){
        console.log(req.body)
        console.log(newTodo)
        if(err){
            res.render("index");
        } else{
            res.redirect("/list"); 
        }
         
    });

    // Delete
app.delete("/list/:id/", function(req, res){
    Todo.findByIdAndRemove(req.params.id, function(err){
            console.log(req.params.id);
            if(err){
                res.redirect("/")
                console.log("error!")
            } else{
                res.redirect("/list"); 
            }
        })
    });

app.get("*", function(req, res){
    res.send("Page not exist!!!")
})

    // const correct = req.body.todo
    // if(correct.toLowerCase() == "blue"){
    //     res.render("show");
    // } else{
    //     res.render("edit")
    // }
        // res.send(`
        // <p>congratulations!!!" </P>
        // <a href="/">Back to homepage</a>
        // `)
    // } else {
    //     res.send(`
    //     <p>Sorry!" </P>
    //     <a href="/">Back to homepage</a> 
    //     `)
    // }
})

app.listen(1010, function(){
    console.log("served!!!!!!")
})