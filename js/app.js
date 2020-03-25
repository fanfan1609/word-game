
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
var app_container     = $("#app-container");
// Add for debug
var screen_w          = $("#screen-w");
var screen_h          = $("#screen-h");
var app_screen_w      = $("#app-screen-w");
var app_screen_h      = $("#app-screen-h");


// Define sound play class
var sound_playing_class = "sound-playing";

// Onload Event Listener
window.onload = function(e){
  screen_w.html(e.currentTarget.outerWidth);
  screen_h.html(e.currentTarget.outerHeight);
  this.app_screen_w.html(app_container.outerWidth())
  this.app_screen_h.html(app_container.outerHeight())
  this.body.addClass("loading");
  readXMLFile(DATA_URL, extractDataFromResponse);
}


var onresize = function(e) {
  //note i need to pass the event as an argument to the function
  var width = e.target.outerWidth;
  
  if(app_container.hasClass("mobile-scale")){
    if(width > 768) app_container.removeClass("mobile-scale");
  } else {
    if(width <= 768) app_container.addClass("mobile-scale");
  }
  screen_w.html(e.target.outerWidth);
  screen_h.html(e.target.outerHeight);
  this.app_screen_w.html(app_container.outerWidth())
  this.app_screen_h.html(app_container.outerHeight())
}
window.addEventListener("resize", onresize);


function adjust_height(){
  var max = 0;
  // get the height of the longest select.select
  $(".btn-word").each(function() { 
     var h = $(this).height();
     if (h > max) 
        max = h;
  });
  
  console.log(max);
  // set the height of all select.select to max height
  $(".btn-word").height(max);
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
      sound_animation.removeClass("d-none");
    })
    .on("ended", function(){
      sound_animation.addClass("d-none");
    })
    
  button_container.on("change", function(){
    console.log("change");
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

  //adjust_height()
  // Remove loading
  body.removeClass("loading");
}

/**
 * Generate button from 
 * @param buttons 
 */
function createButtonFromResponse(buttons){
  var i = 0;
  html_string = "";
  while(i < buttons.length){
    var row_buttons = buttons.slice(i, Math.min(i + ITEM_PER_ROW, buttons.length) );
    html_string += createButtonPerRow(row_buttons, i == 0);
    // button_container.append(createButtonPerRow(row_buttons, i == 0));
    i += ITEM_PER_ROW;
  }  
  button_container.append(html_string);
  setTimeout(function(){
    button_container.find(".btn-word").css({
      "transform": "none",
      "transition-duration": "250ms",
      "transition-timing-function": "ease",
      "transition-property": "transform, opacity"
    })
    
  },200)
}

/**
 * Generate Buttons per row
 * @param  buttons  List button per row
 * @param  is_first The Row is first or not
 */
function createButtonPerRow(buttons, is_first){
  var html_string = `<div class="form-row  ${is_first == false ? 'mt-2' : ''}">`;
  buttons.forEach(button => {
    var random_x = getRandomFloat(-300,300);
    var random_y = getRandomFloat(-300,300);
    var button_content = `<div class="col btn-group">
      <button class="btn btn-sm shadow rounded bg-black btn-info btn-block btn-word" 
              onclick="handleClickButton(this)"
              style="transform: translate(${random_x}px,${random_y}px)"              
              data-front="${button.english}" 
              data-back="${button.spanish}" 
              data-audio="${soundDirectory + "/" + button.audio}" >${button.english}</button>
    </div>`;
    html_string += button_content;
  });
  if(buttons.length < 4){
    for(var i = 0; i < 4 - buttons.length; i++){
      html_string += `<div class="col"></div>`
    }
  }
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

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}
