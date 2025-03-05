export const ABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "string",
          "name": "studentUniqueId",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "documentHash",
          "type": "string"
        }
      ],
      "name": "DocumentHashStored",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "studentUniqueId",
          "type": "string"
        }
      ],
      "name": "getDocumentHashes",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "studentUniqueId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "documentHash",
          "type": "string"
        }
      ],
      "name": "storeDocumentHash",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "studentUniqueId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "documentHash",
          "type": "string"
        }
      ],
      "name": "verifyDocument",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

  export const BYTEcode = "0x6080604052348015600f57600080fd5b50610b6e8061001f6000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80633796525f1461004657806387680a4714610062578063a4ca650b14610092575b600080fd5b610060600480360381019061005b9190610508565b6100c2565b005b61007c60048036038101906100779190610580565b610164565b604051610089919061070a565b60405180910390f35b6100ac60048036038101906100a79190610508565b61025b565b6040516100b99190610747565b60405180910390f35b6000826040516100d2919061079e565b90815260200160405180910390208190806001815401808255809150506001900390600052602060002001600090919091909150908161011291906109cb565b5081604051610121919061079e565b60405180910390207f5dca7a7779e4f5a1bdf33ca02941580390ce8bb69504f62d159c4a167a901860826040516101589190610ae7565b60405180910390a25050565b6060600082604051610176919061079e565b9081526020016040518091039020805480602002602001604051908101604052809291908181526020016000905b828210156102505783829060005260206000200180546101c3906107e4565b80601f01602080910402602001604051908101604052809291908181526020018280546101ef906107e4565b801561023c5780601f106102115761010080835404028352916020019161023c565b820191906000526020600020905b81548152906001019060200180831161021f57829003601f168201915b5050505050815260200190600101906101a4565b505050509050919050565b60008060008460405161026e919061079e565b9081526020016040518091039020805480602002602001604051908101604052809291908181526020016000905b828210156103485783829060005260206000200180546102bb906107e4565b80601f01602080910402602001604051908101604052809291908181526020018280546102e7906107e4565b80156103345780601f1061030957610100808354040283529160200191610334565b820191906000526020600020905b81548152906001019060200180831161031757829003601f168201915b50505050508152602001906001019061029c565b50505050905060005b81518110156103a157838051906020012082828151811061037557610374610b09565b5b60200260200101518051906020012003610394576001925050506103a8565b8080600101915050610351565b5060009150505b92915050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610415826103cc565b810181811067ffffffffffffffff82111715610434576104336103dd565b5b80604052505050565b60006104476103ae565b9050610453828261040c565b919050565b600067ffffffffffffffff821115610473576104726103dd565b5b61047c826103cc565b9050602081019050919050565b82818337600083830152505050565b60006104ab6104a684610458565b61043d565b9050828152602081018484840111156104c7576104c66103c7565b5b6104d2848285610489565b509392505050565b600082601f8301126104ef576104ee6103c2565b5b81356104ff848260208601610498565b91505092915050565b6000806040838503121561051f5761051e6103b8565b5b600083013567ffffffffffffffff81111561053d5761053c6103bd565b5b610549858286016104da565b925050602083013567ffffffffffffffff81111561056a576105696103bd565b5b610576858286016104da565b9150509250929050565b600060208284031215610596576105956103b8565b5b600082013567ffffffffffffffff8111156105b4576105b36103bd565b5b6105c0848285016104da565b91505092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561062f578082015181840152602081019050610614565b60008484015250505050565b6000610646826105f5565b6106508185610600565b9350610660818560208601610611565b610669816103cc565b840191505092915050565b6000610680838361063b565b905092915050565b6000602082019050919050565b60006106a0826105c9565b6106aa81856105d4565b9350836020820285016106bc856105e5565b8060005b858110156106f857848403895281516106d98582610674565b94506106e483610688565b925060208a019950506001810190506106c0565b50829750879550505050505092915050565b600060208201905081810360008301526107248184610695565b905092915050565b60008115159050919050565b6107418161072c565b82525050565b600060208201905061075c6000830184610738565b92915050565b600081905092915050565b6000610778826105f5565b6107828185610762565b9350610792818560208601610611565b80840191505092915050565b60006107aa828461076d565b915081905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806107fc57607f821691505b60208210810361080f5761080e6107b5565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026108777fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8261083a565b610881868361083a565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b60006108c86108c36108be84610899565b6108a3565b610899565b9050919050565b6000819050919050565b6108e2836108ad565b6108f66108ee826108cf565b848454610847565b825550505050565b600090565b61090b6108fe565b6109168184846108d9565b505050565b5b8181101561093a5761092f600082610903565b60018101905061091c565b5050565b601f82111561097f5761095081610815565b6109598461082a565b81016020851015610968578190505b61097c6109748561082a565b83018261091b565b50505b505050565b600082821c905092915050565b60006109a260001984600802610984565b1980831691505092915050565b60006109bb8383610991565b9150826002028217905092915050565b6109d4826105f5565b67ffffffffffffffff8111156109ed576109ec6103dd565b5b6109f782546107e4565b610a0282828561093e565b600060209050601f831160018114610a355760008415610a23578287015190505b610a2d85826109af565b865550610a95565b601f198416610a4386610815565b60005b82811015610a6b57848901518255600182019150602085019450602081019050610a46565b86831015610a885784890151610a84601f891682610991565b8355505b6001600288020188555050505b505050505050565b600082825260208201905092915050565b6000610ab9826105f5565b610ac38185610a9d565b9350610ad3818560208601610611565b610adc816103cc565b840191505092915050565b60006020820190508181036000830152610b018184610aae565b905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fdfea264697066735822122095cffe0a184dc0b1f2e4db368a639e5d3d64db84eae30b68b0c9ea74a2700d2364736f6c634300081c0033"
  "0x608060405234801561001057600080fd5b50600436106100415760003560e01c80633796525f1461004657806387680a4714610062578063a4ca650b14610092575b600080fd5b610060600480360381019061005b9190610508565b6100c2565b005b61007c60048036038101906100779190610580565b610164565b604051610089919061070a565b60405180910390f35b6100ac60048036038101906100a79190610508565b61025b565b6040516100b99190610747565b60405180910390f35b6000826040516100d2919061079e565b90815260200160405180910390208190806001815401808255809150506001900390600052602060002001600090919091909150908161011291906109cb565b5081604051610121919061079e565b60405180910390207f5dca7a7779e4f5a1bdf33ca02941580390ce8bb69504f62d159c4a167a901860826040516101589190610ae7565b60405180910390a25050565b6060600082604051610176919061079e565b9081526020016040518091039020805480602002602001604051908101604052809291908181526020016000905b828210156102505783829060005260206000200180546101c3906107e4565b80601f01602080910402602001604051908101604052809291908181526020018280546101ef906107e4565b801561023c5780601f106102115761010080835404028352916020019161023c565b820191906000526020600020905b81548152906001019060200180831161021f57829003601f168201915b5050505050815260200190600101906101a4565b505050509050919050565b60008060008460405161026e919061079e565b9081526020016040518091039020805480602002602001604051908101604052809291908181526020016000905b828210156103485783829060005260206000200180546102bb906107e4565b80601f01602080910402602001604051908101604052809291908181526020018280546102e7906107e4565b80156103345780601f1061030957610100808354040283529160200191610334565b820191906000526020600020905b81548152906001019060200180831161031757829003601f168201915b50505050508152602001906001019061029c565b50505050905060005b81518110156103a157838051906020012082828151811061037557610374610b09565b5b60200260200101518051906020012003610394576001925050506103a8565b8080600101915050610351565b5060009150505b92915050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610415826103cc565b810181811067ffffffffffffffff82111715610434576104336103dd565b5b80604052505050565b60006104476103ae565b9050610453828261040c565b919050565b600067ffffffffffffffff821115610473576104726103dd565b5b61047c826103cc565b9050602081019050919050565b82818337600083830152505050565b60006104ab6104a684610458565b61043d565b9050828152602081018484840111156104c7576104c66103c7565b5b6104d2848285610489565b509392505050565b600082601f8301126104ef576104ee6103c2565b5b81356104ff848260208601610498565b91505092915050565b6000806040838503121561051f5761051e6103b8565b5b600083013567ffffffffffffffff81111561053d5761053c6103bd565b5b610549858286016104da565b925050602083013567ffffffffffffffff81111561056a576105696103bd565b5b610576858286016104da565b9150509250929050565b600060208284031215610596576105956103b8565b5b600082013567ffffffffffffffff8111156105b4576105b36103bd565b5b6105c0848285016104da565b91505092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561062f578082015181840152602081019050610614565b60008484015250505050565b6000610646826105f5565b6106508185610600565b9350610660818560208601610611565b610669816103cc565b840191505092915050565b6000610680838361063b565b905092915050565b6000602082019050919050565b60006106a0826105c9565b6106aa81856105d4565b9350836020820285016106bc856105e5565b8060005b858110156106f857848403895281516106d98582610674565b94506106e483610688565b925060208a019950506001810190506106c0565b50829750879550505050505092915050565b600060208201905081810360008301526107248184610695565b905092915050565b60008115159050919050565b6107418161072c565b82525050565b600060208201905061075c6000830184610738565b92915050565b600081905092915050565b6000610778826105f5565b6107828185610762565b9350610792818560208601610611565b80840191505092915050565b60006107aa828461076d565b915081905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806107fc57607f821691505b60208210810361080f5761080e6107b5565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026108777fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8261083a565b610881868361083a565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b60006108c86108c36108be84610899565b6108a3565b610899565b9050919050565b6000819050919050565b6108e2836108ad565b6108f66108ee826108cf565b848454610847565b825550505050565b600090565b61090b6108fe565b6109168184846108d9565b505050565b5b8181101561093a5761092f600082610903565b60018101905061091c565b5050565b601f82111561097f5761095081610815565b6109598461082a565b81016020851015610968578190505b61097c6109748561082a565b83018261091b565b50505b505050565b600082821c905092915050565b60006109a260001984600802610984565b1980831691505092915050565b60006109bb8383610991565b9150826002028217905092915050565b6109d4826105f5565b67ffffffffffffffff8111156109ed576109ec6103dd565b5b6109f782546107e4565b610a0282828561093e565b600060209050601f831160018114610a355760008415610a23578287015190505b610a2d85826109af565b865550610a95565b601f198416610a4386610815565b60005b82811015610a6b57848901518255600182019150602085019450602081019050610a46565b86831015610a885784890151610a84601f891682610991565b8355505b6001600288020188555050505b505050505050565b600082825260208201905092915050565b6000610ab9826105f5565b610ac38185610a9d565b9350610ad3818560208601610611565b610adc816103cc565b840191505092915050565b60006020820190508181036000830152610b018184610aae565b905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fdfea264697066735822122095cffe0a184dc0b1f2e4db368a639e5d3d64db84eae30b68b0c9ea74a2700d2364736f6c634300081c0033"
