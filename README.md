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
- `transactionPool.model.js` - representation of [memory pull](https://academy.binance.com/en/glossary/mempool). Memory pool holds a list of pending transactions that been made before creation of new Block. Memory pool cathes all created transactions and gives them to Miner to add them into new block. In my implementation, mempool serves also as a place to save all the transactions(for convenience). Transaction Pool has the following properties and methods:
  1. 
- `user.model.js` - user entity to have more convenient interaction with transaction operations. User class created a user with its unique login to make it simplier to send funds and to have an understanding who is who(without logins, each user is just a hash, which is user's wallet address).
- `wallet.model.js` - user's pseudocryptowallet that consists of:
  1. Wallet's keypair fields that are generated upon instantiation. Keypair is generated using [RSA](https://ru.wikipedia.org/wiki/RSA) algorithm and includes **Public Key** and **Private Key**
  2. Wallet's public address that is generated following next steps:
  3. Wallet's public key encrypted using [SHA256](https://ru.wikipedia.org/wiki/SHA-2#SHA-256) algorithm, let's mark it as **hash1**
     - **hash1** is encrypted again using [RIPEMD160](https://ru.wikipedia.org/wiki/RIPEMD-160) algorithm - **hash2**
     - Wallet address is, finally, **hash2** then encoded in [Base 58](https://ru.wikipedia.org/wiki/Base58).


- No rewards
- No miner races
- No validation of blockchain using proof of 
- No distribution

- Refs
## To install and run

```bash

git clone https://github.com/1slam10/blockchain-assignment-1.git
cd <Project folder(same as repo link)>

# to install dependencies
npm install
# to start a script and run the "app"
npm start

```

**Voila! Enjoy!**
