var $ = window.$;
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").then(function() {
    console.log("Service Worker Registered");
  });
}
function route(url) {
  var map = {
    // Single Products page.
    "": function() {
      $(".shell .title").html("Shell");
      $(".shell .data").html("Welcome!");
    },
    "#link1": function() {
      $(".shell .title").html("Users");
      return fetch("https://api.randomuser.me/?nat=US&results=3", {
        method: "GET"
      })
        .then(function(response) {
          console.log(response);
          if (!response.ok) {
            throw new Error("Bad status code from server.");
          }
          return response.json();
        })
        .then(function(responseData) {
          if (!responseData.results) {
            console.log(responseData);
            throw new Error("Bad response from server.");
          }
          return responseData.results;
        })
        .then(function(json) {
          $(".shell .data").html('');
          console.log(json);
          $.each(json, function(key, person) {
            var data = '<div className="member">';
            data += '<img src="' + person.picture.thumbnail + '" alt="" />';
            data +=
              "<h3>Name: " +
              person.name.first +
              " " +
              person.name.last +
              "</h3>";
            data +=
              "<p>Location: " +
              person.location.city +
              ", " +
              person.location.state +
              "</p>";
            data += "</div> <hr/>";

            $(".shell .data").append(data);
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  // Execute the needed function depending on the url keyword (stored in temp).
  if (map[url]) {
    map[url]();
  } else {
    // If the keyword isn't listed in the above - render the error page.
    alert("no");
  }
}
route(decodeURI(window.location.hash));

$(window).on("hashchange", function() {
  // On every hash change the render function is called with the new hash
  // This is how the navigation of our app happens.

  route(decodeURI(window.location.hash));
});
