const Web3 = require('web3')
const express = require('express')
var bodyParser = require("body-parser");
const SimpleStore = require('./build/contracts/SimpleStore.json')
const {
  LoomProvider, Client,
  Contract, Address, LocalAddress, CryptoUtils
} = require ('loom-js')

const app = express();
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'jade');

const privateKey = CryptoUtils.generatePrivateKey()
const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)

// Create the client
const client = new Client(
  'default',
  'ws://127.0.0.1:46658/websocket',
  'ws://127.0.0.1:46658/queryws',
)

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

set = (storeNumber) => {
  contract.methods.set(storeNumber).send({from })
}

get = () => {
  contract.methods.get().call({from : from})
  .then(result=>(result))
}

event = () => {
  contract.events.NewValueSet({}, (error, event) => {
    console.log('New value set = ', event)
  })
  .on('error',console.error)// The address for the caller of the function
}

app.get('/',(req,res)=>{
  contract.methods.get().call({from : from})
  .then(result=>{
    console.log(result);
    res.render('index',{ number : result});
  })
})

app.post('/',(req,res)=>{
  // console.log(req.body);
  set(parseInt(req.body.storeNumber));
  res.redirect('/');
})

app.listen(3000);

console.log("app is running");