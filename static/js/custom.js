(function($) {
  // Get the elements with class="column"
  var elements = document.getElementsByClassName("column");

  // Declare a "loop" variable
  var i;

  // Three images side by side
  $('.three-trigger').click(function() {
    for (i = 0; i < elements.length; i++) {
      elements[i].style.flex = "33.33%";
      elements[i].style.width = "33.33%";
    }
  });

  // Four images side by side
  $('.four-trigger').click(function() {
    for (i = 0; i < elements.length; i++) {
      elements[i].style.flex = "25%";
      elements[i].style.width = "25%";
    }
  });


})(jQuery); // End of use strict
