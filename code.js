// there are 4 options: 1, 2, 3, 4 (waiting room, therapy room, doctor's room and medicines room)
// the variable changes when clicking on one of the rooms buttons in the opening
// there are 4 arrays- one for each room 
var nRoom = 0;
var nPage = 0;

// waiting room
var Arr_1 = [
  {
    // opening game question- page 1
    divName: ["opening-game-question", "general-opening-game"],
    functions: ['pop_buttons($("#prev"), -1, "add")', 'pop_buttons($("#next"), +1, "add")', 'clearIntervalExplanation()', 'pop_openingGameQuestion()'],
  },
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
    functions: ["pop_room_buttons()", 'pop_buttons($("#about"), 1)', "pop_calculateStrokeTextCSS(16)"] // array of functions that are needed to the page. If the functions contain the word "pop", it will happen only once and will be popped out of the array afterwards
  },
  {
    // about- page 1
    divName: ["about"],
    functions: [""]
  }
], Arr_1, Arr_2, Arr_3, Arr_4]

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
}

// function that adds events listeners to buttons that affects the page's display- called only one time for each button
function pop_room_buttons() {
  $(".room-button").on("click", function() {
    // hides last divs
    for (let i = 0; i < matrix[nRoom][nPage].divName.length; i++) {
      $("#" + matrix[nRoom][nPage].divName[i]).css("display", "none");
    }
    // changes room counter
    nRoom = Number($(this).attr("id").slice(-1)); 
    // shows next page
    movePage();     
  })
}

// function that adds events listeners to buttons that affects the page's display- called only one time for each button
function pop_buttons(button, number) {
  button.on("click", function() {
    // hides last divs
    for (let i = 0; i < matrix[nRoom][nPage].divName.length; i++) {
      $("#" + matrix[nRoom][nPage].divName[i]).css("display", "none");
    }
    // changes page counter
    // if the button is prev/next/about (ect), the number is added to page counter
    if (button.hasClass("move")){
      nPage = nPage + eval(number);
    }
    // if the button is part of the lesson map, page counter is compared to the number 
    else if (button.hasClass("lesson-map")) {
      nPage = eval(number);
    }
    // shows next page
    movePage();     
  })
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

function check_type(){

}
