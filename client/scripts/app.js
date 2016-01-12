// YOUR CODE HERE:


var app = {
  // link to our server
  server: "https://api.parse.com/1/classes/chatterbox",

  // message collection (mutable)
  //messages: ""

  message : {},  // initialise app
  init: function () {
    // grabs data from server
    app.fetch();
    // sets user name
    app.username = window.location.search.substr(10);
    app.events();
    //setInterval(app.addMessages("lobby"),1000)
  },


  // sends a fetch request to retrieve requested information from the server.
  fetch: function (message) {
    $.ajax({


      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'GET',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        app.getRooms(data);
        // app.displayMessages(data, data.roomname);
        // app.friendMessage();
        console.log('chatterbox: Message sent. Data: ', data);

      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.log('chatterbox: Failed to send message. Error: ', data);
      }
    });
  },

  // calls a push request to send information to the server
  send: function (message) {
    $.ajax({


      // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (message) {
        console.log("message we're sending to parse " + data)

      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message. Error: ', data);
      }
    });
  },

  addMessage: function (message) {

  },
  // clears messages from the stream
  clearMessages: function () {
    $("#chats").empty();
  },

  // adds a message to the stream
  displayMessages: function (message, roomnameX) {
    console.log(app.messages.results[0].text);

    var filteredRooms = _.filter(app.messages.results, function (message) {
      return message.roomname === roomnameX;
    });

    for (var i = 0; i < filteredRooms.length; i++) {
      $('#chats')
        .append("<li>" + filteredRooms[i].username + ": " + filteredRooms[i].text + "</li>");
    }

  },


  // submits handle?
  handleSubmit: function () {
        
    app.message.text = $('.messageText').val();
    app.message.username = window.location.search.substr(10);
    app.message.roomname = $(".rooms").val();
    app.send(app.message);
  },

  // adds room
  addRoom: function (room) {
  },

  getRooms: function (data) {
    var rooms = [];
    _.each(data.results, function (items) {
      rooms.push(items.roomname);
    });

    _.each(rooms, function (room) {
      $(".rooms").append("<li>" + room + "</li>")
    });
  },

  // adds friends
  addFriend: function () {
  },

  // jQuery events
  events: function () {
    $('#send').click(function () {
      app.handleSubmit();
      //app.addMessage();
    });




    //$(".userInput").click(function () {
    //  var message = {};
    //  message.text = $('.messageText').val();
    //  message.username = window.location.search.substr(10);
    //  message.roomname = $(".rooms").val();
    //  app.addMessages(message);
    //});

  }

  // jQuery renders ???
  // render:function(){}

};

app.init();


// YOUR CODE HERE:


//////////////////////////////////////////////////

// Our weird code here!

/*
 var app = {

 messages: "",
 init: function () {
 app.fetch();
 app.username = window.location.search.substr(10);
 setInterval(app.addMessages("lobby"),1000)

 },

 fetch: function (message) {
 $.ajax({
 // This is the url you should use to communicate with the parse API server.
 url: 'https://api.parse.com/1/classes/chatterbox',
 type: 'GET',
 data: JSON.stringify(message),
 contentType: 'application/json',
 success: function (data) {
 app.messages = data;
 console.log('chatterbox: Message sent. Data: ', data);

 },
 error: function (data) {
 // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
 console.error('chatterbox: Failed to send message. Error: ', data);
 }
 });
 },
 send: function (message) {
 $.ajax({
 // This is the url you should use to communicate with the parse API server.
 url: 'https://api.parse.com/1/classes/chatterbox',
 type: 'POST',
 data: JSON.stringify(message),
 contentType: 'application/json',
 success: function (data) {
 console.log('chatterbox: Message sent. Data: ', data);
 },
 error: function (data) {
 // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
 console.error('chatterbox: Failed to send message. Error: ', data);
 }
 });
 },
 clearMessages: function () {
 $(".messages").empty();
 },
 addMessages: function (roomnameX) {
 var filteredRooms = _.filter(app.messages.results, function (message) {
 if (message.roomname === roomnameX) {
 return message;
 }
 });

 $('#msgs')
 .append("<li>" + filteredRooms.results[3] + "</li>");

 },
 message: function (message) {

 //app.messages.results[3]

 $('.messages').append("<ul>").attr("class", "message").text(message.text);
 },

 handleSubmit: function () {
 },
 addRoom: function () {
 },
 addFriend: function () {
 }
 };

 app.init();*/

