/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() { //.ready when the DOM is fully loaded, run the function

  const tweetsObject = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = function(tweets) { //Called on line 65. Takes array of tweet object and appends each to the tweets in index
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('section.tweets').append($tweet); //Inserts content, specified by the parameter, to the end of each element in the set of matched elements. Inserts function createTweetElement(tweet) in section.tweets.
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
          <p>${tweet.content.text}</p>
          <footer>
            <p>${tweet["created_at"]}</p>
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


});