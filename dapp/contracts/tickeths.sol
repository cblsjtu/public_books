contract Tickeths {// The keyword "public" makes those variables
    // readable from outside.
    address public minter;
    mapping (address => uint) public balances;

    // Events allow light clients to react on
    // changes efficiently.
    event sent(address from, address to, uint amount);

    
    event showCreated(address from, string name);
    event segmentCreated(string name, uint segmentID);
    event ticketBought(address from, uint segmentID,uint ticketID,bytes32 code);
    event isValid(bool valid);
    
    // This is the constructor whose code is
    // run only when the contract is created.
    function Tickeths() {
        minter = msg.sender;
    }
    function mint(address receiver, uint amount) {
        if (msg.sender != minter) return;
        balances[receiver] += amount;
    }
    function send(address receiver, uint amount) {
        if (balances[msg.sender] < amount) return;
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        sent(msg.sender, receiver, amount);
    }
    
    struct segment {
        string name;
        uint amount;
        uint price;
        uint soldAmount;
    }

    struct show {
        string name;
        uint numSegments;
        showFolio sf;
        mapping (uint => segment) segments;
    }

    struct ticket {
        uint segment;
        bytes32 challenge;
    }

    struct pack {
        uint numTickets;
        mapping (uint => ticket) tickets;        
    }
    
    struct showFolio {
        uint totTickets;
        mapping (uint => ticket) tickets;
    }
    
    struct folder {
        mapping(address => pack) packs;
    }

    function createShow(string name) returns (uint){
        //todo, validate many shows or one per address?
        show sh = shows[msg.sender];
        sh.name = name;
        numShows++;
        showCreated(msg.sender,name);
        return numShows;
    }
    
    function addSegment(string name, uint amount,uint price) returns(uint){
        show sh = shows[msg.sender];
        sh.numSegments++;
        segment seg = sh.segments[sh.numSegments];
        seg.name = name;
        seg.amount = amount;
        seg.price = price;
        segmentCreated(name,sh.numSegments);
        return sh.numSegments;
    }
    
    function getSegment(uint segmentID) returns (string name){
        return shows[msg.sender].segments[segmentID].name;
    }
    
    function showName(address a) returns (string name){
        a = msg.sender;
        return shows[a].name;
    }
    
    function buyTicket(address addr, uint s) returns (uint){
        //address show = msg.sender;
        segment seg = shows[addr].segments[s];
        
        if (seg.amount == seg.soldAmount) throw;

        seg.soldAmount++;
        pack p = folders[msg.sender].packs[addr];
        p.numTickets++;
        ticket t = p.tickets[p.numTickets];
        t.segment = s;
        // challenge is client side generated, this is a test only
        t.challenge = "test";
        
        showFolio sf = shows[addr].sf;
        sf.totTickets++;
        uint ticketID = sf.totTickets;
        sf.tickets[ticketID] = t;
        ticketBought(addr,s,ticketID,t.challenge);
        return sf.totTickets;
    }
    
    function clientTicketN() returns (uint numTickets){
        address show = msg.sender;
        pack p = folders[msg.sender].packs[show];
        return p.numTickets;
    }
    
    function showTicketN() returns (uint totTickets) {
        address show = msg.sender;
        return shows[show].sf.totTickets;
    }
    
    function validateTicket(uint ticketID, bytes32 code) returns (bool) {
        address addr = msg.sender;
        bool valid = false;
        // validation function will use encryption this is an example only
        if (shows[addr].sf.tickets[ticketID].challenge == code) valid = true;
        isValid(valid);
        return valid;
    }
    
    uint numShows;
    mapping (address => show) shows;
    mapping (address => folder) folders;
}