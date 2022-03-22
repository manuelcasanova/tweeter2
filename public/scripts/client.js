
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() { //.ready when the DOM is fully loaded, run the function

  const tweetsObject = [
  ]

//Escape function to escape text. Used to avoid an XSS attack

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const renderTweets = function(tweets) { //Called on line 65. Takes array of tweet object and appends each to the tweets in index
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('section.tweets').prepend($tweet); //Inserts content, specified by the parameter, to the end of each element in the set of matched elements. Inserts function createTweetElement(tweet) in section.tweets.
    }
  };

  const createTweetElement = function(tweet) { //Takes tweet object and returns tweet article element with the html of the tweet.
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

  const load = function () {
    $.ajax('/tweets', { method: 'GET' })
    .then(function (tweets) {
      renderTweets(tweets);
    })
  }

  load();

  $('.new-tweet form').submit( function (event) {
    event.preventDefault(); //Prevent the default action (submit) 
    
    const $form = $(this);

    const newTweet = $form.children("textarea").val(); //What is written in the new tweet form
    console.log(newTweet);
    if (!newTweet) {
      $(".new-tweet p").append("Error: tweet cannot be empty") 
      //return alert("Error: tweet cannot be empty");    
    } else if (newTweet.length > 140) {
      $(".new-tweet p").append("Error: tweet cannot exceed 140 characters") 
      //return alert("Error: tweet cannot exceed 140 characters");
    } 

    const tweet = $form.serialize() //Turns a set of form data into a query String
    $.ajax({ url: "/tweets/", method: 'POST', data: tweet })

    .then (function () {
      //return $.ajax('/tweets', { method: 'GET' })
      return $.get("/tweets")
    })
    .then (function (responseTweets) {
      const latestTweet = [responseTweets[responseTweets.length - 1]];
      renderTweets(latestTweet);
    })
  })
});