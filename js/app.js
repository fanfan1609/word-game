
// FILE_CONTENT
var DATA_URL          = "docs/app.xml"; 
var ITEM_PER_ROW      = 4; // 4 buttons for per row
var button_container  = $("#button-container");
var body = $("body");
var front_word = $("#front-word");
var back_word = $("#back-word");
window.onload = function(){
  loadXMLFile(DATA_URL, createButtonFromResponse);
}

/**
 * XML file load
 */
function loadXMLFile(url, callback){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200){       
      callback(xhr);
    }
  };
  xhr.send(null);
}

function createButtonFromResponse(xhr){
  var parseObj = parser.parse(xhr.response)
  var buttons = parseObj.buttons.button;
  var i = 0;
  while(i < buttons.length){
    var row_buttons = buttons.slice(i, Math.min(i + ITEM_PER_ROW, buttons.length) );
    button_container.append(createButtonPerRow(row_buttons, i == 0));
    i += ITEM_PER_ROW;
  }
}

function createButtonPerRow(buttons, is_first){
  var html_string = `<div class="form-row ${is_first == false ? 'mt-2' : ''}">`;
  buttons.forEach(button => {
    var button_content = `<div class="col">
      <button class="btn btn-primary btn-block btn-word" onclick="handleClickButton(this)" data-front="${button.english}" data-back="${button.spanish}" data-audio="${button.audio}" >${button.english}</button>
    </div>`;
    html_string += button_content;
  });
  html_string+= `</div>`;

  return html_string;
}

function handleClickButton(e){
  var ele = $(e);
  front_word.val(ele.attr("data-front"));
  back_word.val(ele.attr("data-back"));
}





