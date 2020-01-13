
// Empty JS for your own code to be here
var x = new XMLHttpRequest();
x.open("GET", "http://localhost/word-card/docs/app.xml", true);
x.onreadystatechange = function () {
  if (x.readyState == 4 && x.status == 200)
  {

    console.log(x);
    var jsonObj = xmlToJSON.parseString(x.response); // Convert XML to JSON
    console.log(jsonObj);
  }
};
x.send(null);