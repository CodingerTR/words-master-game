<?php
class FileManager{
    public $username = "aycarodoplu";
    public $password = "1923Ayca";
    public $wordsPath = "../../words.json";
    public $auth;

    public function __construct(){
        session_start();
        if(@$_SESSION["auth"] == true){
            $this->auth = true;
        }else{
            $this->auth = false;
        }    
    }

    public function write($classNo, $id, $newKey, $newMeaning){
        if($this->auth == true){
            echo $_SESSION["auth"] . " var";
            $file = $this->get_include_contents($this->wordsPath);

            $obj = json_decode($file, true);
            $newWord = '{"id" : '.$id.', "word" : "'.$newKey.'", "tr" : "'.$newMeaning.'"}';
            $newWord = json_decode($newWord, true);

            $obj[$classNo][$id-1] = $newWord;

            $obj = json_encode($obj, JSON_UNESCAPED_UNICODE);
            file_put_contents($this->wordsPath, $obj);
                
        }else{
            echo "validation failed";
        }
    }

    public function create($classNo, $id, $key, $meaning){
        if($this->auth == true){
            $file = $this->get_include_contents($this->wordsPath);
            $obj = json_decode($file, true);

            $word = '{"id" : '.$id.', "word" : "'.$key.'", "tr" : "'.$meaning.'"}';
            $word = json_decode($word, true);

            array_push($obj[$classNo], $word);

            $obj = json_encode($obj, JSON_UNESCAPED_UNICODE);
            file_put_contents($this->wordsPath, $obj);

        }
    }


    public function getWords(){
        $file = $this->get_include_contents($this->wordsPath);
        return $file;
    }

    public function get_include_contents($filename) {
        if (is_file($filename)) {
            ob_start();
            include $filename;
            $contents = ob_get_contents();
            ob_end_clean();
            return $contents;
        }
        return false;
    }

    public function validate($username, $password){
        if($username == $this->username && $password == $this->password){
            $this->auth = true;
            $_SESSION["auth"] = true;
            echo "1";
        }else{
            echo "0";
        }
    }

    public function check(){
        return $this->auth;
    }

}

$fileManager = new FileManager();

if(@$_GET["o"] == "getWords"){
    echo $fileManager->getWords();
}
if(@$_GET["o"] == "check"){
    echo $fileManager->check();
}

if(@$_POST["username"]){
    $fileManager->validate($_POST["username"], $_POST["password"]);
}
if(@$_POST["new_key"]){
    $classNo = $_POST["class_no"];
    $id = $_POST["id"];
    $newKey = $_POST["new_key"];
    $newMeaning = $_POST["new_meaning"];
    
    $fileManager->write($classNo, $id, $newKey, $newMeaning);    
}
if(@$_POST["key"]){
    $classNo = $_POST["class_no"];
    $id = $_POST["id"];
    $key = $_POST["key"];
    $meaning = $_POST["meaning"];
    
    $fileManager->create($classNo, $id, $key, $meaning);    

}
?>