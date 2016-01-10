if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
  
  
  Template.sent.events({
  'click button': function (e, template) {
        var from = template.find('.from').value;
        var to = template.find('.to').value;
        var amount = template.find('.amount').value;
        Books.sent(from, to, amount,{from: web3.eth.accounts[0], gas: 500000})
        template.find('.from').value = '';
        template.find('.to').value = '';
        template.find('.amount').value = '';
    },  
});

  Template.sent.helpers({
  sentInfo: function() {
    return Session.get('sentInfo');
  }
});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
