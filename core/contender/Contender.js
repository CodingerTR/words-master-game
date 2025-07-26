class Contender{
    constructor(){
        this.points = 0;
        this.true = 0;
        this.false = 0;
        this.classNo;
    }

    setClass(classNo){
        this.classNo = classNo
    }

    knownTrue(){
        this.points += 10;
        this.true += 1;
        document.getElementById("point").innerText = this.points;
        document.getElementById("true").innerText = this.true;
    }

    knownWrong(){
        this.points -= 10;
        this.false += 1;
        document.getElementById("point").innerText = this.points;
        document.getElementById("false").innerText = this.false;
    }

    notKnown(){
        this.points -= 5;
        document.getElementById("point").innerText = this.points;
    }
}

var contender = new Contender();