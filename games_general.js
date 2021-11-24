
// setting game page
type_game = () => {
    // hide controls
    switch_class($("#controls"), "flex" ,"none");
    switch_class($(`#lesson-map-${nRoom}`),"flex" ,"none");
  
    // display timer
    switch_class($("#timer"), "none", "block");
    // reset timeline
    $("#time-timeline").css({"object-position": "40% 0", "animation-duration" : matrix[nRoom][nPage].timer});
  }

endingGame = (condition) => {
    hidePage(condition);
    // display end-game general page
    $(`#ending-game`).css("display", "block");  
    // moving one step in less point
    move_lessonMap(topic_distance);
    // removing game from the array
    ArrPages.splice(nPage + exerPage , 1);
    // shows next page
    setTimeout(() => {
        movePage();
        $(`#ending-game`).css("display", "none");
    }, 3500);
}

  // time out- the game is over
pop_timeEnds = () => {
    // event listener for ending timer animation
    document.querySelector("#time-timeline").addEventListener("animationed", () => {
        endingGame(false);
    })
}