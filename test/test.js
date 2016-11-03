'use strict';
const fs = require('fs');
const expect = require('expect.js');
const _ = require('lodash');
const log = console.log;
const jlog = function(o){log(JSON.stringify(o, 0, 2))};
const path = require('path');
log('\n\n\n\n');
const Promise = require('bluebird');

let QUESTION_NUMBER = 1;

describe('...', function(){

    it('should run all tests', function(done){

        let files = getFiles(QUESTION_NUMBER);
        while(files.length){
            for(var i = 0, j = files.length; i < j; i++){
                runTest(files[i]);
            }
            QUESTION_NUMBER++;
            files = getFiles(QUESTION_NUMBER);
        }

        done();
    });
});

function castInts(input){
    var output = [];
    input = input.split('\n');
    input.forEach(function(num){
        output.push(parseInt(num, 10));
    });
    return output;
}

function getFiles(questionNumber){
    let files = [];
    let dirpath = path.resolve(__dirname, 'question'+questionNumber);
    if(fs.existsSync(dirpath)){
        files = fs.readdirSync(dirpath);
        files = _.filter(files, function(file){
            return file.substr(0, 5) === 'input';
        });
    }
    return files;
}

function runTest(filename){
    let inputPath = path.resolve(__dirname, 'question'+QUESTION_NUMBER, filename);
    let outputPath = path.resolve(__dirname, 'question'+QUESTION_NUMBER, filename.replace('input', 'output'));

    let input = fs.readFileSync(inputPath).toString();
    let output = fs.readFileSync(outputPath).toString();

    if(global['question'+QUESTION_NUMBER]){
        log('\n             question '+QUESTION_NUMBER + '...');
        let result = global['question'+QUESTION_NUMBER](input);
        expect(result).to.equal(output);
        log('\n                 question '+QUESTION_NUMBER + ' SUCCESS\n');
    }
    else {
        log('\nno such method `question'+QUESTION_NUMBER+'()`\n');
    }

}

//======================================================================================

global.question1 = function(numbers){
    numbers = numbers.split('\n');
    let map = {};
    let duplicates = 0;
    numbers.forEach(function(n){
        map['key'+n] = map['key'+n] || 0;
        map['key'+n]++;
    });
    Object.keys(map).forEach(function(key){
        if(map[key] > 1){
            duplicates++;
        }
    });


    return duplicates.toString();
};


global.question2 = function(input){
    var result = 0;
    input = castInts(input);
    var count = input.shift();
    var k = input.pop();
    var numbers = input.sort();
    // jlog({count: count, numbers: numbers, k: k});

    //Collect unique pairs
    var pairs = [];
    var map = {};
    numbers.forEach(function(n1, i){
        numbers.forEach(function(n2, j){

            var pair = [n1, n2].sort();
            if(n1 <= n2){
                var key = pair.join('_');
                if(!map[key]){
                    map[key] = true;
                    pairs.push(pair);
                }
            }
        });
    });

    //Count 'valid' pairs with a difference of `k`
    pairs.forEach(function(pair){
        if(pair[0] <= pair[1]){
            if((pair[0]+k) === pair[1]){
                result++;
            }
        }
    });

    return result.toString();
};
