// UI Elements

var profile_form = $("#profile_form");
var profile_firstname = $("#profile_firstname");
var profile_lastname = $("#profile_lastname");
var profile__username = $("#profile__username");
var profile__briefBio = $("#profile__briefBio");
var profile__birthday = $("#profile__birthday");
var save_profile_button = $("#save_profile_button");
var profile_error_message = $("#profile_error_message");
var profile_error = $("#profile_error");

/**
 * When the "Create Post" form is submitted we call into our application logic
 * to create the post, and then we either redirect the user to their new post
 * or we show them an error.
 */
profile_form.submit((event) => {
  console.log("submit");
  var userInfo = {
    firstname: profile_firstname.val(),
    lastname: profile_lastname.val(),
    briefBio: profile__briefBio.val(),
    birthday: profile__birthday.val(),
  };

  // Hide any previous error
  profile_error.hide();

  edite_profile(userInfo, function (result) {
    if (result.success) {
      document.location = result.redirect_uri;
    } else {
      profile_error_message.text(result.error_message);
      profile_error.show();
    }
  });
  event.preventDefault();
});
