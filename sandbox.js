//add a $(document).on('ready', function(){
//app.init();
//


//addMessage should take user input
//displayFeed should display all of the messages if no room has been passed

fetch : function(){
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Messages received');
      app.displayMessages(data.results);
      app.getRooms(data)

    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive message');
    }
  });
};


displayMessage : function(message){
    $("#msgs").append("<li ='message'>" message.username + "</a>" +": " + message.text + "</li>");
    }
  };

//call display feed from init passing in room,with a default of currentRoom
displayFeed : function(room){
    app.displayClear();
    _.each(room, app.displayMessage);
  }


  $('.createRoom').click(app.createRoom) //Button
//create app level var to hold roomname
// createRoom : function(){
//   app.currentRoom = prompt("name of new room")

//   defaultMessage = {
//     username: app.username
//     roomname: app.currentRoom
//   };

//   app.send(defaultMessage, function()app.fetch(app.updateRooms))

// }

// //gets called on init and when it is changed
// updateRooms : function(messageList){

//   app.rooms = _.chain(messageList)
//       .pluck('roomname')
//       .without('', undefined, null)
//       .union(app.rooms) //Takes multiple arrays and returns 1 array with no repeats
//       .value();


//   app.currentRoom = app.rooms[0]
// //Need to add a rooms span(?) class in the drop down
//   $('.rooms').html('');
//     $('.rooms').append('<option> Please select a room </option>');
//     $.each( app.rooms, function(i){
//       $('.rooms').append('<option value="'+ app.rooms[i] +'">' + app.rooms[i] + '</option>')

// }

//add friends ={} to top

toggleFriendship : function(){
    $('.addFriend').on('click', function(){
      var name = $(this).text();
      if (!app.friends[name]) {
      // console.log($(this).text());
        if (confirm('Do you want to add '+ name + ' as your comrade?')) {
          app.friends[name] = name;
          app.fetch(app.displayFeed, 'where', {roomname: app.currentRoom});
        }
      } else {
        if (confirm("You really don't want " + name +  " as your comrade anymore?")) {
          delete app.friends[name];
          app.fetch(app.displayFeed, 'where', {roomname: app.currentRoom});
        }
      }
    });
  };
//Change submit button type to regular button type and have it fire
 events: function () {
    $('.submitMessages').click(function () {
      console.log("clicked");
      app.addMessage();
    });

  }

//WRITE TO THE DOM

addMessage : function(message){
  app.send(message)
}

  $('.button').click(function(e){
    var message = {};
    message.text = $('.userInput').val();
    message.username = window.decodeURIComponent(window.location.search).split('=')[1];
    if ($('.newRoomName').val() === ''){
      //if user selected room from dropdown, use it
      message.roomname = $('.roomsList option:selected').text();
    } else {
      message.roomname = $('lobby');
    }
    addMessage(message);
  });


getRooms :function(data){
    var rooms = [];
    for (var i = 0; i < data.results.length; i++){
      rooms.push(data.results[i].roomname);
    }
    rooms = _.uniq(rooms);
    rooms.forEach(function(item){
      $('.roomsList').append("<option>" + item + "</option>");
    });
  };



/////////////////////////////////////////////////////////////////////
 //add a class to username
fetch : function(roomName){
    return $.ajax({
      url: app.server,
      type: 'GET',
      contentType: 'application/json',
      success: function(data) {
        getRooms(data);
        insertMessages(data, roomName);
        friendMessages();
      },

      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.log('chatterbox: Failed to send message. Error: ', data);
    });
  };

send: function(message) {
    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        //clear message and room input fields
        $('.userInput').val('');
        $('.newRoomName').val('');
        send(message.roomname);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.log('chatterbox: Failed to send message. Error: ', data);
      }
    });
  };



displayMessages :function(data, roomName) {
    $('.messages').empty();
    for (var i = 0; i < data.results.length; i++) {
       if (roomName !== undefined){
        if (data.results[i].roomname === roomName){
          $('.messages').append("<div class='message'>" +
                                  "<p><a class='userNameLink' href='#'>" + data.results[i].username + "</a></p>" +
                                  "<p class='" + data.results[i].username + "'>" + data.results[i].text + "</p>" +
                                "</div>");
        }
      }
      else {
        $('.messages').append("<div class='message'>" +
                              "<p><a class='userNameLink' href='#'>" + data.results[i].username + "</a></p>" +
                              "<p class='" + data.results[i].username + "'>" + data.results[i].text + "</p>" +
                              "</div>");
      }
    }
  };


getRooms : function(data){
    var rooms = [];
    for (var i = 0; i < data.results.length; i++){
      rooms.push(data.results[i].roomname);
    }
    rooms = _.uniq(rooms);
    rooms.forEach(function(item){
      $('.roomsList').append("<option>" + item + "</option>");
    });
  };


friendMessages : function() {
    for (var i = 0; i < friends.length; i++){
      $("." + friends[i]).css('font-weight', 'bold');
    }
  };


  $('.button').click(function(e){
    var message = {};
    message.text = $('.userInput').val();
    message.username = window.decodeURIComponent(window.location.search).split('=')[1];
    if ($('.newRoomName').val() === ''){
      //if user selected room from dropdown, use it
      message.roomname = $('.roomsList option:selected').text();
    } else {
      message.roomname = $('.newRoomName').val();
    }
    postMessage(message);
  });

  $('.roomsList').on('change', function(e){
    var room = $('.roomsList option:selected').text();
    if (room === 'New Room') {
      $('.newRoom').toggle();
    } else {
      $('.newRoom').css({display: 'none'});
    }

    send(room);
  });

  $('body').on('click', '.userNameLink', function(e){
    friends.push(this.innerText);
    friendMessages();
  });

  send();
});