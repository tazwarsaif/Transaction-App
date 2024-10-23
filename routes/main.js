const express = require('express');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const moment = require('moment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const router = express.Router();

const authMiddleware = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        res.redirect("/")
    }
    try{
        const decoded = jwt.verify(token,jwtSecret);
        req.userId = decoded.userId;
        console.log("Secured...")
        next();
    }catch(error){
        res.redirect('/');
    }
}

const weekcheck = (inpdate) =>{
        // Create the input date
    const inputDate = moment(inpdate); // Example input date

    // Get the current date
    const now = moment();

    // Compare ISO weeks
    if (now.isoWeek() === inputDate.isoWeek() && now.year() === inputDate.year()) {
        return true;
    } else {
        return false;
    }

}

const yearCheck = (inpdate) =>{
    const currdate = new Date();
    return currdate.getFullYear() == inpdate.getFullYear();
}

router.get('/',(req,res,next)=>{
    const token = req.cookies.token;
    if(req.query){
        const flaw = req.query.flaw;
        return res.render("login",{flaw});
    }
    if(!token){
        return res.render("login")
    }
    try{
        const decoded = jwt.verify(token,jwtSecret);
        req.userId = decoded.userId;
        return res.redirect('/dashboard')
    }catch(error){
        return res.render('login');
    }
})

router.post('/login',async (req,res,next)=>{
    const {username, password} = req.body;
    console.log(username,password);
    const user = await User.findOne({ username:username });
    if(!user){
        console.log('Username does not exist');
        return res.redirect("/?flaw=invalid_credential");
    }
    const verified = await bcrypt.compare(password,user.password);
    if(!verified){
        console.log("password is wrong")
        return res.redirect('/?flaw=invalid_credential');
    }
    console.log("Log in successful");
    const token = jwt.sign({userId: user._id},jwtSecret);
    res.cookie('token',token,{httpOnly:true});
    res.redirect('/dashboard')
})

router.post('/register',async (req,res,next)=>{
    const {username, password} = req.body;
    const hashedpass = await bcrypt.hash(password,10);
    const result = await User.findOne({username: username});
    console.log(result);
    if(result){
        return res.redirect('register?flaw=username_already_exists')
    }else{
        console.log(false);
    }
    const user = await User.create({username:username,password:hashedpass});
    res.redirect('/');
})

router.get('/register',(req,res,next)=>{
    if(req.query){
        const flaw = req.query.flaw;
        console.log(flaw);
        return res.render('register',{flaw});
    }
    res.render('register');
})

router.get("/dashboard",authMiddleware,async (req,res,next)=>{
    const token = req.cookies.token;
    const decoded = jwt.verify(token,jwtSecret)
    const user = await User.findOne({_id:decoded.userId});
    const transactions = await Transaction.find({userId:decoded.userId});
    res.render('dashboard',{transactions,weekcheck,yearCheck});
})

router.post("/tsave",authMiddleware,async (req,res,next)=>{
    const {title,type,description,amount,date} = req.body;
    const result = await Transaction.create({
        userId: req.userId,
        title:title,
        type: type,
        description: description,
        amount: amount,
        date: date,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    res.redirect("/dashboard");
})

router.get("/delete",async (req,res,next)=>{
    const tid = req.query.tid;
    result = await Transaction.deleteOne({_id:tid})
    res.redirect("dashboard");
})

router.post('/logout',(req,res,next)=>{
    res.clearCookie('token');
    res.redirect('/');
})

module.exports = router;