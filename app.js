var page = new PageRender();
var words = new Words();

function render(path, scriptPath){
    page.render(path, scriptPath)
}

function write(id, newKey, newMeaning, classNo){
    words.write(id, newKey, newMeaning, classNo)
}

render("start/start.html", "start/app.js");
