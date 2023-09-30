const SHA256 = require("crypto-js/sha256");
const colors = require('colors');
const Block = require("./block.model");
const MerkleTree = require("./merkletree.model");

class Miner {
    constructor(blockchain, transactionsPool) {
        this.blockchain = blockchain;
        this.transactionsPool = transactionsPool;

        this.mineGenesisBlock()
    }

    mine() {
        console.log(colors.yellow("Mining a new block..."));
        const transactionData = this.transactionsPool.prepareForMining();

        if (transactionData.length < 1) {
            console.log(colors.red("There is no pending transactions. Unable to create a block :("));
            return;
        }
        const previousBlockHash = this.blockchain.lastBlockHash();
        let block = new Block(Date.now(), transactionData, previousBlockHash)
        const tree = new MerkleTree(transactionData);
        const rootHash = tree.head.value;
        block.rootHash = rootHash;

        let blockContent = {
            "transactionData": block.transactionData,
            "timestamp": block.timestamp,
            "previousBlockHash": previousBlockHash,
            "rootHash": rootHash
        }

        const jsonObject = JSON.stringify(blockContent);


        let nonce = 0
        let hash = SHA256(jsonObject + nonce).toString();

        while (hash.substring(0, this.blockchain.difficulty) !== Array(this.blockchain.difficulty).fill('0').join('')) {
            nonce++;
            hash = SHA256(jsonObject + nonce).toString();
        }

        block.hash = hash;
        block.nonce = nonce;

        this.blockchain.add(block);
        console.log(colors.green("Block mined successfully!"));
    }

    mineGenesisBlock() {
        console.log(colors.yellow("Started mining genesis block..."));
        let genesisBlock = new Block(Date.now(), "Genesis block");
        const rootHash = SHA256(genesisBlock.transactionData).toString();

        let blockContent = {
            "transactionData": genesisBlock.transactionData,
            "timestamp": genesisBlock.timestamp,
            "previousBlockHash": null,
            "rootHash": rootHash
        }

        let jsonObject = JSON.stringify(blockContent)

        let nonce = 0;
        let hash = SHA256(jsonObject + nonce).toString();

        while (hash.substring(0, this.blockchain.difficulty) != Array(this.blockchain.difficulty).fill('0').join('')) {
            nonce++;
            hash = SHA256(jsonObject + nonce).toString();
        }

        genesisBlock.hash = hash;
        genesisBlock.nonce = nonce;

        console.log(colors.green("Genesis block added successfully!"));
        this.blockchain.add(genesisBlock);
    }
}

module.exports = Miner;