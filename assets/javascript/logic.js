let topics = [
    "The Office",
    "Psych",
    "The Good Place",
    "Sherlock"
]

function buttonRender() {

    $(".button-drop").empty();

    for (let i = 0; i < topics.length; i++) {

        let button = $("<button>");
        button.addClass("gifButton");
        button.attr("data-name", topics[i]);
        button.text(topics[i]);
        $(".button-drop").append(button);
        
    }
}


$(document).on("click", ".gifButton", function(event){
    event.preventDefault();

    console.log("clicked!");
    let topic = $(this).attr("data-name");
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";


    $.ajax ({
        url: queryURL,
        method: "GET"

    })
    .then(function(response){
        console.log(response);
        for(let i=0; i<response.data.length; i++){
            let imageAnimate = response.data[i].images.fixed_width.url;
            let imageStill = response.data[i].images.fixed_width_still.url;
            let image = $("<img>");
            image.attr("src", imageStill);
            image.attr("data-still", imageStill);
            image.attr("data-animate", imageAnimate);
            image.attr("data-state", "still");
            image.attr("alt", response.data[i].title);
            $(".gifs").prepend(image);
        }

    })

})



$("#button-generator").on("click", function(event){
    event.preventDefault();
    console.log("submit");
    let userInput = $("#user-input").val().trim();
    topics.push(userInput);
    buttonRender();
})


$(document).ready(function() {
    buttonRender();
})