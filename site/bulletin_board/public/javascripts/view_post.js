// UI Elements

var thumbs_up_on = $("#thumbs_up_on");
var thumbs_up_off = $("#thumbs_up_off");

/**
 * When the "Thumbs Up - ON" button is pressed, we call into application logic
 * to remove the upvote. We assume this call succeeds.
 */
thumbs_up_on.on("click", function (event) {
  thumbs_up_off.show();
  thumbs_up_on.hide();

  var id = event.originalEvent.currentTarget.getAttribute("data-postid");
  upvote(id, false);

  event.preventDefault();
});

/**
 * When the "Thumbs Up - OFF" button is pressed, we call into application logic
 * to add an upvote. We assume this call succeeds.
 */
thumbs_up_off.on("click", function (event) {
  thumbs_up_off.hide();
  thumbs_up_on.show();

  var id = event.originalEvent.currentTarget.getAttribute("data-postid");
  upvote(id, true);

  event.preventDefault();
});


var reply_button = $("#reply_button");
var post_reply = $("#post_reply");
var save_reply_button = $("#save_reply_button")
var cancel_reply_button = $("#cancel_reply_button")

reply_button.on("click", (event) => {
  post_reply.show();
  save_reply_button.show();
  cancel_reply_button.show();

})

save_reply_button.on("click", (event) => {
  var reply = post_reply.val();
  var id = event.originalEvent.currentTarget.getAttribute("data-postid");

  // Hide any previous error

  save_reply(id, { reply: reply }, function (result) {
    if (result.success) {
      document.location = result.redirect_uri;
    } else {
      profile_error_message.text(result.error_message);
      profile_error.show();
    }
  });
  event.preventDefault();
})

