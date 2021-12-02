// called to add to each sign event listener to click_identify
// in order the function will work the items need to have the class "state" and "item"
// r1p3
pop_sign_click = () => {
    // add event listener for each item
    for (let i = 1; i <= $(`#${matrix[nRoom][nPage].divName} .item`).length ; i++) {
        let item =  $(`#${matrix[nRoom][nPage].divName} .item.data-num-${i}`);
        item.on("click", () => {
            click_identify(item);
        }); 
    } 
}

// the parameter is the clicked correct sign
r1p3_clicked_correct = (item) => {
    item.animate({opacity: `0`}, 200, function() {
        switch_class(item, "visible", "hidden");
        if ($(`#${matrix[nRoom][nPage].divName} .hidden`).length === 2) {
            $(".item").css("pointer-events", "none");
            V_X(true);
        }
    });
}
