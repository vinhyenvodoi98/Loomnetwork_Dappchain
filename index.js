const Web3 = require('web3')
const SimpleStore = require('./build/contracts/SimpleStore.json')
const {
  LoomProvider, Client,
  Contract, Address, LocalAddress, CryptoUtils
} = require ('loom-js')

const privateKey = CryptoUtils.generatePrivateKey()
const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)

// Create the client
const client = new Client(
  'default',
  'ws://127.0.0.1:46658/websocket',
  'ws://127.0.0.1:46658/queryws',
)
const main = async() =>  {
  // The address for the caller of the function
  const from = LocalAddress.fromPublicKey(publicKey).toString()
  console.log("from = " + from);

  // Instantiate web3 client using LoomProvider
  const web3 = new Web3(new LoomProvider(client, privateKey))

  // const contractAddress = '0x62C436B6f3f028cF1eb14BDBBc0eaF0c63f62B0E'
  const contractAddress = SimpleStore.networks["13654820909954"].address;

  console.log(contractAddress);
  // Instantiate the contract and let it ready to be used
  const contract = new web3.eth.Contract(SimpleStore.abi, contractAddress, {from})
  await contract.set(47, {from});
  // Set the value 47
  // await contract.methods.set(47).send({from })
  // Get the value 47
  // await contract.methods.get().call({from : from},(error,result)=>{
  //   console.log("result =  \n" + result);
  // })

  // contract.events.NewValueSet({}, (error, event) => {
  //   console.log('New value set', event)
  // })
  // .on('error',console.error)// The address for the caller of the function
}

main();