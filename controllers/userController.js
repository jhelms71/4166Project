const User = require('../models/user');
const Connection = require('../models/connection');
const rsvpModel = require('../models/rsvp');

exports.signUp = (req, res)=> {
    res.render('./user/new');
};

exports.createUser = (req, res, next)=>{
    let user = new User(req.body);
    user.save()
    .then(()=> res.redirect('/users/login'))
    .catch(err=>{
        if(err.name === 'ValidationError'){
            req.flash('error', err.message);
            return res.redirect('/users/new');
        }
        if(err.code === 11000) {
            req.flash('error', 'Email addres has been used');
            return res.redirect('/users/new');
        }
        next(err)
    });
};

exports.login = (req, res)=> {
    res.render('./user/login');
};

exports.getUser = (req, res, next)=>{
    //authenticate user's login request
    let email = req.body.email;
    let password = req.body.password;

    //get the user that matches the email
    User.findOne({email: email})
    .then(user=> {
        if(user) {
            //user found in the database
            user.comparePassword(password)
            .then(result=>{
                if(result){
                    req.session.user = user._id; //store user's id in the session
                    req.session.userName = user.firstName + ' ' + user.lastName;
                    req.flash('success', 'You have successfully logged in');
                    res.redirect('/users/profile');
                } else {
                    // console.log('wrong password');
                    req.flash('error', 'Wrong password!');
                    res.redirect('/users/login');
                }
            });
        } else {
            // console.log('wrong email address');
            req.flash('error', 'Wrong email address');
            res.redirect('/users/login');
        }
    })
    .catch(err=>next(err));
};

exports.profile = (req, res, next)=>{
    let id = req.session.user;
    Promise.all([User.findById(id), Connection.find({author: id}), rsvpModel.find({user:id}).populate('connection', 'title')])
    .then(results=>{
        const [user, connections, rsvps] = results;
        res.render('./user/profile', {user, connections, rsvps});
    })
    .catch(err=>next(err));
};

exports.logout = (req, res, next)=> {
    req.session.destroy(err=>{
        if(err){
            return next(err);
        } else {
            res.redirect('/');
        }
    });
};