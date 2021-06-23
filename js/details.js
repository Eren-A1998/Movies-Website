var id = Coke.get("movie_ID");
var flag = 1;
var movieDet = new XMLHttpRequest();
var movieTrail, details, cast, commentCounter, favCounter;
var comment = document.getElementById("comment");
var display = document.getElementById("display");
var actors = document.getElementById("actors");


// check if looged in or not to hide and show certain elements 
function checkLog(){
if(Coke.get("logged_in") != null)
{
  $("#login").hide();
  $("#profile").css("display", "inline");
  $("#logout").css("display","inline");
  $("#commentsec").css("display","block");
  $("#addFav").addClass("links");
}
}

// login
function logIn() {
  $(".lay").css("display","block");
}

// logout
function logOut() {
  Coke.delete("logged_in");
  window.location.reload();
}

function cancel(){
  $(".lay").css("display", "none");
}

// put choice in cookie then redirect to main page and use this choice to make request 
function getChoice(_choice) {
  Coke.set("choice",_choice);
  window.location.href = "index.html";
}

// generate the trailer link
function getTrail() {
    for(var i=0; flag ; i++)
    {
        if(movieTrail[i].name.toLowerCase().includes("official") && movieTrail[i].type == "Trailer")
        {
            movieTrail ="https://www.youtube.com/watch?v="+movieTrail[i].key;
            flag = 0;
        }
    }
    
}

function displayDetails() {
  var temp ='<div id="cont"><img  id="bgimg" src="https://image.tmdb.org/t/p/w500'+details.backdrop_path+'"><div id="overlay"><div id="movinfo"><div id="content"><h1>'+details.original_title+'</h1><div class="inln"><div id="usrrate">'+details.vote_average+'</div><div class="links1 links"><a href="'+movieTrail+'">play trailer</a></div><div id="addFav" class="links1" onclick="addToWish()" ><a>add to watchlist</a></div></div><h4>overview</h4><p>'+details.overview+'</p></div><img id="poster" src="https://image.tmdb.org/t/p/w500'+details.poster_path+'"></div></div>';
  display.innerHTML = temp;
  checkLog();
  var actor='';
  for(var i=0; i<cast.length; i++)
  {
  actor +='<li id="'+cast[i].credit_id+'" class="img-container1"><img src="https://image.tmdb.org/t/p/w500/'+cast[i].profile_path+'" style="height: 213px; border-top-right-radius: 15px;border-top-left-radius: 15px;display: block;"><div class="txt"><h5>'+cast[i].name+'</h5><p>as</p><h5>'+cast[i].character+'</h5></div></li>';
  }
  actors.innerHTML = actor;
}

// get the cast for certain movie
function castReq() {
  movieDet.open(
    "GET",
    "https://api.themoviedb.org/3/movie/"+id+"/credits?api_key=8b1eee196752d07538b04497121e46e5&language=en-US"
  );
  movieDet.send();
  movieDet.onreadystatechange = function() {
    if (movieDet.readyState == 4 && movieDet.status == 200) {
        cast = JSON.parse(movieDet.response).cast;
        displayDetails();
    }
  };
}

// get all trailers for certain movie
function trailReq() {
  movieDet.open(
    "GET",
    "https://api.themoviedb.org/3/movie/"+id+"/videos?api_key=8b1eee196752d07538b04497121e46e5&language=en-US"
  );
  movieDet.send();
  movieDet.onreadystatechange = function() {
    if (movieDet.readyState == 4 && movieDet.status == 200) {
        movieTrail = JSON.parse(movieDet.response).results;
        getTrail();
        castReq();
    }
  };
}

// get info of certain movie
movieDet.open(
    "GET",
    "https://api.themoviedb.org/3/movie/"+id+"?api_key=8b1eee196752d07538b04497121e46e5&language=en-US"
  );
  movieDet.send();
  movieDet.onreadystatechange = function() {
    if (movieDet.readyState == 4 && movieDet.status == 200) {
        details = JSON.parse(movieDet.response);
        trailReq();
    }
  };

// add Comment
function addComment() {
  if(Coke.get("comment_counter") != null)
    commentCounter = Number(Coke.get("comment_counter"));
  else
    commentCounter = 0;
  commentCounter++;
  Coke.set("comment_counter",commentCounter);
  Coke.set("comment"+commentCounter, id+"+"+details.original_title+"+"+ comment.value);
}

// add to favorite 
function addToWish() {
  if(Coke.get("fav_counter") != null)
  favCounter = Number(Coke.get("fav_counter"));
else
  favCounter = 0;
favCounter++;
Coke.set("fav_counter",favCounter);
Coke.set("fav"+favCounter, id+"+"+details.original_title+"+"+details.poster_path);
$("#addFav").removeClass("links");
}

//////////////////

var username = document.getElementById("userName");
var userpass =document.getElementById("password");
var sub = document.getElementById("send");
var req = new XMLHttpRequest();
var user,userLength;
var loop = 1;

function checkUser() {
    for(var i=0; i<userLength && loop; i++)
    if(username.value == users[i].name && userpass.value == users[i].pass)
    {
        Coke.set("logged_in","true");
        Coke.set("username",username.value);
        loop =0;
        window.location.reload();
    }
}

req.open("GET", "../users.json");
req.send();
req.onreadystatechange = function () {
    if(req.readyState == 4 && req.status == 200)
    {
        users = JSON.parse(req.response).users
        userLength = JSON.parse(req.response).usersLength;
    }
}

