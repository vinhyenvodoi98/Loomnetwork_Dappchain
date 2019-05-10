const { readFileSync } = require('fs')
const LoomTruffleProvider = require('loom-truffle-provider')

const chainId    = 'default'
const writeUrl   = 'http://127.0.0.1:46658/rpc'
const readUrl    = 'http://127.0.0.1:46658/query'
const privateKey = readFileSync('./private_key', 'utf-8')

const loomTruffleProvider = new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey)
const loomProvider = loomTruffleProvider.getProviderEngine()
loomTruffleProvider.createExtraAccounts(10)

console.log("Accounts list", loomProvider.accountsAddrList)
console.log("Accounts and Private Keys", loomProvider.accounts)

module.exports = {
  compilers: {
    solc: {
      version: '0.4.22'
    }
  },
  networks: {
    loom_dapp_chain: {
      provider: loomTruffleProvider,
      network_id: '*'
    }
  }
}


// const { readFileSync } = require('fs')
// const path = require('path')
// const { join } = require('path')
// const LoomTruffleProvider = require('loom-truffle-provider')
// // const HDWalletProvider = require('truffle-hdwallet-provider')

// // const chainId    = 'default'
// // const writeUrl   = 'http://127.0.0.1:46658/rpc'
// // const readUrl    = 'http://127.0.0.1:46658/query'
// // const privateKey = readFileSync('./private_key', 'utf-8')

// // const loomTruffleProvider = new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey)

// module.exports = {
//   contracts_build_directory: join(__dirname, './src/contracts'),
//   compilers: {
//     solc: {
//       version: '0.4.22'
//     }
//   },
//   networks: {
//     // loom_dapp_chain: {
//     //   provider: loomTruffleProvider,
//     //   network_id: '*'
//     // },
//     loom_dapp_chain: {
//       provider: function() {
//         const privateKey = readFileSync(path.join(__dirname, 'private_key'), 'utf-8')
//         const chainId = 'default'
//         const writeUrl = 'http://127.0.0.1:46658/rpc'
//         const readUrl = 'http://127.0.0.1:46658/query'
//         const loomTruffleProvider = new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey)
//         loomTruffleProvider.createExtraAccountsFromMnemonic("gravity top burden flip student usage spell purchase hundred improve check genre", 10)
//         return loomTruffleProvider
//       },
//       network_id: '*'
//     },
//     loomv2b: {
//       provider: function() {
//         const privateKey = readFileSync(path.join(__dirname, 'loomv2b_pk'), 'utf-8')
//         const chainId = 'loomv2b'
//         const writeUrl = 'http://loomv2b.dappchains.com:46658/rpc'
//         const readUrl = 'http://loomv2b.dappchains.com:46658/query'
//         return new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey)
//       },
//       network_id: '12106039541279'
//     },
//     extdev_plasma_us1: {
//       provider: function() {
//         const privateKey = readFileSync(path.join(__dirname, 'extdev_private_key'), 'utf-8')
//         const chainId = 'extdev-plasma-us1'
//         const writeUrl = 'http://extdev-plasma-us1.dappchains.com:80/rpc'
//         const readUrl = 'http://extdev-plasma-us1.dappchains.com:80/query'
//         return new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey)
//       },
//       network_id: '9545242630824'
//     },
//     // rinkeby: {
//     //   provider: function() {
//     //     const mnemonic = readFileSync(path.join(__dirname, 'rinkeby_mnemonic'), 'utf-8')
//     //     if (!process.env.INFURA_API_KEY) {
//     //       throw new Error("INFURA_API_KEY env var not set")
//     //     }
//     //     return new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/${process.env.INFURA_API_KEY}`, 0, 10)
//     //   },
//     //   network_id: 4,
//     //   gasPrice: 15000000001,
//     //   skipDryRun: true
//     // }
//   }
// }
