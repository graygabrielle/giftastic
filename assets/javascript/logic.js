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
        button.addClass("waves-effect");
        button.addClass("z-depth-2");
        button.attr("data-name", topics[i]);
        button.text(topics[i]);
        $(".button-drop").append(button);
        
    }
}


$(document).on("click", ".gifButton", function(event){
    event.preventDefault();
    let topic = $(this).attr("data-name");
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax ({
        url: queryURL,
        method: "GET"

    })
    .then(function(response){
        console.log(response);
        let listItem = $("<li>");
        listItem.addClass(topic);
        listItem.addClass("z-depth-2");

        let collapsibleHeader = $("<div>");
        collapsibleHeader.addClass("collapsible-header");
        let closeIcon = $("<i>");
        closeIcon.addClass("material-icons");
        closeIcon.addClass("close-button");
        closeIcon.text("close");
        collapsibleHeader.append(closeIcon);
        collapsibleHeader.append(topic);
        let collapsibleBody = $("<div>");
        collapsibleBody.addClass("collapsible-body");
        listItem.append(collapsibleHeader);
        listItem.append(collapsibleBody);
        $(".gifs").prepend(listItem);
        for(let i=0; i<response.data.length; i++){
            let imageAnimate = response.data[i].images.fixed_width.url;
            let imageStill = response.data[i].images.fixed_width_still.url;
            let imageDiv = $("<div>"); 
            imageDiv.addClass("image-div");
            let image = $("<img>");
            image.attr("src", imageStill);
            image.attr("class", "gif");
            image.attr("data-still", imageStill);
            image.attr("data-animate", imageAnimate);
            image.attr("data-state", "still");
            image.attr("alt", response.data[i].title);
            $(collapsibleBody).append(imageDiv);
            $(imageDiv).prepend(image);
            let rating = "Rating: " + response.data[i].rating;
            let ratingTag = $("<p>");
            ratingTag.text(rating);
            $(imageDiv).append(ratingTag);

        }

    })

})

$(document).on("click", ".close-button", function() {

    $(this).parent().parent().empty();
})

$(document).on("click", ".gif", function(){
    let state = $(this).attr("data-state");
    if (state==="still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})

$("#button-generator").on("click", function(event){
    event.preventDefault();
    let userInput = $("#user-input").val().trim();
    if (!userInput) {
        $("#user-input").attr("placeholder", "Please type in a TV show to generate a new blue button!");
    }
    else{
        topics.push(userInput);
        $("#user-input").val("");
        buttonRender();
        $("#user-input").attr("placeholder", "Add a TV show!");
    }

})


$(document).ready(function() {
    buttonRender();
})

$(document).ready(function(){
    $('.collapsible').collapsible();
  });