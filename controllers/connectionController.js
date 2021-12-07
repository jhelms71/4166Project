const { nextTick } = require('process');
const model = require('../models/connection');
const rsvpModel = require('../models/rsvp');

exports.connections = (req, res, next) => {
    // let connections = model.find();
    // res.render('./connection/connections', {connections});
    model.find()
    .then(connections=> res.render('./connection/connections', {connections}))
    .catch(err=>next(err));
};

exports.newConnection = (req, res) => {
    res.render('./connection/newConnection');
};

exports.create = (req, res, next) => {
    let connection = new model(req.body);//create a new story document
    connection.author = req.session.user;
    console.log(connection.author.firstName);
    connection.save()//insert the document to the database
    .then(connection=> res.redirect('/connections'))
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
            err.status = 400;
        }
        res.redirect('back');
        next(err);
    });
};

exports.show = (req, res, next) => {
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }
    model.findById(id).populate('author', 'firstName lastName')
    .then(connection=>{
        if(connection) {
            return res.render('./connection/connection', {connection});
        } else {
            let err = new Error('Cannot find a connection with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.edit = (req, res, next) => {
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }
    model.findById(id)
    .then(connection=>{
        if(connection) {
            return res.render('./connection/edit', {connection});
        } else {
            let err = new Error('Cannot find a connection with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.update = (req, res, next) => {
    let connection = req.body;
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }

    model.findByIdAndUpdate(id, connection, {useFindAndModify: false, runValidators: true})
    .then(connection=>{
        if(connection) {
            res.redirect('/connections/'+id);
        } else {
            let err = new Error('Cannot find a connection with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=> {
        if(err.name === 'ValidationError')
            err.status = 400;
        next(err);
    });
};

exports.delete = (req, res, next) => {
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }

    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(connection =>{
        if(connection) {
            res.redirect('/connections');
        } else {
            let err = new Error('Cannot find a connection with id ' + id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err));
};

exports.editRsvp = (req, res, next) => {
    console.log(req.body.rsvp);
    let id = req.params.id;
    rsvpModel.findOne({connection:id}).then(rsvp=> {
        if(rsvp){
            //update
            rsvpModel.findByIdAndUpdate(rsvp._id, {rsvp:req.body.rsvp}, {useFindAndModify: false, runValidators: true})
            .then(rsvp=>{
                req.flash('success', 'Successfully updated RSVP');
                res.redirect('/users/profile');
            })
            .catch(err=>{
                if(err.name == 'ValidationError') {
                    req.flash('error', err.message);
                    return res.redirect('/back');
                }
                next(err);
            });
        } else {
            let rsvp = new rsvpModel({
                connection: id,
                rsvp: req.body.rsvp,
                user: req.session.user
            });
            rsvp.save()
            .then(rsvp=>{
                req.flash('success', 'Successfully created RSVP');
                res.redirect('/users/profile');
            })
            .catch(err=>{
                req.flash('error', err.message);
                next(err)
            });
        }
    })
};