// there are 4 options: 1, 2, 3, 4 (waiting room, therapy room, doctor's room and medicines room)
// the variable changes when clicking on one of the rooms buttons in the opening
// there are 4 arrays- one for each room 
var nRoom = 0;
var nPage = 0;

// waiting room
var Arr_1 = [
  {
    // opening game question- page 1
    divName: ["r1p1"],
    functions: [`switch_class($("#back-button"), "visible", "hidden")`, `pop_buttons($("#next-button"), 1)`],
    type: "content",
    topic: 1
  },
  {
    // opening game question- page 1
    divName: ["r1p2"],
    functions: [`switch_class($("#back-button"), "hidden", "visible")`, `pop_buttons($("#back-button"), -1)`],
    type: "content",
    topic: 2
  }
];

// therapy room
var Arr_2 = [
];

// doctor's room
var Arr_3 = [
];

// medicines room
var Arr_4 = [
];

var matrix = [[
  {
    // opening- page 0
    divName: ["opening"], // the last div contains the speech bubble
    functions: ['pop_room_buttons($("#room-button-1"))', 'pop_buttons($("#about-button"), 1)', "pop_calculateStrokeTextCSS(16)"] // array of functions that are needed to the page. If the functions contain the word "pop", it will happen only once and will be popped out of the array afterwards
  },
  {
    // about- page 1
    divName: ["about"],
    functions: ['pop_buttons($("#back-about-button"), -1)']
  }
], Arr_1, Arr_2, Arr_3, Arr_4];

// lesson map
// what topic is the user currently learning
var topic_counter = 1;
// the distance between each circle in the lesson map (for the head movement)- different for each room 
var topic_distance = 4;

// life
var nLife = 3;

$(function() {
  // calls the opening page
  movePage();
});

function movePage() {
  // appearance
  // shows current divs
  for (let i = 0; i < matrix[nRoom][nPage].divName.length; i++) {
    $("#" + matrix[nRoom][nPage].divName[i]).css("display", "block");
  }
 
  // functions
  // calls the functions of the page
  if ("#" + matrix[nRoom][nPage].functions !== "") {
    let nFunction = 0;
    while (nFunction < matrix[nRoom][nPage].functions.length) {
      eval(matrix[nRoom][nPage].functions[nFunction]);
      // functions that contains the word "pop" will accur only once
      if (matrix[nRoom][nPage].functions[nFunction].includes("pop")) {
        matrix[nRoom][nPage].functions.splice(nFunction , 1);
        // since the function happens only once there is no need in adding nFunction +1
      } else {
        nFunction++;
      }
    }
  }

  // identify type
  if (matrix[nRoom][nPage].type === "content") {
    type_content();
  }
}

// function that adds events listeners to room buttons that displays the chosen room- called only one time for each button
function pop_room_buttons(button) {
  button.on("click", function() {
    // hides last divs
    for (let i = 0; i < matrix[nRoom][nPage].divName.length; i++) {
      $("#" + matrix[nRoom][nPage].divName[i]).css("display", "none");
    }
    // changes room counter
    nRoom = Number(button.attr("id").slice(-1)); 
    // shows next page
    movePage(); 
    check_room(); 
    // display room
    $(`#room-${nRoom}`).css("display", "block");
    setTimeout(toggle_room("hide"), 1000);   
  })
}

// function that adds events listeners to buttons that affects the page's display- called only one time for each button
function pop_buttons(button, number) {
  button.on("click", function() {
    // hides last divs
    for (let i = 0; i < matrix[nRoom][nPage].divName.length; i++) {
      $("#" + matrix[nRoom][nPage].divName[i]).css("display", "none");
    }
    // changing checkpoint in lesson map
    if (matrix[nRoom][nPage].topic !== undefined) {
      checkpoint(true);
    }
    // changes page counter
    // if the button is prev/next/about (ect), the number is added to page counter
    if (button.hasClass("move")){
      nPage = nPage + eval(number);
      // lessom map movememt (ahami head)
        // if the topic changes whem moving page (there are pages with the same topic)
        // after a game the topic is equal to the content topic and there is no need to change
        if ((matrix[nRoom][nPage].topic !== undefined) && (topic_counter !== matrix[nRoom][nPage].topic)) {
          move_lessonMap(topic_distance * number);
        }
    }
    // if the button is part of the lesson map, page counter is compared to the number 
    else if (button.hasClass("topic")) {
      nPage = eval(number);
      // lessom map movememt (ahami head)
        move_lessonMap(topic_distance * (matrix[nRoom][nPage].topic - topic_counter));
    }
    // shows next page
    movePage();     
  })
}

// function that is called every time going in to new room to start from stratch
check_room = () => {
  topic_counter = 1;
  nLife = 3;
  switch (nRoom) {
    case 1:
      topic_distance = 13;  
      break;
    case 2:
      topic_distance = 2;  
      break;
    case 3:
      topic_distance = 3;  
      break;
    case 4:
      topic_distance = 2;  
      break;
    default:
      topic_distance = 4; 
  }
  $("#topic-counter").css("right", "-63.5vw");
  // controls
  switch_class($("#controls"), "none", "flex");
  switch_class($(`#lesson-map-${nRoom}`), "none", "flex");
}


// colors checkpoint if needed
checkpoint = (condition) => {
  let curr_checkpoint = $(`#lesson-map-${nRoom} .topic-${topic_counter}`);
  // if the checkpoint haven't been changed
  if (curr_checkpoint.css("background-image").includes("normal")) {
    // if this is a content page or the user succeded in a game
    if (condition) {
      curr_checkpoint.css("background-image", `url("assets/media/2content/checkpoint_right.svg")`);
    }
    // the user lost the game
    else {
      curr_checkpoint.css("background-image", `url("assets/media/2content/checkpoint_wrong.svg")`);
    }
    // the checkpoint is clickable
    pop_buttons(curr_checkpoint, nPage);
    curr_checkpoint.addClass("button");
  }
}

// moves ahami lesson map head- after moving topic and after every game
move_lessonMap = (distance) => {
  // change lesson map head place
  $("#topic-counter").animate({right: `+=${distance}vw`}, 1000);
  // update topic counter
  topic_counter = matrix[nRoom][nPage].topic;
}

// display/hides room image (every room start and with the room button)
toggle_room = (action)  => {
  if (action === "show") {
    $(`#room-${nRoom}`).css("display","block").animate({opacity: `1`}, 1000);
  } else if (action === "hide") {
    $(`#room-${nRoom}`).animate({opacity: `0`}, 1000).css("display","none");
  }
}

// function that 
type_content = () => {

}

// function that switches classes
switch_class = (object, prevClass, currClass) => {
  if (object.hasClass(prevClass)) {
    object.removeClass(prevClass);
    object.addClass(currClass);
  }
}	

// text css opening
function pop_calculateStrokeTextCSS(steps) {
  var css = "";
  for (var i = 0; i < steps; i++) {
    var angle = (i * 2 * Math.PI) / steps;
    var cos = Math.round(10000 * Math.cos(angle)) / 10000;
    var sin = Math.round(10000 * Math.sin(angle)) / 10000;
    css +=
      "calc(var(--stroke-width) * " +
      cos +
      ") calc(var(--stroke-width) * " +
      sin +
      ") 0 var(--stroke-color),";
  }
  return css;
}
