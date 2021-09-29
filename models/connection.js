const { DateTime } = require("luxon");
const {v4: uuidv4} = require('uuid');

const connections = [
    {
        id: '1',
        title: '3 on 3 at Freedom Park',
        topic: 'Basketball',
        details: "I have a couple friends that are going to play some basketball at Freedom Park, so we/'re hoping to have a few more people to show up to play a few causal 3 on 3 games.",
        date: 'Friday September 17, 2021',
        startTime: '4:30 PM',
        endTime: '5:30 PM',
        host: 'Jonathan Helms',
        imageURL: 'image'
    },
    {
        id: '2',
        title: 'Horse at UREC',
        topic: 'Basketball',
        details: "I have a couple friends that are going to play some basketball at Freedom Park, so we/'re hoping to have a few more people to show up to play a few causal 3 on 3 games.",
        date: 'Tuesday October 12, 2021',
        startTime: '2:00 PM',
        endTime: '3:45 PM',
        host: 'Taylor James',
        imageURL: 'image'
    },
    {
        id: '3',
        title: 'Reedy Creek Park - 8/29/2021 @ 10:30 A.M.',
        topic: 'Basketball',
        details: "I have a couple friends that are going to play some basketball at Freedom Park, so we/'re hoping to have a few more people to show up to play a few causal 3 on 3 games.",
        date: 'Friday October 11, 2021',
        startTime: '10:30 AM',
        endTime: '12:00 PM',
        host: 'Bob Smith',
        imageURL: 'image'
    },
    {
        id: '4',
        title: 'Penalty Practice at Northeast Rec Field',
        topic: 'Soccer',
        details: "I have a couple friends that are going to play some basketball at Freedom Park, so we/'re hoping to have a few more people to show up to play a few causal 3 on 3 games.",
        date: 'Wednesday October 20, 2021',
        startTime: '4:30 PM',
        endTime: '5:30 PM',
        host: 'Jonathan Helms',
        imageURL: 'image'
    },
    {
        id: '5',
        title: '8 on 8 at Franklise Park',
        topic: 'Soccer',
        details: "I have a couple friends that are going to play some basketball at Freedom Park, so we/'re hoping to have a few more people to show up to play a few causal 3 on 3 games.",
        date: 'Saturday October 9, 2021',
        startTime: '2:00 PM',
        endTime: '3:45 PM',
        host: 'Taylor James',
        imageURL: 'image'
    },
    {
        id: '6',
        title: '11 on 11 at Kirk Farm Fields',
        topic: 'Soccer',
        details: "I have a couple friends that are going to play some basketball at Freedom Park, so we/'re hoping to have a few more people to show up to play a few causal 3 on 3 games.",
        date: 'Saturday October 16, 2021',
        startTime: '10:30 AM',
        endTime: '12:00 PM',
        host: 'Bob Smith',
        imageURL: 'image'
    }
];

// returns all the connections
exports.find = () => connections;

// reutnrs a specific connection by id
exports.findById = id => connections.find(connection=> connection.id === id);

// saves a new connection
exports.save = function(connection) {
    connection.id = uuidv4();
    connections.push(connection);
};

// updates a connection by id
exports.updateById = function(id, newConnection) {
    let connection = connections.find(connection=>connection.id === id);
    if(connection) {
        connection.title = newConnection.title;
        connection.details = newConnection.details;
        return true;
    } else {
        return false;
    }
};

// deletes a connections by id
exports.deleteById = function(id) {
    let index = connections.findIndex(connection => connection.id===id);
    if(index !== -1) {
        connections.splice(index, 1);
        return true;
    } else {
        return false;
    }
};