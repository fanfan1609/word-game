
// FILE_CONTENT
var DATA_FILE = "http://localhost/word-card/docs/app.xml"; 
var ITEM_PER_ROW = 4; // 4 buttons for per row

$(function(){
  // load content from file
  loadContentFromFile();

  
})


/**
 * Read content from file
 */
function loadContentFromFile(){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", DATA_FILE, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200)
    {       
      var parseObj = parser.parse(xhr.response)
      console.log(parseObj);
    }
  };
  xhr.send(null);
}




