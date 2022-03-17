// $(document).ready(function() {
//   $("textarea").on("input", function(){
//     console.log("Hello");
//   });
// });

// $(document).ready(function() {
//   $("textarea").on("input", function(){
//     console.log(this);
//   });
// });

$(document).ready(function() {
   $('textarea').on('input', function() {
     let tweetLength = $(this).val().length; //Prints to the console a number, the length of the input in the text area
 
  console.log(tweetLength);

   });
 
 });