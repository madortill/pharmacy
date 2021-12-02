
// life
var nLife = 3;

// feedback arrays
let correct_num = 0;
let incorrect_num = 0;
var arr_correct_feedback = ["תותח!"];
var arr_incorrect_feedback = ["איזה לוזר!"];

// setting game page
type_game = () => {
    // hide controls
    switch_class($("#controls"), "flex" ,"none");
    switch_class($(`#lesson-map-${nRoom}`), "flex" ,"none");
  
    // display timer
    switch_class($("#timer"), "none", "block");
    // reset timeline
    $("#time-timeline").css({"object-position": "40% 0", "animation-duration" : matrix[nRoom][nPage].timer});
  }

endingGame = (condition) => {
    let comment;
    let heart_img;
    let delay = 2000;
    // the user wins/loses
    if (condition) {
        comment = "correct";
        heart_img= "happy";
    } else {
        comment = "incorrect";
        heart_img= "sad";
    }

    hidePage();
    checkpoint(condition);
    // hide back and prev
    switch_class($("#controls .control-button"), "visible", "hidden");
    $(".topic").css("pointer-events", "none");
    // display end-game general page
    $(`#ending-game`).css("display", "block");
    switch_class($("#spinning-flex"), "none", "flex");

    // hearts
    switch_class($(`#hearts-flex`), "none", "flex");
    // heart images- switch from happy to sad and the opposite
    if ($(`#heart-1 .heart`).attr("src") !== `assets/media/heart/heart1_${heart_img}.svg`) {
        for (let i = 1; i <= nLife ; i++) {
            $(`#heart-${i} .heart`).attr("src", `assets/media/heart/heart${i}_${heart_img}.svg`);
        }
    }

    if (!condition) {
        // animation of popping heart
        setTimeout(() => {
            $(`#heart-${nLife} .heart`).addClass("heart-animation");
        }, delay);
        setTimeout(cloud_effect, delay + 400);
        setTimeout(() => {
            $(`#heart-${nLife} .heart`).removeClass("heart-animation");
            switch_class($(`#heart-${nLife}`), "visible", "hidden");
            nLife--;
            // end of game
            if (nLife === 0) {

            }
        }, delay+ 500);
    }

    // changing text in ending page
    if (eval(`matrix[nRoom][nPage].feedback.${comment}`) === "array") {
        // from the array of generic comments
        $(`#ending-game-title`).text(eval(`arr_${comment}_feedback[${comment}_num]`));
    } else {
        // specific comments
        $(`#ending-game-title`).text(eval(`matrix[nRoom][nPage].feedback.${comment}`));
    }
    // adding to the appropriate counter
    eval(`${comment}_num++`);

    
    // moving one step in lesson map
    switch_class($("#controls"),"none", "flex" );
    switch_class($(`#lesson-map-${nRoom}`), "none", "flex");  
    move_lessonMap(topic_distance);
    // removing game from the array
    matrix[nRoom].splice(nPage , 1);
    // shows next page
    setTimeout(() => {
        movePage();
        // hide end-game general page
        $(`#ending-game`).css("display", "none");
        switch_class($("#spinning-flex"), "flex", "none");
        // hide hearts
        switch_class($(`#hearts-flex`), "flex", "none");
        // show back and prev
        switch_class($("#controls .control-button"),"hidden" ,"visible");
        $(".topic").css("pointer-events", "auto");
    }, delay + 2000);
}


// fog cloud hearts effect
cloud_effect = () => {
    switch_class($(`#heart-${nLife} .cloud`), "none", "block");
    setTimeout(() => {
      switch_class($(`#heart-${nLife} .cloud`), "block", "none");
    }, 50);
}

// called when the user loses the game
V_X = (condition) => {
    // hide timer
    switch_class($("#timer"), "block", "none");
    let v_x;
    let comment;
    let ahami;
    // if the user has won
    if (condition) {
        v_x = $("#v");
        comment = "correct";
        ahami = "happy";
    }
    // if the user lost
    else {
        v_x = $("#x");
        comment = "incorrect";
        ahami = "sad";
    }
    switch_class(v_x, "none", "block");
    $(`#${matrix[nRoom][nPage].divName} .instructions`).text(eval(`matrix[nRoom][nPage].instructions_feedback.${comment}`));
    $(`#${matrix[nRoom][nPage].divName} .ahami-head`).attr("src", `assets/media/2content/head_${ahami}.svg`);

    setTimeout(() => {
        switch_class(v_x, "block", "none");
        $(".item").css("pointer-events", "auto");
        endingGame(condition);
    }, 2000);
} 

// time out- the game is over
pop_timeEnds = () => {
    // event listener for ending timer animation
    document.querySelector("#time-timeline").addEventListener("animationend", () => {
        V_X(false);
    });
}

// adding hover and down state to objects
// in order the function will work the items need to have the class "state" and "data-num"
pop_hover_down = () => {
    // add event listener for each item
    for (let i = 1; i <= $(`#${matrix[nRoom][nPage].divName} .state`).length ; i++) {
        let item =  $(`#${matrix[nRoom][nPage].divName} .state.data-num-${i}`);
        let src = item.attr("src").slice(0,-4);
        // hover state
        item.hover(
            function() {
                $(this).attr("src", `${src}_hover.svg`);
            }, function() {
                $(this).attr("src", `${src}.svg`);
            }
        );
        // down state
        item.mousedown(function() {
            $(this).attr("src", `${src}_down.svg`);
        });
    } 
}

// general games

// game of clicking on items (clicking on wrong item is disqulification)
// the parameter is the clicked item
// r1p3
click_identify = (item) => {
    // if the user clicked correct item
    if ((item).hasClass("correct")) {
        // eval(matrix[nRoom][nPage].divName + "_clicked_correct(" + item + ")");
        window [matrix[nRoom][nPage].divName + "_clicked_correct"](item);
    }
    // if the user clicked incorrect item, the game is over
    else {
        V_X(false);
    }
}
