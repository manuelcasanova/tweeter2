$(document).ready(function () {
  $("#tweet-text").on("input", function (event) {
    const maxLength = 140;
    let tweet = event.target.value;
    let remCharacters = maxLength - tweet.length;
    $(".counter").text(remCharacters);
    if (remCharacters < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "black");
    }
  });
});


