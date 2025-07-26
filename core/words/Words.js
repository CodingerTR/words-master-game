class Words{
    /***
     * classNo = 0, 9.Sınıf
     * classNo = 3, 12.Sınıf
     */
    constructor(){
    }


    fetchWords(operation=null, classNo=null){
        fetch("./core/server/FileManager.php?o=getWords")
        .then((res) => res.text())
        .then((res) => {
            let words = JSON.parse(res);
            if(operation == "game"){
                let wordsContainer = document.getElementsByClassName("wordsContainer")[0];
                for(let j = 0; j < words[classNo].length; j++){
                    wordsContainer.innerHTML += `<div class="word" id="${words[classNo][j].id}"></div>`
                }
            }else if(operation == "get"){
                for(let i = 0; i < words.length; i++){
                    for(let j = 0; j < words[i].length; j++){
                        document.getElementById("grade"+i).innerHTML += 
                        `
                        <div class="word-row">
                            <div class="word-id">${words[i][j].id}</div>
                            <div class="word-customize word-key" id="0${i}${words[i][j].id}">${words[i][j].word}</div>
                            <div class="word-customize word-meaning" id="00${i}${words[i][j].id}">${words[i][j].tr}</div>
                        </div>
                
                        
                        
                        `;
                    }
                }        
            }else if(operation == "fetch"){
                return words;
            }    
        }).catch((e) => console.log(e));

    }

    ask(id, classNo){
        if(this.words == undefined || classNo != this.classNo){
            var xhttp = new XMLHttpRequest();

            xhttp.open("GET", "./core/server/FileManager.php?o=getWords", false)
            xhttp.send();

            if(xhttp.status === 200){
                this.words = JSON.parse(xhttp.responseText)[classNo];
                this.wordsInGame = this.words;
                this.classNo = classNo;
            }
        }
        id = parseInt(id);
        let objectToAsk = null;

        for(let i = 0; i < this.wordsInGame.length; i++){
            if(this.wordsInGame[i].id == id){
                objectToAsk = this.wordsInGame[i];
            }
        }

        if(objectToAsk != null){
            var answer;
            let meaningToAsk;
            let randomChoice = Math.round(Math.random());  

            
            if(randomChoice == 1){
                meaningToAsk = objectToAsk.tr;
                answer = objectToAsk.word;
            }else{
                meaningToAsk = objectToAsk.word;
                answer = objectToAsk.tr;
            }

            if(meaningToAsk.includes("/")){
                let count = meaningToAsk.split("/").length;
                let random = Math.round(Math.random() * (count-1));

                meaningToAsk = meaningToAsk.split("/")[random]

            }

            if(answer.includes("/")){
                answer = answer.split("/");
            }

            

            document.getElementsByClassName("blackbg")[0].style.display = "flex";
            document.getElementById("word-on-screen").innerText = meaningToAsk;
            document.getElementById("answer").focus();
            return [answer, id];
        }    


    }

    analizeResult(answer, id){
        let answeredWord = document.getElementById("answer").value;
        if(Array.isArray(answer)){
            let trueCameOut = false;
            for(let i = 0; i < answer.length; i++){
                if(answer[i] == answeredWord){
                    this.animate("true", id)
                    trueCameOut = true;
                }
            }
            if(!trueCameOut){
                this.animate("false", id, answer);
            }
        }else{
            if(answer == answeredWord){
                this.animate("true", id)
            }else{
                this.animate("false", id, answer);
            }
        }
    }

    animate(animType, id, answer=null){
        let loop = 0;
        let gameBody = document.body.getElementsByClassName("game")[0];
        let animDiv = document.body.getElementsByClassName("animation")[0];
        let blackbg = document.body.getElementsByClassName("blackbg")[0];

        let trueSlogans = ["IT'S RIGHT!", "WELL DONE, MATE!", "OH WOW!", "GOOD JOB", "THAT'S CLASSY!", "EXCELLENT.", "A W E S O M E"];
        let falseSlogans = ["OH NO!", "NEXT TIME BUDDY", "OH HELL NO!", "THAT'S NOT TRUE.", "FALSE.", "WE CAN FIX IT."];
        let timeOverSlogans = ["YOU'RE TOO SLOW!", "TIME IS OVER!", "OH COME ON, GET FAST!", "NEXT TIME, DONT MISS IT!"];

        if(animType == "true"){
            loop = 0;
            document.getElementsByClassName("right")[0].innerText = trueSlogans[Math.round(Math.random() * (trueSlogans.length-1))];
            let ival = setInterval(() => {
                if(loop < 4){
                    gameBody.style.display = "none";
                    animDiv.style.display = "flex";

                    animDiv.style.backgroundColor = "green";
                    animDiv.style.color = "white";

                    setTimeout(() => {
                        animDiv.style.backgroundColor = "white";
                        animDiv.style.color = "green";    
                    }, 200);
                    loop++;
                }else{
                    clearInterval(ival)
                    gameBody.style.display = "flex";
                    animDiv.style.display = "none";
                    document.getElementsByClassName("right")[0].innerText = "";
                    blackbg.style.display = "none";
                    document.getElementById("answer").value = "";
                    contender.knownTrue();
                    this.remove(id)

                }                
            }, 300);

        }else if(animType == "false"){

            loop = 0;
            document.getElementsByClassName("false")[0].innerText = falseSlogans[Math.round(Math.random() * (falseSlogans.length-1))];
            let ival = setInterval(() => {
                if(loop < 4){
                    gameBody.style.display = "none";
                    animDiv.style.display = "flex";

                    animDiv.style.backgroundColor = "rgb(211, 7, 7)";
                    animDiv.style.color = "white";

                    setTimeout(() => {
                        animDiv.style.backgroundColor = "white";
                        animDiv.style.color = "rgb(211, 7, 7)";    
                    }, 200);
                    loop++;
                }else{
                    clearInterval(ival)

                    animDiv.style.backgroundColor = "white";
                    animDiv.style.color = "rgb(211, 7, 7)";    
                    animDiv.style.fontSize = "50px";
                    document.getElementsByClassName("false")[0].innerText = "RIGHT ANSWER : " + answer

                    setTimeout(() => {
                        gameBody.style.display = "flex";
                        animDiv.style.display = "none";
                        animDiv.style.fontSize = "60px";
                        document.getElementsByClassName("false")[0].innerText = ""
                        blackbg.style.display = "none";
                        document.getElementById("answer").value = "";
                        contender.knownWrong();

                        this.remove(id)                            
                    }, 2000);






                }                
            }, 300);

        }else if(animType == "timeOver"){
            loop = 0;
            document.getElementsByClassName("time-over")[0].innerText = timeOverSlogans[Math.round(Math.random() * (timeOverSlogans.length-1))];
            let ival = setInterval(() => {
                if(loop < 4){
                    gameBody.style.display = "none";
                    animDiv.style.display = "flex";

                    animDiv.style.backgroundColor = "#ff8c00";
                    animDiv.style.color = "white";

                    setTimeout(() => {
                        animDiv.style.backgroundColor = "white";
                        animDiv.style.color = "#ff8c00";    
                    }, 200);
                    loop++;
                }else{
                    clearInterval(ival)
                    gameBody.style.display = "flex";
                    animDiv.style.display = "none";
                    document.getElementsByClassName("time-over")[0].innerText = ""
                    document.getElementsByClassName("blackbg")[0].style.display = "none";
                    document.getElementById("answer").value = "";
                    contender.notKnown();
                    this.remove(id)


                }                
            }, 300);
        }
    }

    remove(id){
        let wordToRemove = document.getElementById(id);
        wordToRemove.remove();

        if(document.getElementsByClassName("word").length == 0){
            let results = document.getElementsByClassName("result")[0].innerHTML;
            document.getElementsByClassName("game")[0].style.flexDirection = "column";
            document.getElementsByClassName("game")[0].style.justifyContent = "space-evenly";
            document.getElementsByClassName("game")[0].style.alignItems = "center";
            document.getElementsByClassName("game")[0].style.fontSize = "60px";

            

            document.getElementsByClassName("game")[0].innerHTML = `<div style='margin-bottom:40px; color:yellow; font-family:"Signika Negative", sans-serif;'>GAME OVER</div><div class='result' style='margin-bottom:20px;'>` + results + `</div><div style='font-size:20px !important; color:white; font-family:"Cabin", sans-serif;'>Yeniden oynamak için sayfayı yenileyin</div>`;
            document.getElementsByClassName("result")[0].style.height = "unset";
        }
    }

    clear_cache(){
        this.words = undefined;
    }

    write(id, newKey, newMeaning, classNo){

        fetch("./core/server/FileManager.php", {
            method : "POST",
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body : "class_no="+classNo+"&id="+id+"&new_key="+newKey+"&new_meaning="+newMeaning
        })
        .then((res) => res.text())
        .then((res) => {
            console.log(res)
        })
        .catch((e) => console.error(e));
    }

    create(id, key, meaning, classNo){
        fetch("./core/server/FileManager.php", {
            method : "POST",
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body : "class_no="+classNo+"&id="+id+"&key="+key+"&meaning="+meaning
        })
        .then((res) => res.text())
        .then((res) => {
            console.log(res)
        })
        .catch((e) => console.error(e));
    }

    validate(username, password){
        fetch("./core/server/FileManager.php", {
            method : "POST",
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body : "username="+username+"&password="+password
        })
        .then((res) => res.text())
        .then((res) => {
            if(res == "0"){
                alert("Kullanıcı adı veya şifre hatalı")
            }else if(res == "1"){
                new PageRender().render("customize/words.html", "customize/app.js")
                this.classNo = 0;
            }
        })
        .catch((e) => console.error(e));
    }
}