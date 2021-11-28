
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
    hidePage();
    checkpoint(condition);
    // hide timer
    switch_class($("#timer"), "block", "none");
    // display end-game general page
    $(`#ending-game`).css("display", "block");
    switch_class($("#spinning-flex"), "none", "flex");
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
    }, 5000);
}

  // time out- the game is over
pop_timeEnds = () => {
    // event listener for ending timer animation
    document.querySelector("#time-timeline").addEventListener("animationend", () => {
        endingGame(false);
    });
}
