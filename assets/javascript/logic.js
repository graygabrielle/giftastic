let topics = [
    "baby elephants",
    "hipster",
    "redwood forest",
    "corgis"
]


for (let i = 0; i < topics.length; i++) {

let button = $("<button>");
button.addClass("giphButton");
button.attr("data-name", topics[i]);
button.text(topics[i]);
$(".button-drop").append(button);

}

$(document).on("click", "giphButton", function(){
    let topic = $(this).attr("data-name");
    let queryURL = 


    $.ajax


})