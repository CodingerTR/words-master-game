class PageRender{
    constructor(){

    }

    render(path, scriptPaths=null){
        fetch("./public/html/" + path)
        .then((res) => res.text())
        .then((html) => {
            document.body.innerHTML = html;
            if(scriptPaths != null){
                let scriptContent;
                let script;

                if(Array.isArray(scriptPaths)){
                    for(let i = 0; i < scriptPaths.length; i++){
                        scriptContent = "<script src='./public/scripts/"+scriptPaths[i]+"?time="+new Date().getTime()+"'></script>"
                        script = document.createRange().createContextualFragment(scriptContent);
                        document.body.append(script) 
                    }

                }else{
                    scriptContent = "<script src='./public/scripts/"+scriptPaths+"?time="+new Date().getTime()+"'></script>"
                    script = document.createRange().createContextualFragment(scriptContent);
                    setTimeout(() => {
                        document.body.append(script)                    
                    }, 100);    
                }
            }
        })
        .catch((e) => console.error(e));

    }
}
