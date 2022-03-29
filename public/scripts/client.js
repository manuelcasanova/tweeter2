/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() { 

  $('.error').empty().slideUp(); 
  $(".new-tweet").slideUp(); 
  $(".round-button").hide(); 

  $(document).scroll(function() {
  if ($(window).scrollTop() === 0) {
    $(".round-button").hide();
    $("textarea").focus() 
  } else {
    $(".round-button").show();
  }
});

$(".round-button").click( function (){
  $("html, body").animate({ scrollTop: 0 }, "slow");
  $(".new-tweet").slideDown();
}) 

$('.arrows').click( function () {
  $(".new-tweet").slideDown() 
  $("textarea").focus()
});

  const tweetsObject = [
  ]

//Escape function to escape text. Used to avoid an XSS attack

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  //Function renderTweets takes an array of tweet objects and appends each to the tweets in index
  const renderTweets = function(tweets) {  
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('section.tweets').prepend($tweet); //Inserts content, specified by the parameter, to the end of each element in the set of matched elements. Inserts function createTweetElement(tweet) in section.tweets.
    }
    $(".time_ago").timeago();
  };

  //Function createTweetElement takes in a tweet object and returns tweet article element with the html of the tweet.

  const createTweetElement = function(tweet) { 
    const $tweet = $("<article>").addClass("tweet");
    const createdAt = new Date(tweet.created_at);
    const html = `
          <header>
              <img src= ${tweet.user.avatars}>
              <h4>${tweet.user.name}</h4>
              <p>${tweet.user.handle}</p>
          </header>
          <p>${escape(tweet.content.text)}</p>
          <footer>
          
            <time class="time_ago" datetime="${createdAt.toISOString()}">
            ${tweet.created_at}</time>
            <h4>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
            </h4>
          </footer>
          `;
    $tweet.append(html); 
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
        return $.get("/tweets")
      })
      .then (function (responseTweets) {
        const latestTweet = [responseTweets[responseTweets.length - 1]];
        renderTweets(latestTweet);
      })
          //When submitting empties the textarea and focuses on it
      .then ($('#tweet-text').val('').trigger("input").focus()); 
    }
  })
});
