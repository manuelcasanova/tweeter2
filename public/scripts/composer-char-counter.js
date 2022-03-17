// $(document).ready(function() {
//    $('textarea').on('input', function() {
//      let tweetLength = $(this).val().length; //Prints to the console a number, the length of the input in the text area
 
//   console.log(tweetLength);

//    });
 
//  });

$(document).ready(function () {
  // --- our code goes here ---
  $("#tweet-text").on("input", function (event) {
    const maxLength = 140;
    let tweet = event.target.value;
    let remCharacters = maxLength - tweet.length;
    //console.log(tweet);
    $(".counter").text(remCharacters);
    if (remCharacters < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "black");
    }
  });
});


