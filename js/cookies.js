(function () {
  
  
  function Cookie(){
    var date = new Date();
    var argError=new ReferenceError("too few arguments");
    var typeError= new TypeError("String only");
  
    Cookie.prototype.set=function (_name, _value, _expires) {
      if(_name && _value)
        if((typeof _name) === "string")
        {
          if(_expires)
          {
            date.setTime(date.getTime() + (_expires*24*60*60*1000));
            document.cookie = encodeURIComponent(_name)+ "="+encodeURIComponent(_value) + ";" + "expires="+ date.toUTCString() + ";";
          }
          else
            document.cookie = encodeURIComponent(_name)+ "="+encodeURIComponent(_value) + ";";
        }
        else throw typeError;
      else
        throw argError; 
      
    }
  
    Cookie.prototype.get=function (_name) {
      var split = decodeURIComponent(document.cookie).split(';');
      if(_name)
        if(typeof _name == "string")
          _name=_name+"=";
        else
          throw typeError;
      else
        throw argError;
  
      for(var i = 0; i <split.length; i++) {
        var s = split[i];
        while (s.charAt(0) == ' ')
          s = s.substring(1);
        if (s.indexOf(_name) == 0)
          return s.substring(_name.length, s.length);
    }
    return null;
    }
  
    Cookie.prototype.delete=function (_name) {
      if(_name)
        document.cookie = _name+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      else
        throw argError;
  
    }
  }
  
  window.Coke= new Cookie();
})()
