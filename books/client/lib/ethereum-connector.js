// meteor require some values to be declared global so they have no var

web3 = new Web3();
var sID = "c67a7d5a8c8ccaaf3d7492608c33ba96276210b3"
// set providor
if(!web3.currentProvidor)
    web3.setProvider(new web3.providers.HttpProvider("http://books-2.china-2.ether.camp:8555/sandbox/"+sID));

var abi = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "from",
        "type": "address"
      },
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "amount",
        "type": "uint"
      }
    ],
    "name": "sent",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "type": "function"
  }
]
    
Books = web3.eth.contract(abi);

Books = Books.at('0xdf315f7485c3a86eb692487588735f224482abe3');

Books.sent().watch({}, '', function(error, result) {
    if (!error) {
        console.log("Books transfer: " + result.args.amount +
            " Books were sent from " + result.args.from +
            " to " + result.args.to + ".");
        console.log("Balances now:\n" +
            "Sender: " + Books.balances.call(result.args.from) +
            "Receiver: " + Books.balances.call(result.args.to));
        alert("Books transfer: " + result.args.amount +
            " Books were sent from " + result.args.from +
            " to " + result.args.to + ".");
        Session.set("sentInfo", "Books transfer: " + result.args.amount +
            " Books were sent from " + result.args.from +
            " to " + result.args.to + ".")
    }
});