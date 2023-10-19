# Simple blockchain system

First assignment on creating blockchain to understand the fundamentals of the technology, and to have a answers to the following questions:

- How does blockchian work?
- How does wallet work?
- What is Proof-of-Work?
- What is mining and how does it work?

The simple command-line application is written on JavaScript.

**Why JavaScript?**
I have no idea :)

## Modules

Each module in the folder `modules` represent distinct entity:

- `block.model.js` - representation of Block that consist of single block's fields

- `blockchain.model.js` - representation of Blockchain  
which contains:
  1. Array representation of blockchain
  2. Difficulty property to regulate the amount of computational work while mining the block
  3. `add(block)` method to push newly created baby-block (lol) into the chain
  4. `lastBlockHash()` method to retrieve the hash of previous block
  5. `show()` method to output the blockchain structure
- `merkletree.model.js` - implementation of Merkle Tree data structure to have a Root Hash header in the Block(check `block.model.js`) that stores hashes of block's transactions data and to prevent data modification. Learn more about Merkle Trees [here](https://en.wikipedia.org/wiki/Merkle_tree)

- `miner.model.js` - representation of miner, that mines new blocks. After creation, miner has two fields: blockchain and memory pool. Miner has 2 methods:
  1. `mine()` method that receives a transaction data from `transactionPool` or momory pool that stores list of pending transactions. Then, it creates a new block, calculates merkle tree root hash, calculates its [nonce](https://ru.wikipedia.org/wiki/Nonce) which is a part of Proof-of-Work mechanism, and ensembles the data into single block. After mining it adds new block using `blockchian.add(newBlock)` method (see in `blockchain.model.js`).
  2. `mineGenesisBlock()` method which called during instantiation of Miner class. After creation, blockchain is totally empty, and the first block of the chain without data and previous block's hash is called **Genesis Block** that serves as a "head" of chain. The method generates this one Genesis Block.

- `transaction.model.js` - representation of transaction between two wallets. It has:
  1. `sign()` - method to sign and veify the transaction using the private key of transaction initiator's(owner's) wallet
  2. `generateData()` method to process the transaction data and convert it to byte array for further sign operation
  3. `getTransactionData()` method to retrieve the transaction data as an single object, and to send it to block
  4. `show()` method to output the info about transaction

- `transactionPool.model.js` - representation of [memory pool](https://academy.binance.com/en/glossary/mempool). Memory pool holds a list of pending transactions that been made before creation of new Block. Memory pool cathes all created transactions and gives them to Miner to add them into new block. In my implementation, mempool serves also as a place to save all the transactions(for convenience). Transaction Pool has the following properties and methods:
  1. `transactions[]` is a list to hold a history of transactions.
  2. `pendingTransactions[]` is a list to store pending transactions that are currently don't belong to any block. The list is cleared since new block is mined.
  3. `add(transaction)` method that takes a newly created transaction as an input and verifies it. The verification of the transaction consists of signature check and available funds check. For signature check it just checks the signature of the block using transaction owner's public key(pretty straightforward, I know). Funds check iterates over transactions history and check if sender has a enough amount of available cash to send it. Then if it is all okay, it adds transaction both to pending transactions list and transaction history list.
  4. `getFunds()` method is a helper just to update a users balance in tha application. Actually it is a duplicate of a `validateFunds()`. Yes, I know that it was a serious mistake to duplicate the same function, but it is what it is. See [here](#why-is-this-project-so-miserable) why.
  5. `prepareForMining()` method gets all pending transactions and merges all of them into one single list of objects and then clears a pending transactions list.
  6. `showPending()` method outputs to stdout pending transactions, nothing more :)

- `user.model.js` - user entity to have more convenient interaction with transaction operations. User class created a user with its unique login to make it simplier to send funds and to have an understanding who is who(without logins, each user is just a hash, which is user's wallet address).

- `wallet.model.js` - user's pseudocryptowallet that consists of:
  1. Wallet's keypair fields that are generated upon instantiation. Keypair is generated using [RSA](https://ru.wikipedia.org/wiki/RSA) algorithm and includes **Public Key** and **Private Key**
  2. Wallet's public address that is generated following next steps:
  3. Wallet's public key encrypted using [SHA256](https://ru.wikipedia.org/wiki/SHA-2#SHA-256) algorithm, let's mark it as **hash1**
     - **hash1** is encrypted again using [RIPEMD160](https://ru.wikipedia.org/wiki/RIPEMD-160) algorithm - **hash2**
     - Wallet address is, finally, **hash2** then encoded in [Base 58](https://ru.wikipedia.org/wiki/Base58).

There is another `app.js` file outside of the `models` folder that holds an Application itself. Basically, application is nothing more than just a class to create an instances of all of the modules mentioned above and to call appropriate methods and perform actions on blockchain depending on user's input.

`main.js` is just a `main.js`. Take it easy, bro :)

## Why is this project so miserable?

The deadlines were short, it was my first touch of blockchain and a lot of stuff were unclear in the process of creation(not an excuse, but reasonable argument, lol). 
Generally, I had no purpose to invent a wheel or make a clone of great Satoshi Nakamoto's work. I tried to got to know what the blockchain even is and I believe, somehow I figured it out. Project has a lot of mistakes and things that are out of bounds of any logic. The methods are mixed up and a lot of stuff that are exist in real blokcchain was cut off. Project don't include following features(it is what I know, inly God knows what is over there that I have no idea of their existence):

- No reward system
- No miner races
- No validation of blockchain
- No distribution across nodes of network

And a lot more...

The next project are gonna be much better!
Thank you for your attention <3

## To install and run

> You have to have NodeJS JavaScript runtime and `npm` package manager installed on your machine 

```bash

git clone https://github.com/1slam10/blockchain-assignment-1.git
cd <Project folder(same as repo link)>

# to install dependencies
npm install
# to start a script and run the "app"
npm start

```

**Voila! Enjoy!**
