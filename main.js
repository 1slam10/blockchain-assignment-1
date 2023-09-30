const prompt = require('prompt-sync')({ sigint: true });

const App = require('./app');

const app = new App();

let input = 0;

do {
    console.log("-------------------------");
    console.log("[1] Create user");
    console.log("[2] Show users");
    console.log("[3] Make a transaction");
    console.log("[4] Show pending transactions");
    console.log("[5] Show transactions history");
    console.log("[6] Create a block of pending transactions");
    console.log("[7] Show blockchain\n");
    console.log("[8] Exit");
    console.log("-------------------------\n");

    input = Number(prompt('> '));

    if (input === 8) {
        console.log("Bye, bye, my friend <3");
        break;
    }

    app.handleOperation(input);
    
} while (input != 8)