
var password_form = $("#password_form");
var change_password_button = $("#change_password_button");
var cancle_change_password_button = $("#cancle_change_password_button")
var newpassword_input = $("#newpassword_input");
var confirmepassword_input = $("#confirmepassword_input");
var password_error = $("#password_error");
var password_button_error_message = $("#password_button_error_message");




password_form.submit((event) => {
  var new_password = newpassword_input.val();
  var confirme_password = confirmepassword_input.val();


  if (new_password != confirme_password) {
    password_button_error_message.text("Passwords do not match!");
    password_error.show();
  } else {
    password_error.hide();
    changePassword(new_password, (result) => {
      if (result.success) {
        document.location = result.redirect_uri;
      } else {
        create_user_error_message.text(result.error_message);
        create_user_error.show();
      }
    });
  }

  event.preventDefault();
});

cancle_change_password_button.on("click", (event) => {
  document.location = document.referrer;
}
);