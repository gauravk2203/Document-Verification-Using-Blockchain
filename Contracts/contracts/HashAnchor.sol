// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HashAncor {

    // Mapping to store hashes of documents by student unique ID (now using string instead of bytes32)
    mapping(string => string[]) private studentDocuments;

    // Event for storing document hash
    event DocumentHashStored(string indexed studentUniqueId, string documentHash);

    // Function to store document hashes associated with a student unique ID
    function storeDocumentHash(string memory studentUniqueId, string memory documentHash) public {
        studentDocuments[studentUniqueId].push(documentHash);
        emit DocumentHashStored(studentUniqueId, documentHash);
    }

    // Function to verify if a document hash exists for a student unique ID
   function verifyDocument(string memory studentUniqueId, string memory documentHash) public view returns (bool) {
    string[] memory hashes = studentDocuments[studentUniqueId];
    for (uint i = 0; i < hashes.length; i++) {
        if (keccak256(bytes(hashes[i])) == keccak256(bytes(documentHash))) { 
            return true; // Document hash found, it is authentic
        }
    }
    return false;
    
}

    // Function to retrieve all document hashes for a student unique ID
    function getDocumentHashes(string memory studentUniqueId) public view returns (string[] memory) {
        return studentDocuments[studentUniqueId];
    }
}