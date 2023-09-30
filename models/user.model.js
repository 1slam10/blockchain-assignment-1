const Wallet = require("./wallet.model")
const colors = require('colors');

class User {
    constructor(login) {
        this.login = login
        this.wallet = new Wallet();
        this.walletAddress = this.wallet.walletAddress;
        this.balance = 1000;
    }

    show() {
        console.log("\n--------------------------");
        console.log("Login: " + this.login);
        console.log("Wallet address: " + colors.green(this.wallet.walletAddress));
        console.log(`User ${this.login} has: ${this.balance} Azimcoins`);
        console.log("--------------------------\n");
    }
}

module.exports = User;