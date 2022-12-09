"use strict";
exports.__esModule = true;
var redis_1 = require("redis");
var client = (0, redis_1.createClient)();
client.on('error', function (err) { return console.log('Redis Client Error', err); });
await client.connect();
client.on('connect', function () {
    console.log('Connected!');
    client.get('_cursor', function (err, reply) {
        console.log(reply); // ReactJS
    });
});
