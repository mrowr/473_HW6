//https://gist.github.com/ProfAvery/c5db1692c457c526601c#file-config-js
// Server-side code
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, strict: true, undef: true, unused: true */

"use strict";

var http = require("http"),
    express = require("express"),
    app = express(),
    serverResponse,
    score = {
        player: "",
        server: "",
        outcome: null,
        wins: 0,
        losses: 0,
        ties: 0
    },
    moves = ["rock", "paper", "scissors", "spock", "lizard"];

// configure the app to use the client directory for static files
app.use(express.static(__dirname + "/client"));

//http://blog.tompawlak.org/how-to-generate-random-values-nodejs-javascript
function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

function lose() { score.losses++; score.outcome = "lose"; }
function win() { score.wins++; score.outcome = "win"; }

function gameLogic(res, playerChoice) {
    serverResponse = moves[randomIntInc(0,4)];

    score.player = playerChoice;
    score.server = serverResponse;

    if (serverResponse === playerChoice) {
        score.ties++;
        score.outcome = "tie";
    } else { 
        switch(playerChoice) {
            case "rock":
                switch (serverResponse) {
                    case "paper" : case "spock" : lose(); break;
                    case "scissors" : case "lizard" : win(); break;
                }
            break;
            case "paper":
                switch (serverResponse) {
                    case "scissors" : case "lizard" : lose(); break;
                    case "rock" : case "spock" : win(); break;
                }
            break;
            case "scissors":
                switch (serverResponse) {
                    case "rock" : case "spock" : lose(); break;
                    case "paper" : case "lizard" : win(); break;
                }
            break;
            case "spock":
                switch (serverResponse) {
                    case "paper" : case "lizard" : lose(); break;
                    case "rock" : case "scissors" : win(); break;
                }
            break;
            case "lizard":
                switch (serverResponse) {
                    case "rock" : case "scissors" : lose(); break;
                    case "paper" : case "spock" : win(); break;
                }
            break;
        }
    }
}


//create the Express-powered HTTP server and have it listen
http.createServer(app).listen(3000);

// set up routes
app.get("/play/rock", function (req, res) {
    gameLogic("rock");
    res.json(score);
});

app.get("/play/paper", function (req, res) {
    gameLogic("paper");
    res.json(score);
});

app.get("/play/scissors", function (req, res) {
    gameLogic("scissors");
    res.json(score);
});

app.get("/play/spock", function (req, res) {
    gameLogic("spock");
    res.json(score);
});

app.get("/play/lizard", function (req, res) {
    gameLogic("lizard");
    res.json(score);
});

console.log("Server is listening at port 3000");