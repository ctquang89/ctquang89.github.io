(function($) {
  // Get the elements with class="column"
  var elements = document.getElementsByClassName("column");

  // Declare a "loop" variable
  var i;

  // Two images side by side
  $('.two-trigger').click(function() {
    for (i = 0; i < elements.length; i++) {
      elements[i].style.flex = "50%";
    }
  });

  // Two images side by side
  $('.three-trigger').click(function() {
    for (i = 0; i < elements.length; i++) {
      elements[i].style.flex = "33.33%";
    }
  });

  // Four images side by side
  $('.four-trigger').click(function() {
    for (i = 0; i < elements.length; i++) {
      elements[i].style.flex = "25%";
    }
  });


})(jQuery); // End of use strict
