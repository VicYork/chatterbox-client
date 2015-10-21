// YOUR CODE HERE:

var app = {
  server: 'https://api.parse.com/1/classes/chatterbox'
};

app.init = function() {

  $('.username').on('click', function() {
    app.addFriend($(this).text());
  });

  $('#send').on('submit', app.handleSubmit);
};

app.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function(data) {
      console.log('chatterbox: Message sent. Data: ', data);
    },
    error: function(data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message. Error: ', data);
    }
  });
};

app.fetch = function() {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'GET',
    contentType: 'application/json',
    success: function(data) {
      _.each(data.results, function(message){
        app.addMessage(message);
      });
      console.log('chatterbox: Message sent. Data: ', data);
    },
    error: function(data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message. Error: ', data);
    }
  });
};

app.clearMessages = function() {
  $('#chats').html('');
};

app.addMessage = function(message) {
  var html = $('<div>');
  html.append('<a>').addClass('username').text(message.username);
  html.append('<p>').text(message.text);
  html.append('<p>').text(message.roomname);
  $('#chats').append(html);
};

app.addRoom = function(room) {
  var html = $('<li>').addClass(room);
  $('#roomSelect').append(html);
};

app.addFriend = function(friend) {
   if (!app.friends[friend]) {
    app.friends[friend] = true;
    var html = $('<li>').text(friend);
    $('#friendList').append(html);
  }


};

app.handleSubmit = function() {
  console.log($('#message').val());
};

$(document).ready(function() {
  app.init();
});