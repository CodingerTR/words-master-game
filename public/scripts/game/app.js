words.fetchWords("game", contender.classNo);
let interval = setInterval(() => {
    let wordPapers = document.querySelectorAll(".word");
    let wordCount = wordPapers.length;

    if(wordCount > 0){
        clearInterval(interval);
        if(wordCount > 117){
            document.getElementsByClassName("wordsContainer")[0].style.width = "80%";
            document.getElementsByClassName("wordsContainer")[0].style.height = "90%";
            for(let i = 0; i < wordCount; i++){
                wordPapers[i].style.width = "7%";
                wordPapers[i].style.height = "4%";
            }
        }
        else if(wordCount > 96){
            for(let i = 0; i < wordCount; i++){
                wordPapers[i].style.width = "9%";
                wordPapers[i].style.height = "5%";
            }
        }
        else if(wordCount > 80){
            for(let i = 0; i < wordCount; i++){
                wordPapers[i].style.width = "10%";
                wordPapers[i].style.height = "6%";
            }
        }
        else if(wordCount > 63){
            for(let i = 0; i < wordCount; i++){
                wordPapers[i].style.width = "11%";
                wordPapers[i].style.height = "7%";
            }
        }else if(wordCount > 42){
            for(let i = 0; i < wordCount; i++){
                wordPapers[i].style.width = "9%";
                wordPapers[i].style.height = "9%";
            }
        }
        function openWord(wordId, classNo){
            return words.ask(wordId, classNo);
        }
        
        var answer;
        var idToRemove;

        for(let i = 0; i < wordCount; i++){
            wordPapers[i].addEventListener("click", e => {
                answer = openWord(wordPapers[i].id, contender.classNo)
                idToRemove = answer[1];
                answer = answer[0];
                
            })
        }    

        document.getElementById("button-send").addEventListener("click", e => {
            words.analizeResult(answer, idToRemove);
        })
    }

}, 200);