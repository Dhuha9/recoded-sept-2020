// Posts

/**
 * Creates a new Post on the website with the given title and message.
 *
 * The callback takes a single parameter:
 * {
 *   success: boolean,
 *   redirect_uri: string,
 *   error_message: string
 * }
 * redirect_uri will always be defined when success is true.
 * error_message will always be defined when success is false.
 * redirect_uri must only be used when success is true.
 */
function create_post(title, message, callback) {
  var post = {
    title: title,
    message: message,
  };

  $.ajax({
    type: "POST",
    url: "/posts/",
    data: JSON.stringify(post),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (result) {
      callback({
        success: true,
        redirect_uri: result.redirect_uri,
      });
    },
    error: function (error) {
      callback({
        success: false,
        redirect_uri: null,
        error_message: error.responseJSON.error_message,
      });
    },
  });
}

/**
 * Either upvotes or removes an upvote for the currently logged in user for the
 * Post whose id was passed.
 *
 * There is no callback for this function - the website will assume it was
 * successful.
 */
function upvote(id, state) {
  var vote = {
    upvoted: state,
  };

  $.ajax({
    type: "POST",
    url: "/posts/" + id + "/upvotes",
    data: JSON.stringify(vote),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
  });
}

// Users

/**
 * Creates a new User on the website with the given username and password.
 *
 * The callback takes a single parameter:
 * {
 *   success: boolean,
 *   redirect_uri: string,
 *   error_message: string
 * }
 * redirect_uri will always be defined when success is true.
 * error_message will always be defined when success is false.
 * redirect_uri must only be used when success is true.
 */
function signup(username, password, callback) {
  var credentials = {
    username: username,
    password: password,
  };

  $.ajax({
    type: "POST",
    url: "/users/",
    data: JSON.stringify(credentials),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (result) {
      callback({
        success: true,
        redirect_uri: result.redirect_uri,
      });
    },
    error: function (error) {
      callback({
        success: false,
        redirect_uri: null,
        error_message: error.responseJSON.error_message,
      });
    },
  });
}

/**
 * Signs the user into the website with the given username and password.
 *
 * The callback takes a single parameter:
 * {
 *   success: boolean,
 *   redirect_uri: string,
 *   error_message: string
 * }
 * redirect_uri will always be defined when success is true.
 * error_message will always be defined when success is false.
 * redirect_uri must only be used when success is true.
 */
function login(username, password, callback) {
  var credentials = {
    username: username,
    password: password,
  };

  $.ajax({
    type: "POST",
    url: "/users/login",
    data: JSON.stringify(credentials),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (result) {
      callback({
        success: true,
        redirect_uri: result.redirect_uri,
      });
    },
    error: function (error) {
      callback({
        success: false,
        redirect_uri: null,
        error_message: error.responseJSON.error_message,
      });
    },
  });
}

function edite_profile(userInfo, callback) {
  $.ajax({
    type: "POST",
    url: "/users/profile/save",
    data: JSON.stringify(userInfo),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (result) {
      callback({
        success: true,
        redirect_uri: result.redirect_uri,
      });
    },
    error: function (error) {
      callback({
        success: false,
        redirect_uri: null,
        error_message: error.responseJSON.error_message,
      });
    },
  });
}

function save_reply(id, reply, callback) {
  $.ajax({
    type: "POST",
    url: "/posts/" + id + "/reply",
    data: JSON.stringify(reply),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (result) {
      callback({
        success: true,
        redirect_uri: result.redirect_uri,
      });
    },
    error: function (error) {
      callback({
        success: false,
        redirect_uri: null,
        error_message: error.responseJSON.error_message,
      });
    },
  });
}

function changePassword(passwordInfo, callback) {

  $.ajax({
    type: "POST",
    url: "/users/change",
    data: JSON.stringify(passwordInfo),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (result) {
      callback({
        success: true,
        redirect_uri: result.redirect_uri,
      });
    },
    error: function (error) {
      callback({
        success: false,
        redirect_uri: null,
        error_message: error.responseJSON.error_message,
      });
    },
  });
}