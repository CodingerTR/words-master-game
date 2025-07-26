
document.getElementById("9thgrade").addEventListener("click", e => {
    contender.setClass(0)
    render("game/game.html", "game/app.js")
})

document.getElementById("10thgrade").addEventListener("click", e => {
    contender.setClass(1)
    render("game/game.html", "game/app.js")
})

document.getElementById("11thgrade").addEventListener("click", e => {
    contender.setClass(2)
    render("game/game.html", "game/app.js")
})

document.getElementById("12thgrade").addEventListener("click", e => {
    contender.setClass(3)
    render("game/game.html", "game/app.js")
})

document.getElementById("customize").addEventListener("click", e => {
    fetch("./core/server/FileManager.php?o=check")
    .then((res) => res.text())
    .then((res) => {
        if(res != true){
            render("customize/validate.html", "customize/validate.js")
        }else{
            render("customize/words.html", "customize/app.js")
        }
    });
})