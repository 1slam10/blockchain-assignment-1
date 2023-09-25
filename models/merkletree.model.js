const SHA256 = require('crypto-js/sha256');

class Node {
    constructor(value, leftChild = null, rightChild = null) {
        this.value = value;
        this.left = leftChild;
        this.right = rightChild;
    }
}

class MerkleTree {

    constructor(transactions) {
        this.head = this.buildMerkleTree(transactions);
    }

    buildMerkleTree(transactions) {
        //list to store the nodes with calculated hashes
        let leaves = [];

        transactions = this.fill(transactions);

        for (let transaction of transactions) {
            leaves.push(new Node(SHA256(transaction).toString()));
        }

        let treeDepth = this.calculateTreeDepth(leaves.length);

        for (let i = 0; i < treeDepth; i++) {
            let numOfNodes = Math.pow(2, treeDepth - i);
            let nodes = [];

            for (let j = 0; j < numOfNodes; j += 2) {
                let childNode0 = leaves[j];
                let childNode1 = leaves[j + 1];

                let newNode = new Node(SHA256(childNode0.value + childNode1.value).toString(), childNode0, childNode1);

                nodes.push(newNode);
            }

            leaves = nodes;
        }

        return leaves[0];
    }

    calculateTreeDepth(numOfLeaves) {
        return Math.ceil(Math.log2(numOfLeaves));
    }

    isPowerOfTwo(numOfLeaves) {
        return Number.isInteger(Math.log2(numOfLeaves));
    }

    fill(listOfNodes) {

        let currentNumberOfLeaves = listOfNodes.length;

        if (this.isPowerOfTwo(currentNumberOfLeaves)) {
            return listOfNodes
        }

        let totalNumberOfLeaves = Math.pow(2, this.calculateTreeDepth(currentNumberOfLeaves));

        if (currentNumberOfLeaves % 2 === 0) {
            for (let i = currentNumberOfLeaves; i < totalNumberOfLeaves; i += 2) {
                listOfNodes = [...listOfNodes, listOfNodes[listOfNodes.length - 2], listOfNodes[listOfNodes.length - 1]];
            }
        } else {
            for (let i = currentNumberOfLeaves; i < totalNumberOfLeaves; i++) {
                listOfNodes.push(listOfNodes[listOfNodes.length - 1]);
            }
        }

        return listOfNodes
    }
}

module.exports = MerkleTree