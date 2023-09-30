const BlockChain = require('./models/blockchain.model');
const Miner = require('./models/miner.model');
const Transaction = require('./models/transaction.model');
const User = require('./models/user.model.js')
const TransactionPool = require("./models/transactionPool.model");

const prompt = require('prompt-sync')({ sigint: true });

class App {
    constructor() {
        this.chain = new BlockChain();
        this.transactionPool = new TransactionPool();
        this.miner = new Miner(this.chain, this.transactionPool);
        this.users = [];
    }

    handleOperation(input) {
        switch(input) {
            case 1:
                this.createUser();
                break;
            case 2:
                this.showUsers();
                break;
            case 3:
                this.makeTransaction();
                break;
            case 4:
                this.showPendingTransactions();
                break;
            case 5:
                this.showTransactionHistory();
                break;
            case 7:
                this.showBlockchain();
                break;
            case 6:
                this.miner.mine();
                break;
            default: console.log("Ooooops, you entered something wrong...")
        }
    }

    createUser() {
        let input = prompt('Enter new user login: ');

        for (let user of this.users) {
            if (user.login === input) {
                console.log("\n\n\nUser already exists!\n\n\n");
                return;
            }
        }

        const user = new User(input);
        this.users.push(user);
        console.log(`\n\n\nNew user with login "${input}" has been created!\n\n\n`)
    }

    showUsers() {
        console.log('\n\n\n')
        for (let user of this.users) {
            user.show();
        }
        console.log('\n\n\n')
    }

    makeTransaction() {
        let senderLogin = prompt('From(login): ');
        let receiverLogin = prompt('To(login): ');
        let amount = Number(prompt('Amount: '));

        console.log(`\n\n\nCreating a transaction from ${senderLogin} to ${receiverLogin}`)


        let sender = null;
        let receiver = null;

        let senderIndex = -1;
        let receiverIndex = -1;

        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].login === senderLogin) {
                sender = this.users[i].wallet;
                senderIndex = i;
            }

            if (this.users[i].login === receiverLogin) {
                receiver = this.users[i].walletAddress;
                receiverIndex = i;
            }
        }

        if (!sender && !receiver) {
            console.log("Something got wrong. Check the entered data for correctness. Aborting...");
            return;
        }

        const transaction = new Transaction(sender, receiver, amount);

        this.transactionPool.add(transaction);

        this.users[receiverIndex].balance = this.transactionPool.getFunds(this.users[receiverIndex].walletAddress)
        this.users[senderIndex].balance = this.transactionPool.getFunds(this.users[senderIndex].walletAddress)
    }

    showPendingTransactions() {
        this.transactionPool.showPending();
    }

    showTransactionHistory() {
        this.transactionPool.showTransactionsHistory();
    }

    showBlockchain() {
        this.chain.show();
        console.log('\n\n\n')
    }
}

module.exports = App;