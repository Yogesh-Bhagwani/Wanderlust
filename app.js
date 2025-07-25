if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}


const express = require("express");
const app = express();
const mongoose =  require("mongoose");
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpresError.js");
const session = require('express-session');
const flash = require('connect-flash');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require('./models/user.js');



const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLASDB_URL;

main()
    .then((res)=>{
        console.log("connection successful");
    })
    .catch((err) => {
        console.log(err)
    });

async function main() {
  await mongoose.connect(dbUrl);
};


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


const sessionOptions = { 
    secret : "mysupersecretcode",
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() +7*24*60*60*1000,
        maxAge : 7*24*60*60*1000,
        httpOnly : true
    }
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize()); 
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// app.get("/demouser", async(req,res)=>{
//     let fakeUser = new User({
//         email : "student@gmail.com",
//         username : "delta-student"
//     })

//     let registerUser = await User.register(fakeUser,"helloworld"); //register method ye bhi chak ker leta h ki username unique h kya nhi;
//     res.send(registerUser);
// })




app.get("/",(req,res)=>{
    res.redirect("/listings")
}); 


app.use("/listings" ,listingRouter);
app.use("/listings/:id/reviews" ,reviewRouter);
app.use("/", userRouter);



//Reviews 



// app.get("/testListing", async (req,res)=>{
//     let sampleListing = new Listing({
//         title : "My New Villa", 
//         description : "By the beach",
//         price : 1200, 
//         location : "Calangute, Goa",
//         country : "India",
//     });

//     await sampleListing.save();
//     console.log("sample was saved ");
//     res.send("successful testing");
// })

// app.all("*",(req,res,next)=>{ 
//     next(new ExpressError(404 , "Page Not found!"));
// })

app.use((err, req, res, next)=>{
    let {status = 500 , message}= err;
    console.log(err)
    // res.status(status).send(message);
    res.status(status).render("error.ejs", {message});   
})

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
})