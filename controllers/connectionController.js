const { nextTick } = require('process');
const model = require('../models/connection');

exports.connections = (req, res) => {
    let connections = model.find();
    res.render('./connection/connections', {connections});
};

exports.newConnection = (req, res) => {
    res.render('./connection/newConnection');
};

exports.create = (req, res) => {
    // res.send('Created a new connection');
    let connection = req.body;
    model.save(connection);
    res.redirect('/connections');
};

exports.show = (req, res, next) => {
    let id = req.params.id;
    let connection = model.findById(id);
    if(connection) {
        res.render('./connection/show', {story});
    }  else {
        let err = new Error('Cannot find a connection with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.edit = (req, res, next) => {
    let id = req.params.id;
    let connection = model.findById(id);
    if(connection){
        res.render('./connection/edit', {story});
    } else {
        let err = new Error('Cannot find a connection with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.update = (req, res, next) => {
    let connection = req.body;
    let id = req.params.id;

    if (model.updateById(id, connection)) {
        res.redirect('/connections/' + id);
    } else {
        let err = new Error('Cannot find a connection with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    if(model.deleteById(id)) {
        res.redirect('/stories');
    } else {
        let err = new Error('Cannot find a connection with id ' + id);
        err.status = 404;
        next(err);
    }
};