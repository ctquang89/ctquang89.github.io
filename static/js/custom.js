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

  // toggle view;
  var list_view = true;
  $('.toggle-view').click(function() {
    alert('aa');
    list_view = !list_view;
    if (list_view) {
      $("#list-visible").show();
      $("#grid-visible").hide();
    } else {
      $("#list-visible").hide();
      $("#grid-visible").show();
    }
  });

  alert("aa");
  

})(jQuery); // End of use strict

