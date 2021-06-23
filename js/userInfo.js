var allComments=[];
var allFav=[];
var wishList = document.getElementById("wishList");
var comment = document.getElementById("comments");
var favCounter=Number(Coke.get("fav_counter"));
var commentCounter;
var user = Coke.get("username");
document.getElementById("user").innerHTML = user;

function display()
{
    var temp ='';
    for(var i = 0; i< allFav.length; i++)
    {
        temp +='<div id="'+allFav[i].id+'" class="img-container3"><img src="https://image.tmdb.org/t/p/w500'+allFav[i].src+'" style="width:100%;border-radius: 15px;display: block;"><div class="overlay"><div class="text"><h4 class="name">'+allFav[i].movie+'</h4><p>movie info</p></div><input  onclick="deleteMovie('+i+')" type="button" name="delete" value="remove" id="rmvbtn"></div></div>'
    }
    wishList.innerHTML = temp;
}

function comments() {
    var temp = '';
    for(var i=0; i<allComments.length;i++)
    {
        temp+='<div id="'+allComments[i].id+'" class="commentsec"><h2>'+allComments[i].movie+':</h2><br><p>'+allComments[i].comment+'</p></div>';
    }
    comment.innerHTML =temp;
}

function deleteMovie(index) {
    allFav.splice(index, 1);
    Coke.delete("fav"+(index+1));
    for(var i =0; i<favCounter; i++)
    {
      if(i<allFav.length)
      Coke.set("fav"+(i+1),allFav[i].id+"+"+allFav[i].movie+"+"+allFav[i].src);
      else
      Coke.delete("fav"+(i+1));
    }
    if(favCounter >0)
    {
      favCounter--;
      Coke.set("fav_counter",favCounter);
    }
    display();
}

function getComments() {
  commentCounter = Number(Coke.get("comment_counter"));
  for(var i=1; i<=commentCounter; i++)
  {
    var split = Coke.get("comment"+i).split("+");
    allComments.push({id: split[0], movie:split[1], comment: split[2]});
  }
  comments();
}

getComments();

function getWish() {
  
  for(var i=1; i<=favCounter; i++)
  {
    if(Coke.get("fav"+i) != null)
    {
    var split = Coke.get("fav"+i).split("+");
    allFav.push({id: split[0], movie:split[1], src:split[2]});
    }
  }
  display();
}

getWish();