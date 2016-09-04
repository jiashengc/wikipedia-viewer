$(document).ready(function() {
  
  var link;
  
  $('#ifl').click(function() {
    window.location.href = "https://en.wikipedia.org/wiki/Special:Random";
  });

  $("#search").keypress(function(event) {
    if (event.which == 13) {
      var user_input = $(this).val();
      $(this).val("");
      
      searching(user_input);
    }
  });

  function searching(input) {
    link = "http://en.wikipedia.org/w/api.php?action=opensearch&format=json&limit=30&search=" + input;

    $.ajax({
      url: link,
      jsonp: "callback",
      dataType: "jsonp",
      success: function(data) {

        $("#wiki-content").empty();

        for (var i = 0; i < data[1].length; i += 1) {
          var string = "<div class='entity'><a href='" + data[3][i] + "'><h2>" + data[1][i] + "</h2></a><p>" + data[2][i] + "</p></div><div class='seperator'></div>";
          
          console.log("Name: " + data[1][i]);
          console.log("Link: " + data[3][i]);
          console.log("Desc: " + data[2][i]);
          console.log("String: " + string);
          
          $('#wiki-content').append(string);
        }
      }
    });
  } // end of search()

});