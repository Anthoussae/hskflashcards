fetch('HSKRAW.txt')
  .then(res => res.text())
  .then(str => {
    processor(str);
    subdivider(cardArray);
  })



let cardArray = [];
let temp = '';

let finalArray  = [];

let hsk1Array = [];
let hsk2Array = [];
let hsk3Array = [];
let hsk4Array = [];
let hsk5Array = [];
let hsk6Array = [];

// processor works
// puts each line from the text file into an array
// then puts each of those arrays into cardArray.
// checks for and accounts for multiple entries on a given line.

function processor(str){
    let spaceCounter = 0;
    for (let i = 0; i < str.length; i++){
        if (str[i] === " "){
            spaceCounter =  spaceCounter +  1;
        }
        if (/\n/.test(str[i])){
            cardArray.push(temp);
            temp = '';
        }
        else if (i === 0){
            temp = temp + str[0];
        }
        else if (i === str.length-1){
            temp = temp + str[i];
            cardArray.push(temp);
            temp = '';
        }
        else if (spaceCounter > 1 && str[i] === " " && /[\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]/.test(str[i+1])){
            temp = temp + str[i-1];
            cardArray.push(temp);
            temp = '';
            spaceCounter = 0;
        }
        else {
            temp = temp+str[i];
        }
    }
}

// subdivider works, sets the appropriate HSK level array to a 2D array.
// pulls data from cardArray.
// each subarray is in the format [hanzi, pinyin, english].

function subdivider(arr){

    let spaceCounter = 0;
    let character = '';
    let pinyin = '';
    let english = '';
    let subtemp = '';

    for (let i = 0; i < arr.length; i++){
        
        if (i > 0){
            if (/[\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]/.test(character)){
                 finalArray.push([character, pinyin, english]);
            }
            character = '';
            pinyin = '';
            english = '';
            subtemp = '';
        }

        for (let j = 0; j < arr[i].length; j++) {

            if (arr[i][j] === " " && spaceCounter === 0){
                spaceCounter = spaceCounter + 1;
                character = subtemp;
                subtemp = '';
            }

            else if (arr[i][j] === " " && spaceCounter === 1){
                spaceCounter = spaceCounter + 1;
                pinyin = subtemp;
                subtemp = '';
            }

            else if (j === arr[i].length - 1){
                spaceCounter = 0;
                english = subtemp;
                subtemp = '';
            }

            else if (arr[i][j] === "い"){
                hsk1Array = finalArray;
                console.log("HSK1 wordlist loaded");
                finalArray =  [];
            }
            else if (arr[i][j] === "に"){
                hsk2Array = finalArray;
                console.log("HSK2 wordlist loaded");
                finalArray =  [];
            }
            else if (arr[i][j] === "さ"){
                hsk3Array = finalArray;
                console.log("HSK3 wordlist loaded");
                finalArray =  [];
            }
            else if (arr[i][j] === "し"){
                hsk4Array = finalArray;
                console.log("HSK4 wordlist loaded");
                finalArray =  [];
            }
            else if (arr[i][j] === "ご"){
                hsk5Array = finalArray;
                console.log("HSK5 wordlist loaded");
                finalArray =  [];
            }
            else {
                subtemp = subtemp + arr[i][j];
            }
        }
    }
    hsk6Array = finalArray;
    console.log("HSK6 wordlist loaded");
}

// interface design please
// choose which HSK level.
// choose 

let level = 1;
let heldHan = "欢迎!";
let heldPin = "huān yíng!";
let heldEng = "Welcome!";
let radioElement1 = document.getElementById("radio1");
let radioElement2 = document.getElementById("radio2");
let radioElement3 = document.getElementById("radio3");
let radioElement4 = document.getElementById("radio4");
let radioElement5 = document.getElementById("radio5");
let radioElement6 = document.getElementById("radio6");

function setLevel1(){
    level = 1;
    document.getElementById("lvldisplay").innerHTML = "LEVEL: 1 （一级）";
}

function setLevel2(){
    level = 2;
    document.getElementById("lvldisplay").innerHTML = "LEVEL: 2 （二级）";
}

function setLevel3(){
    level = 3;
    document.getElementById("lvldisplay").innerHTML = "LEVEL: 3 （三级）";

}

function setLevel4(){
    level = 4;
    document.getElementById("lvldisplay").innerHTML = "LEVEL: 4 （四级）";

}

function setLevel5(){
    level = 5;
    document.getElementById("lvldisplay").innerHTML = "LEVEL: 5 （五级）";

}

function setLevel6(){
    level = 6;
    document.getElementById("lvldisplay").innerHTML = "LEVEL: 6 （六级）";

}

//currently works fairly well but: sometimes return undefined error (dunno what's wrong, seems to be an issue with the random number generator)

function randomCharacter(){
    if (level === 1){
         let randomNumber = Math.floor(Math.random() * hsk1Array.length-1);
         heldHan = hsk1Array[randomNumber][0];
         heldPin = hsk1Array[randomNumber][1];
         heldEng = hsk1Array[randomNumber][2];
         console.log(randomNumber);
         console.log(heldHan, heldPin, heldEng);
    }
    else if (level === 2){
        let randomNumber = Math.floor(Math.random() * hsk2Array.length-1);
        heldHan = hsk2Array[randomNumber][0];
        heldPin = hsk2Array[randomNumber][1];
        heldEng = hsk2Array[randomNumber][2];
        console.log(heldHan, heldPin, heldEng);
    }
    else if (level === 3){
        let randomNumber = Math.floor(Math.random() * hsk3Array.length-1);
        heldHan = hsk3Array[randomNumber][0];
        heldPin = hsk3Array[randomNumber][1];
        heldEng = hsk3Array[randomNumber][2];
        console.log(heldHan, heldPin, heldEng);
    }
    else if (level === 4){
        let randomNumber = Math.floor(Math.random() * hsk4Array.length-1);
        heldHan = hsk4Array[randomNumber][0];
        heldPin = hsk4Array[randomNumber][1];
        heldEng = hsk4Array[randomNumber][2];
        console.log(heldHan, heldPin, heldEng);
    }
    else if (level === 5){
        let randomNumber = Math.floor(Math.random() * hsk5Array.length-1);
        heldHan = hsk5Array[randomNumber][0];
        heldPin = hsk5Array[randomNumber][1];
        heldEng = hsk5Array[randomNumber][2];
        console.log(heldHan, heldPin, heldEng);
    }
    else if (level === 6){
        let randomNumber = Math.floor(Math.random() * hsk6Array.length-1);
        heldHan = hsk6Array[randomNumber][0];
        heldPin = hsk6Array[randomNumber][1];
        heldEng = hsk6Array[randomNumber][2];
        console.log(heldHan, heldPin, heldEng);
    }
    else{
        console.log("error");
    }
    document.getElementById("handisplay").innerHTML = heldHan;
    document.getElementById("pindisplay").innerHTML = "Show Pinyin";
    document.getElementById("engdisplay").innerHTML = "Show English";
}

function showPinyin(){
    document.getElementById("pindisplay").innerHTML = heldPin;
    // document.getElementById("pindisplay").style.background = "white";
    // document.getElementById("pindisplay").style.outlineColor = "white";
    // document.getElementById("pindisplay").style.outlineWidth = "0px";
}

function showEnglish(){
    document.getElementById("engdisplay").innerHTML = heldEng;
    // document.getElementById("engdisplay").style.background = "white";
    // document.getElementById("engdisplay").style.outlineColor = "white";
}

