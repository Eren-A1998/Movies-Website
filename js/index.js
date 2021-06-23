var movieReq = new XMLHttpRequest();
var req = new XMLHttpRequest();
var data = [];
var choice, user, userLength, movieID;
var display = document.getElementById("display");
var username = document.getElementById("userName");
var userpass = document.getElementById("password");
var sub = document.getElementById("send");
var but = document.querySelector('#search');
var input_val = document.getElementById('inputvalue');
var url = 'https://api.themoviedb.org/3/search/movie?api_key=c1c44f2054be7f2a3bf33fd7af96fa6c&page=1';
var flag = 1;

if (Coke.get("logged_in") != null) {
  $("#login").hide();
  $("#profile").css("display", "inline");
  $("#logout").css("display", "inline");
}

// set initial value for the request 
if (Coke.get("choice") != null)
  choice = Coke.get("choice");
else
  choice = "movie/now_playing";

// redirect to login form 
function logIn() {
  $(".lay").css("display", "block");
}

function logOut() {
  Coke.delete("logged_in");
  window.location.reload();
}

function cancel(){
  $(".lay").css("display", "none");
}

// display the data in html page
function displayMovies() {
  display.innerHTML = "";
  for (var i = 0; i < data.length; i++) {
    {
      var movie = document.createElement("div");
      var img = document.createElement("img");
      var content = document.createElement("div");
      var txtCont = document.createElement("div");
      var head = document.createElement("h4");
      var nm = document.createTextNode(data[i].original_title);
      var par = document.createElement("p");
      var desc = document.createTextNode(data[i].vote_average);

      movie.setAttribute("id", data[i].id);
      movie.classList.add("img-container");
      movie.addEventListener("click", function () {
        movieID = this.getAttribute("id");
        Coke.set("movie_ID", movieID, 365);
        window.location.href = "movieDetails.html";
      });
      if (data[i].poster_path != null)
        img.setAttribute("src", "https://image.tmdb.org/t/p/w500" + data[i].poster_path);
      else
        img.setAttribute("src", "assets/unnamed.jpg");
      content.classList.add("overlay");
      txtCont.classList.add("text");
      head.appendChild(nm);
      par.appendChild(desc);
      txtCont.appendChild(head);
      txtCont.appendChild(par);
      content.appendChild(txtCont);
      movie.appendChild(img);
      movie.appendChild(content);
      display.appendChild(movie);
    }
  }
}

// make request with initial value then change request with each choice
function getChoice(_choice) {
  movieReq.open(
    "GET",
    "https://api.themoviedb.org/3/" + _choice + "?api_key=8b1eee196752d07538b04497121e46e5&language=en-US&page=1"
  );
  movieReq.send();
  movieReq.onreadystatechange = function () {
    if (movieReq.readyState == 4 && movieReq.status == 200) {
      data = JSON.parse(movieReq.response).results;
      displayMovies();
    }
  };
}

getChoice(choice);

but.onclick = function (event) {
  event.preventDefault();
  var value = input_val.value;
  var newurl = url + '&query=' + value;
  movieReq.open("GET", newurl);
  movieReq.send();
  movieReq.onreadystatechange = function () {
    if (movieReq.readyState == 4 && movieReq.status == 200) {
      data = JSON.parse(movieReq.response).results;
      displayMovies();
    }
  }
}

function searchmovie(str) {

display.innerHTML = "";
  for (let i = 0; i < data.length; i++) {

    if (data[i].original_title.toLowerCase().includes(str.toLowerCase())) {

      var movie = document.createElement("div");
      var img = document.createElement("img");
      var content = document.createElement("div");
      var txtCont = document.createElement("div");
      var head = document.createElement("h4");
      var nm = document.createTextNode(data[i].original_title);
      var par = document.createElement("p");
      var desc = document.createTextNode(data[i].vote_average);

      movie.setAttribute("id", data[i].id);
      movie.classList.add("img-container");
      movie.addEventListener("click", function () {
        movieID = this.getAttribute("id");
        Coke.set("movie_ID", movieID, 365);
        window.location.href = "movieDetails.html";
      });
      if (data[i].poster_path != null)
        img.setAttribute("src", "https://image.tmdb.org/t/p/w500" + data[i].poster_path);
      else
        img.setAttribute("src", "assets/unnamed.jpg");
      content.classList.add("overlay");
      txtCont.classList.add("text");
      head.appendChild(nm);
      par.appendChild(desc);
      txtCont.appendChild(head);
      txtCont.appendChild(par);
      content.appendChild(txtCont);
      movie.appendChild(img);
      movie.appendChild(content);
      display.appendChild(movie);
  }
}
}

///////////////////////////

function checkUser() {
  for (var i = 0; i < userLength && flag; i++)
    if (username.value == users[i].name && userpass.value == users[i].pass) {
      Coke.set("logged_in", "true");
      Coke.set("username",username.value);
      flag = 0;
      window.location.reload();
    }
}


req.open("GET", "../users.json");
req.send();
req.onreadystatechange = function () {
  if (req.readyState == 4 && req.status == 200) {
    users = JSON.parse(req.response).users;
    userLength = JSON.parse(req.response).usersLength;
  }
}

$(document).ready(function(){
  $("#real").click(function(){
    $(".real-time").fadeToggle();
  });
});


