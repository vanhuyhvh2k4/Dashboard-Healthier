$('document').ready(() => {
    $('.navbar').css("backdrop-filter", "blur(16px)");
    var nameP = $('.name');
    var typeP = $('.typeP');
    var muscleP = $('.muscleP');
    var equipmentP = $('.equipmentP');
    var levelP = $('.levelP');
    var instructionP = $('.instructionP');
    // equipmentP.css("display","none");
    // instructionP.css("display","none");

    $('svg').click((event) => {
        const clickedSvgId = $(event.target).closest('g').attr('id');
        var muscle = clickedSvgId;
        launch_toast();
        $('.gen').click(() => {
            launch_toast();
            $.ajax({
                method: 'GET',
                url: 'https://api.api-ninjas.com/v1/exercises?muscle=' + muscle,
                headers: { 'X-Api-Key': 'q3ebdauPQG67dUv/lbR4oQ==iRxdzbrSYINbtuli' },
                contentType: 'application/json',
                success: function (result) {
                    let numberRandom = getRandomNumber(result.length);
                    nameP.text(result[numberRandom].name);
                    typeP.text(result[numberRandom].type);
                    muscleP.text(result[numberRandom].muscle);
                    levelP.text(result[numberRandom].difficulty);
                    equipmentP.text(result[numberRandom].equipment);
                    instructionP.text(result[numberRandom].instructions);
                    $('.modal-body').text(result[numberRandom].instructions);
                    // display text
                    typeP.css("display", "block");
                    nameP.css("display", "block");
                    muscleP.css("display", "block");
                    equipmentP.css("display", "block");
                    levelP.css("display", "block");
                    // instructionP.css("display","none");
                },
                error: function ajaxError(jqXHR) {
                    console.error('Error: ', jqXHR.responseText);
                }
            });
        })
        // alert(`Clicked SVG ID: ${clickedSvgId}`);
        $.ajax({
            method: 'GET',
            url: 'https://api.api-ninjas.com/v1/exercises?muscle=' + muscle,
            headers: { 'X-Api-Key': 'q3ebdauPQG67dUv/lbR4oQ==iRxdzbrSYINbtuli' },
            contentType: 'application/json',
            success: function (result) {
                let numberRandom = getRandomNumber(result.length);
                nameP.text(result[numberRandom].name);
                typeP.text(result[numberRandom].type);
                muscleP.text(result[numberRandom].muscle);
                levelP.text(result[numberRandom].difficulty);
                equipmentP.text(result[numberRandom].equipment);
                instructionP.text(result[numberRandom].instructions);
                $('.modal-body').text(result[numberRandom].instructions);
                // display text
                typeP.css("display", "block");
                nameP.css("display", "block");
                muscleP.css("display", "block");
                equipmentP.css("display", "block");
                levelP.css("display", "block");
                // instructionP.css("display","none");
            },
            error: function ajaxError(jqXHR) {
                console.error('Error: ', jqXHR.responseText);
            }
        });
    });
    function getRandomNumber(n) {
        return Math.floor(Math.random() * n) + 1;
    }

})

// api key: q3ebdauPQG67dUv/lbR4oQ==iRxdzbrSYINbtuli
// return value: 
// difficulty
// : 
// "beginner"
// equipment
// : 
// "dumbbell"
// instructions
// : 
// "Seat yourself on an incline bench with a dumbbell in each hand. You should pressed firmly against he back with your feet together. Allow the dumbbells to hang straight down at your side, holding them with a neutral grip. This will be your starting position. Initiate the movement by flexing at the elbow, attempting to keep the upper arm stationary. Continue to the top of the movement and pause, then slowly return to the start position."
// muscle
// : 
// "biceps"
// name
// : 
// "Incline Hammer Curls"
// type
// : 
// "strength"
// [[Prototype]]
// : 
// Object
