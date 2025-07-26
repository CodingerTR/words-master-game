words.fetchWords("get");

let interval = setInterval(() => {
    if(document.getElementsByClassName("word-key").length > 0){
        clearInterval(interval)


        var wordKeys = document.getElementsByClassName("word-key");
        var wordMeanings = document.getElementsByClassName("word-meaning");

        var keyIndex;
        var meaningIndex;

        var targetedIdKey = 0;
        var targetedIdMeaning = 0;

        var activatedKey = false;
        var activatedMeaning = false;
        var debounce = false;

        for(let i = 0; i < wordKeys.length; i++){
            debounce = false
            wordKeys[i].addEventListener("dblclick", e => {
                console.log("double clicked")
                if(!debounce){
                    keyIndex = i; 
                    targetedIdKey = e.target.id;
                    e.target.innerHTML = "<input type='text' class='new-input' value='"+ e.target.innerText+"'>"; 
                    e.target.children[0].focus();   
                    debounce = true;
                    activatedKey = true;
                }
            })
        }


        for(let i = 0; i < wordMeanings.length; i++){
            debounce = false;
            wordMeanings[i].addEventListener("dblclick", e => {
                if(!debounce){
                    meaningIndex = i; 
                    targetedIdMeaning = e.target.id;
                    e.target.innerHTML = "<input type='text' class='new-input' value='"+ e.target.innerText+"'>";    
                    e.target.children[0].focus();   
                    debounce = true;
                    activatedMeaning = true;
                }
            })
        }

        document.body.addEventListener("click", e => {
            if(activatedKey){
                if(e.target.id != targetedIdKey && e.target.parentElement.id != targetedIdKey){
                    let meaning = document.getElementById(targetedIdKey).nextElementSibling.innerText;
                    let key = wordKeys[keyIndex].children[0].value;

                    if(!(key == null || key == "")){
                        wordKeys[keyIndex].innerHTML = key;
                        write(targetedIdKey.slice(2), key, meaning, targetedIdKey[1]);      
                        
                        debounce = false;
                        activatedKey = false;    
                    }

                    
                    
                }    
            }
        })
        document.body.addEventListener("click", e => {
            if(activatedMeaning){
                if(e.target.id != targetedIdMeaning && e.target.parentElement.id != targetedIdMeaning){
                    let meaning = wordMeanings[meaningIndex].children[0].value;
                    let key = document.getElementById(targetedIdMeaning.slice(1)).innerText;

                    if(!(meaning == null || meaning == "")){
                       wordMeanings[meaningIndex].innerHTML = meaning;
                       write(targetedIdMeaning.slice(3), key, meaning, targetedIdMeaning[2]);    

                       debounce = false;
                       activatedMeaning = false;
    
                    }


                }    
            }
        })


        let buttons = document.getElementsByClassName("add-span");
        for(let i = 0; i < buttons.length; i++){
            buttons[i].addEventListener("click", e => {
                let classId = e.target.id.charAt(e.target.id.length-1);
                let wordsTable = document.getElementById("grade"+classId);
                let lastId = parseInt(document.getElementsByClassName("words-table")[classId].lastElementChild.getElementsByClassName("word-id")[0].innerText);

                let newWord = document.createElement("div");
                let wordId = document.createElement("div");
                let wordKey = document.createElement("div");
                let wordMeaning = document.createElement("div");

                let btnContainer = document.createElement("div");
                let addButton = document.createElement("div");

                let inputKey = document.createElement("input");
                let inputMeaning = document.createElement("input");

                inputKey.id = "new-key-input"
                inputKey.autocomplete = "off"
                inputKey.className = "new-input"

                inputMeaning.id = "new-meaning-input"
                inputMeaning.autocomplete = "off"
                inputMeaning.className = "new-input"                

                newWord.className = "word-row";
                wordId.className = "word-id";
                wordKey.className = "word-customize word-key";
                wordMeaning.className = "word-customize word-meaning";
                addButton.className = "add-word-button";
                btnContainer.className = "btn-container";

                addButton.innerText = "EKLE";
                wordId.innerText = lastId+1;
                wordKey.id = classId + "" + (lastId+1);
                wordMeaning.id = classId + "" + classId + "" + (lastId+1);

                wordKey.append(inputKey)
                wordMeaning.append(inputMeaning)

                newWord.append(wordId)
                newWord.append(wordKey)
                newWord.append(wordMeaning)

                wordsTable.append(newWord);

                addButton.addEventListener("click", e => {
                    let id = lastId+1
                    let newKey = document.getElementById("new-key-input").value
                    let newMeaning = document.getElementById("new-meaning-input").value


                    let wordsKey = document.getElementsByClassName("word-key");
                    let wordsMeaning = document.getElementsByClassName("word-meaning");

                    wordsKey = wordsKey[wordsKey.length-1]
                    wordsMeaning = wordsMeaning[wordsMeaning.length-1]

                    if(!((newKey == "" || newKey == null) || (newMeaning == "" || newMeaning == null))){
                        wordKey.innerHTML = newKey;
                        wordMeaning.innerHTML = newMeaning;
    
                        wordsTable.removeChild(btnContainer)
    
                        
                        words.create(id, wordKey.innerText, wordMeaning.innerText, classId)    
                    }

                })

                btnContainer.append(addButton)
                wordsTable.append(btnContainer);



    
            })    
        }






    }    
}, 100);


