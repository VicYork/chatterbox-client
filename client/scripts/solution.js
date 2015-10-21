var app;

$(function () {

  app = {
    server: "https://api.parse.com/1/classes/chatterbox",
    username: 'anonymous',
    room: 'lobby',
    friends: {},


    init: function () {
      app.username = window.location.search.substr(10);

      app.$main = $('#main');
      app.$chats = $('#chats');
      app.$roomSelect = $('#roomSelect');
      app.$send = $('#send');
      app.$roomSelect.on('change', app.saveRoom);
      app.$send.on('submit', app.handleSubmit);

      app.fetch();
      setInterval(app.fetch, 3000);
    },

    send: function (data) {
      $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: 'https://api.parse.com/1/classes/chatterbox',
        type: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (message) {
          app.fetch();
          console.log("message we're sending to parse " + data)

        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message. Error: ', data);
        }
      });
    },

    saveRoom: function (evt) {
      var selectIndex = app.$roomSelect.prop('selectedIndex');

      if (selectIndex === 0) {
        var roomname = prompt('Enter room name');

        if (roomname) {
          app.room = roomname;
          app.addRoom(roomname);

          app.$roomSelect.val(roomname);
          app.fetch();
        }

      } else {
        app.room = app.$roomSelect.val();
        app.fetch();
      }
    },

    fetch: function () {
      $.ajax({


        // This is the url you should use to communicate with the parse API server.
        url: app.server,
        type: 'GET',
        //data: JSON.stringify(message),
        contentType: 'application/json',
        data: {order: 'createdAt'},
        success: function (data) {
          app.populateRooms(data.results);

          app.populateMessages(data.results);


          // app.displayMessages(data, data.roomname);
          // app.friendMessage();
          console.log('chatterbox: Message sent. Data: ', data);

        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.log('chatterbox: Failed to send message. Error: ', data);
        }
      });
    },//fetch

    populateRooms: function (results) {
      app.$roomSelect.html('<option value="__newRoom">New Room..</option><option value="lobby" selected>Lobby</option>');
      if (results) {
        var processedRooms = {};
        results.forEach(function (data) {
          var roomname = data.roomname;
          if (roomname && !processedRooms[roomname]) {
            app.addRoom(roomname);
            processedRooms[roomname] = true;
          }
        })
      }
      app.$roomSelect.val(app.room);
    },//populate rooms

    populateMessages: function (results) {
      app.clearMessages();

      if (Array.isArray(results)) {
        results.forEach(app.addMessage);
      }
    },

    clearMessages: function () {
      app.$chats.html('');
    },

    addMessage: function (data) {
      if (!data.roomname) {
        data.roomname = 'lobby';
      }

      if (data.roomname === app.room) {
        var $chats = $('<div class="chats" />');

        var $username = $('<span class="username" />');
        $username.text(data.username + ': ')
          .attr('data-username', data.username)
          .attr('data-roomname', data.roomname)
          .appendTo($chats);

        if (app.friends[data.username] === true) {
          $username.addClass('friend')
        }

        var $message = $('<br /><span />');
        $message.text(data.text)
          .appendTo($chats);

        app.$chats.append($chats);
      }

    },//addMessage


    addRoom: function (roomname) {
      var $option = $('<option />').val(roomname).text(roomname);
      app.$roomSelect.append($option);
    },

    addFriend: function (evt) {
      var username = $(evt.currentTarget).attr('data-username');
      if (username !== undefined) {
        console.log('addfriend')
      }
      app.friends[username] = true;

      var selector = '[data-username"' + username.replace(/"/g, '\\\"') + '")';

      $(selector).addClass('friend');

    },

    handleSubmit: function (evt) {
      evt.preventDefault();

      var message = {
        username: app.username,
        roomname: app.room || 'lobby',
        text: app.$message.val()
      };

      app.send(message);
    }
  };
});

//app.init();