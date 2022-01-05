// called to add to each sign event listener to click_identify
// in order the function will work the items need to have the class "item"
// r1p3
pop_sign_click = () => {
    // add event listener for each item
    $(`#${matrix[nRoom][nPage].divName} .item`).on("click", (event) => {
        click_identify($(event.target));
    }); 
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

counter_r1p7_signs_order = 0;
arr_r1p7_signs_order = [1,2,3,4,5,6,7,8];
r1p7_dropped_correct = (drag, drop) => {
    var $this = drop;
    drag.position({
        my: "center top",
        at: "top center",
        of: $this,
        using: function(pos) {
            $(this).animate(pos, 200, "linear");
        }
    });
    // disable item dragging
    drag.draggable("option", "disabled", true);
    // vertical position
    if (drop.hasClass("empty")) {
        drag.css("top", "10vw");
        drop.removeClass("empty");
    } else {
        drag.css("top", "22vw");
    }
    counter_r1p7_signs_order++;
    //new sign appear
    switch_class($(`#${matrix[nRoom][nPage].divName} .drag-${arr_r1p7_signs_order[counter_r1p7_signs_order]}`), "none", "block");
}
