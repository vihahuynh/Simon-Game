let isPlaying = false
let score = 0
const buttons = ["green", "red", "yellow", "blue"]

let gamePattern = []
let userClickedPattern = []

$(document).keypress(function(){
    if (isPlaying === false){
        $('h1').text("Let's play")
        generate()
        isPlaying = true
    }
})

$('button').click(function() {
    if (isPlaying === true){
        const clickedButtonColor = $(this).attr('class')
        userClickedPattern.push(clickedButtonColor)
        playSound(clickedButtonColor)
        animationButton(clickedButtonColor)
        checkAnswer(userClickedPattern.length - 1)
    }
})

function checkAnswer(index) {
    if (userClickedPattern[index] === gamePattern[index]){
        if (userClickedPattern.length === gamePattern.length){
            score++
            $('h1').text('Score: ' + score)
            userClickedPattern = []
            setTimeout(function() {
                generate()
            }, 1000)
        }
    }else{
       gameOver()
    }
}

function gameOver(){
    $('body').addClass('game-over')
    setTimeout(function(){
        $('body').removeClass('game-over')
    }, 500)
    $('h1').text('Game over, press a key to restart')
    const gameOverSound = new Audio('sounds/wrong.mp3')
    gameOverSound.play()
    gamePattern = []
    userClickedPattern = []
    isPlaying = false
    score = 0
}

function generate() {
    const randomNumber = Math.floor(Math.random() * 4)
    const randomButtonColor = buttons[randomNumber]
    gamePattern.push(randomButtonColor)
    for (let i = 0; i < gamePattern.length; i++){
        setTimeout(function() {
            playSound(gamePattern[i])
            animationButton(gamePattern[i])
        }, i * 600)
    }
}

function animationButton(color) {
    $('.' + color + ' img').attr("src", "images/" + color + "-light.png")
    setTimeout(function(){
        $('.' + color + ' img').attr("src", "images/" + color + ".png")
    }, 500)
    $('.' + color).fadeOut(200).fadeIn(200)
}

function playSound(color) {
    const sound = new Audio('sounds/' + color + '.mp3')
    sound.play()
}