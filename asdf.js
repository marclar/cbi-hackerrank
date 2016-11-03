'use strict';
if(!require("piping")()){return;}

const EXIT = false;

const _ = require('lodash');
const log = console.log;
log('\n\n\n\n');
const Promise = require('bluebird');


// log('hayyyyyy');


function StairCase(n){
    let orig = n;
    let levels = [];
    while(levels.length < n){
        let spaceCount = orig - levels.length - 1;
        let stepCount = orig - spaceCount;
        let spaces = (new Array(spaceCount + 1)).join(' ');
        let steps = (new Array(stepCount + 1)).join('#');
        levels.push(spaces + steps);
    }
    for(var i = 0, j = levels.length; i < j; i++){
        log(levels[i]);
    }
}

//
// function buildLevel(n){
//     let level = '';
//     for(var i = 0, j = n; i < j; i++){
//         level += ' ';
//     }
//     while(level.length < n){
//         level += '#';
//     }
//     return level;
// }
//


StairCase(6);























log('\n\n\n\n');

if(EXIT){process.exit(0); }