
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() { //.ready when the DOM is fully loaded, run the function

  $('.error').empty().slideUp(); 
  //Solved the issue with showing the border of the error when uploading the page

  const tweetsObject = [
  ]

//Escape function to escape text. Used to avoid an XSS attack

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  //Function renderTweets takes an array of tweet objects and appends each to the tweets in index
  const renderTweets = function(tweets) { //Called on line 65. 
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('section.tweets').prepend($tweet); //Inserts content, specified by the parameter, to the end of each element in the set of matched elements. Inserts function createTweetElement(tweet) in section.tweets.
    }
  };


  //Function createTweetElement takes in a tweet object and returns tweet article element with the html of the tweet.

  const createTweetElement = function(tweet) { 
    const $tweet = $("<article>").addClass("tweet"); //Adds the specified class(es) to each element in the set of matched elements.

    const html = `
          <header>
              <img src= ${tweet.user.avatars}>
              <h4>${tweet.user.name}</h4>
              <p>${tweet.user.handle}</p>
          </header>
          <p>${escape(tweet.content.text)}</p>
          <footer>
            <p>${timeago.format(tweet["created_at"])}</p>
            <h4>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
            </h4>
          </footer>
          `;

    $tweet.append(html); //Inserts content, specified by the parameter, to the end of each element in the set of matched elements.
    return $tweet;
  };

  renderTweets(tweetsObject);

// Function loadTweets  fetchs the tweets from http://localhost:8080/tweets

  const loadTweets = function () {
    $.ajax('/tweets', { method: 'GET' })
    .then(function (tweets) {
      renderTweets(tweets);
    })
  }

  loadTweets();

  $('.new-tweet form').submit( function (event) {
    event.preventDefault(); //Prevent the default action (does not refresh) 
    $('.error').empty().slideUp();
    const $form = $(this);
    // const newTweet = $("textarea")
    const newTweet = $form.children("textarea").val(); //What is written in the new tweet form. Without .val it just references the dom object.
    if (!newTweet) {
      $(".error").append("Error: tweet cannot be empty")    
      $('.error').slideDown();
    } else if (newTweet.length > 140) {
      $(".error").append("Error: tweet cannot exceed 140 characters") 
      $('.error').slideDown();
    } else {
      $('.error').slideUp();
      $.ajax({ url: "/tweets/", method: 'POST', data: $form.serialize() }) //.serialize() Encode a set of form elements as a string for submission. Creates a text string in standard URL-encoded notation. It can act on a jQuery. FORM -> OBJECT -> STRING
  
      .then (function () {
        return $.get("/tweets") //alternative: return $.ajax('/tweets', { method: 'GET' })
      })
      .then (function (responseTweets) {
        const latestTweet = [responseTweets[responseTweets.length - 1]];
        renderTweets(latestTweet);
      })
    }
  })
});