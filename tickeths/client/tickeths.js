/*Session.setDefault('createShowInfo', "");
Session.setDefault('createSegmentInfo', "");*/

Template.createShow.events({
  'click button': function (e, template) {
        var name = template.find('.showName').value;
        Tickeths.createShow(name,{from: web3.eth.accounts[0], gas: 500000})
        template.find('.showName').value = '';
        // alert(data);
    },  
});

Template.createSegment.events({
  'click button': function (e, template) {
        var segment = template.find('.segment').value;
        var amount = template.find('.amount').value;
        var price = template.find('.price').value;
        Tickeths.addSegment(segment, amount, price,{from: web3.eth.accounts[0], gas: 500000})
        template.find('.segment').value = '';
        template.find('.amount').value = '';
        template.find('.price').value = '';
    },  
});

Template.buyTicket.events({
  'click button': function (e, template) {
        var address = template.find('.address').value;
        var sid = template.find('.sid').value;
        Tickeths.buyTicket(address,sid,{from: web3.eth.accounts[0], value:100, gas: 500000})
        template.find('.address').value = '';
        template.find('.sid').value = '';
        
    },  
});

Template.validateTicket.events({
  'click button': function (e, template) {
        var serial = template.find('.serial').value;
        var key = template.find('.key').value;
        Tickeths.validateTicket(serial,key,{from: web3.eth.accounts[0], gas: 500000})
        template.find('.serial').value = '';
        template.find('.key').value = '';
        
    },  
});

Template.sent.events({
  'click button': function (e, template) {
        var from = template.find('.from').value;
        var to = template.find('.to').value;
        var amount = template.find('.amount').value;
        Tickeths.sent(from, to, amount,{from: web3.eth.accounts[0], gas: 500000})
        template.find('.from').value = '';
        template.find('.to').value = '';
        template.find('.amount').value = '';
    },  
});


Template.createShow.helpers({
  createShowInfo: function() {
    return Session.get('createShowInfo');
  }
});

Template.createSegment.helpers({
  createSegmentInfo: function() {
    return Session.get('createSegmentInfo');
  }
});

Template.buyTicket.helpers({
  buyTicketInfo: function() {
    return Session.get('buyTicketInfo');
  }
});


Template.validateTicket.helpers({
  validateTicketInfo: function() {
    return Session.get('validateTicketInfo');
  }
});

Template.sent.helpers({
  sentInfo: function() {
    return Session.get('sentInfo');
  }
});