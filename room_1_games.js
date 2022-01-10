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
arr_r1p7_signs_order = [1,8,7,6,2,4,5,3];
r1p7_dropped_correct = (drag, drop) => {
    var $this = drop;
    // disable item dragging
    drag.draggable("option", "disabled", true);
    // vertical position
    if (drop.hasClass("empty")) {
        drag.position({
            my: "top bottom",
            at: "top center",
            of: $this,
            using: function(pos) {
                $(this).animate(pos, 200, "linear");
            }
        });
        drop.removeClass("empty");
    } else {
        drag.position({
            my: "top top",
            at: "top center",
            of: $this,
            using: function(pos) {
                $(this).animate(pos, 200, "linear");
            }
        });
    }
    counter_r1p7_signs_order++;
    if (counter_r1p7_signs_order < arr_r1p7_signs_order.length) {
        //new sign appear
        switch_class($(`#${matrix[nRoom][nPage].divName} .drag.data-num-${arr_r1p7_signs_order[counter_r1p7_signs_order]}`), "none", "block");
    } else {
        V_X(true);
    }
}

var counter_r1p10_folder = 0;
var counter_r1p10_trash = 0;
r1p10_dropped_correct = (drag, drop) => {
    // disable item dragging
    drag.draggable("option", "disabled", true);
    // vertical position
    if (drop.hasClass("folder")) {
        counter_r1p10_folder++;
        drag.animate({width: `5vw`}, 100, function() {
            switch_class(drag, "block", "none");
        })
    } else if (drop.hasClass("trash")) {
        counter_r1p10_trash++;
        drag.attr("src", `assets/media/exer3/pieceofshit${counter_r1p10_trash}.svg`);
        drag.css("width", "7vw");
    }
    // winning
    if ((counter_r1p10_folder === $(`#${matrix[nRoom][nPage].divName} .drag-1`).length) && ((counter_r1p10_trash === $(`#${matrix[nRoom][nPage].divName} .drag-2`).length))) {
        V_X(true);
    } 
}
