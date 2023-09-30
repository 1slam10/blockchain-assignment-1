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

        const randomSeed = crypto.randomInt(0, 281474976710655).toString();

        const keyPair = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            randomSeed
        });

        // Get the public and private keys.
        const publicKey = keyPair.publicKey.export({ type: 'spki', format: 'pem' }).toString();
        const privateKey = keyPair.privateKey.export({ type: 'pkcs8', format: 'pem' }).toString();

        return [publicKey, privateKey];
    }

    initializeWalletAddress(publicKey) {
        let hash1 = SHA256(publicKey).toString();
        let hash2 = RIPEMD160(hash1).toString();
        let walletAddress = bs58.encode(Buffer.from(hash2, 'utf-8'));

        return walletAddress;
    }
}

module.exports = Wallet