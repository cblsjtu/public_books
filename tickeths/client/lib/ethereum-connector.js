// meteor require some values to be declared global so they have no var

web3 = new Web3();
var sID = "11920a1b4333af162e03927af8788d0b6a2ba80c"
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
    "type": "event"
  },
  
  {
    "constant": false,
    "inputs": [
      {
        "name": "ticketID",
        "type": "uint256"
      },
      {
        "name": "code",
        "type": "bytes32"
      }
    ],
    "name": "validateTicket",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "name",
        "type": "string"
      }
    ],
    "name": "createShow",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "clientTicketN",
    "outputs": [
      {
        "name": "numTickets",
        "type": "uint256"
      }
    ],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "showTicketN",
    "outputs": [
      {
        "name": "totTickets",
        "type": "uint256"
      }
    ],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "addr",
        "type": "address"
      },
      {
        "name": "s",
        "type": "uint256"
      }
    ],
    "name": "buyTicket",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "segmentID",
        "type": "uint256"
      }
    ],
    "name": "getSegment",
    "outputs": [
      {
        "name": "name",
        "type": "string"
      }
    ],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "amount",
        "type": "uint256"
      },
      {
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "addSegment",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "a",
        "type": "address"
      }
    ],
    "name": "showName",
    "outputs": [
      {
        "name": "name",
        "type": "string"
      }
    ],
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "name",
        "type": "string"
      }
    ],
    "name": "showCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "segmentID",
        "type": "uint256"
      }
    ],
    "name": "segmentCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "segmentID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "ticketID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "code",
        "type": "bytes32"
      }
    ],
    "name": "ticketBought",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "valid",
        "type": "bool"
      }
    ],
    "name": "isValid",
    "type": "event"
  }
]
    
TickethsObject = web3.eth.contract(abi);

Tickeths = TickethsObject.at('0xdf315f7485c3a86eb692487588735f224482abe3');

Tickeths.showCreated({}).watch(function(e, log) {
    if(!e) {
        console.log('A new show was created from address:'+ log.args.from + ' and is named:'+ log.args.name);
        alert('A new show was created from address:'+ log.args.from + ' and is named:'+ log.args.name);
        Session.set("createShowInfo", 'ethereum event: A new show named: '+log.args.name+' was created from address: '+ log.args.from)
    }
});

Tickeths.segmentCreated({}).watch(function(e, log) {
    if(!e) {
        console.log('ethereum event: A new segment named: '+log.args.name+' was created with ID: '+ log.args.segmentID);
        alert('ethereum event: A new segment named: '+log.args.name+' was created with ID: '+ log.args.segmentID);
        Session.set("createSegmentInfo", 'ethereum event: A new segment named: '+log.args.name+' was created with ID: '+ log.args.segmentID)
    }
});

Tickeths.ticketBought({}).watch(function(e, log) {
    if(!e) {
        console.log('A ticket was bought from address:'+ log.args.from + ' and is segment:'+ log.args.segmentID);
        alert('A ticket was bought from address:'+ log.args.from + ' and is segment:'+ log.args.segmentID);
        Session.set("buyTicketInfo", 'ethereum event: A ticket was bought from address:'+ log.args.from + ' and is segment:'+ log.args.segmentID + " serial:" + log.args.ticketID+" key:"+log.args.code)
    }
});

Tickeths.isValid({}).watch(function(e, log) {
    if(!e) {
        var valid='';
        if (!log.args.valid) valid =" not"
        console.log('ticket is'+valid+' valid');
        alert('ticket is '+valid+' valid');
        Session.set("validateTicketInfo", 'ethereum event: ticket is'+valid+' valid')
    }
});

Tickeths.sent({}).watch(function(e, log) {
    if(!e) {
        console.log("Books transfer: " + log.args.amount +
            " Books were sent from " + log.args.from +
            " to " + log.args.to + ".");
        alert("Books transfer: " + log.args.amount +
            " Books were sent from " + log.args.from +
            " to " + log.args.to + ".");
        Session.set("sentInfo", "Books transfer: " + log.args.amount +
            " Books were sent from " + log.args.from +
            " to " + log.args.to + ".")
    }
});