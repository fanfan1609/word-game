
// FILE_CONTENT
var DATA_URL          = "docs/app.xml"; // XML URL
var ITEM_PER_ROW      = 4;              // Buttons for per row
var soundDirectory    = "";             // Sound directory

// Define HTML element
var body              = $("body");
var button_container  = $("#button-container");
var front_word        = $("#front-word");
var back_word         = $("#back-word");
var audio_element     = $("#sound-play");
var replay_button     = $("#replay-button");
var sound_animation   = $("#sound-animation");

// Define sound play class
var sound_playing_class = "sound-playing";

// Onload Event Listener
window.onload = function(){
  readXMLFile(DATA_URL, extractDataFromResponse);
}

$(function(){
  // Replay button click event
  replay_button.on("click", function(){
    if(audio_element.attr("src")){
      audio_element[0].play();
    }
  });

  audio_element
    .on("playing", function(){
      sound_animation.addClass(sound_playing_class);
    })
    .on("ended", function(){
      sound_animation.removeClass(sound_playing_class);
    })
    

})

/**
 * XML file load
 */
function readXMLFile(url, callback){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200){
      callback(xhr.response);
    }
  };
  xhr.send(null);
}

/**
 * Extract data from response
 * @param {xhr response} response 
 */
function extractDataFromResponse(response){
  // parse XML text to Array
  var parseObj = parser.parse(response);

  // Set sound directory
  soundDirectory = parseObj.soundsDirectory;

  // Create buttons
  createButtonFromResponse(parseObj.buttons.button);
}

/**
 * Generate button from 
 * @param buttons 
 */
function createButtonFromResponse(buttons){
  var i = 0;
  while(i < buttons.length){
    var row_buttons = buttons.slice(i, Math.min(i + ITEM_PER_ROW, buttons.length) );
    button_container.append(createButtonPerRow(row_buttons, i == 0));
    i += ITEM_PER_ROW;
  }
}

/**
 * Generate Buttons per row
 * @param  buttons  List button per row
 * @param  is_first The Row is first or not
 */
function createButtonPerRow(buttons, is_first){
  var html_string = `<div class="form-row ${is_first == false ? 'mt-2' : ''}">`;
  buttons.forEach(button => {
    var button_content = `<div class="col">
      <button class="btn btn-primary btn-block btn-word" 
              onclick="handleClickButton(this)" 
              data-front="${button.english}" 
              data-back="${button.spanish}" 
              data-audio="${soundDirectory + "/" + button.audio}" >${button.english}</button>
    </div>`;
    html_string += button_content;
  });
  html_string+= `</div>`;

  return html_string;
}

/**
 * Handle when click on word button
 * @param button  clicked button element
 */
function handleClickButton(button){
  var ele = $(button);
  // Replace text
  front_word.val(ele.attr("data-front"));
  back_word.val(ele.attr("data-back"));
  
  // Play audio
  audio_element.attr("src", ele.attr("data-audio"));
  audio_element[0].play();
}





