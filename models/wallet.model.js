const SHA256 = require('crypto-js/sha256');
const RIPEMD160 = require('crypto-js/ripemd160');
const crypto = require('crypto');
const bs58 = require('bs58');



class Wallet {
    constructor() {
        this.keyPair = this.generateKeyPair();
        this.publicKey = this.keyPair[0];
        this.privateKey = this.keyPair[1];
        this.walletAddress = this.initializeWalletAddress(this.publicKey);
    }

    generateKeyPair() {
        const keyPair = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048
        });

        // Get the public and private keys.
        const publicKey = keyPair.publicKey;
        const privateKey = keyPair.privateKey;

        return [publicKey, privateKey];
    }

    initializeWalletAddress(publicKey) {
        hash1 = SHA256(publicKey).toString();
        hash2 = RIPEMD160(hash1).toString();
        walletAddress = bs58.encode(Buffer.from(hash2, 'utf-8'));

        return walletAddress;
    }
}

module.exports = Wallet