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
        imageURL: 'image1'
    },
    {
        id: '2',
        title: 'Horse at UREC',
        topic: 'Basketball',
        details: "Who is down to play a few games of Horse at UREC? Looking for at least 5 people to join me.",
        date: 'Tuesday October 12, 2021',
        startTime: '2:00 PM',
        endTime: '3:45 PM',
        host: 'Taylor James',
        imageURL: 'image2'
    },
    {
        id: '3',
        title: 'Reedy Creek Park - 8/29/2021 @ 10:30 A.M.',
        topic: 'Basketball',
        details: "Playing full court at Reedy Creek with my league, so if anyone wants to hoop in come on over!",
        date: 'Friday October 11, 2021',
        startTime: '10:30 AM',
        endTime: '12:00 PM',
        host: 'Bob Smith',
        imageURL: 'image3'
    },
    {
        id: '4',
        title: 'Penalty Practice at Northeast Rec Field',
        topic: 'Soccer',
        details: "Looking for some people (goalies especially would be great) so we can practice some penalty kicks.",
        date: 'Wednesday October 20, 2021',
        startTime: '4:30 PM',
        endTime: '5:30 PM',
        host: 'Jonathan Helms',
        imageURL: 'image4'
    },
    {
        id: '5',
        title: '8 on 8 at Franklise Park',
        topic: 'Soccer',
        details: "Heading to Franklise Park to play some causal matches, so beginners are welcome to join.",
        date: 'Saturday October 9, 2021',
        startTime: '2:00 PM',
        endTime: '3:45 PM',
        host: 'Taylor James',
        imageURL: 'image5'
    },
    {
        id: '6',
        title: '11 on 11 at Kirk Farm Fields',
        topic: 'Soccer',
        details: "I have 11 friends playing so we are hoping to get another team to play a match against.",
        date: 'Saturday October 16, 2021',
        startTime: '10:30 AM',
        endTime: '12:00 PM',
        host: 'Bob Smith',
        imageURL: 'image6'
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