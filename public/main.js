// retrieves the text file with the full wordlist 
// then runs the functions that process the raw text into useable arrays.

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
// array is in the format [[hanzi, pinyin, english],[hanzi, pinyin, english],[hanzi, pinyin, english],[hanzi, pinyin, english]].

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
                subtemp = subtemp + arr[i][j];
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
            //testing line start
            else if (arr[i+1][j] === "ろ"){
                hsk6Array = finalArray;
                console.log("HSK6 wordlist loaded");
                finalArray = [];
            }
            //testing line end
            else {
                subtemp = subtemp + arr[i][j];
            }
        }
    }
    // hsk6Array = finalArray;
    // console.log(hsk6Array.length);
    // console.log("HSK6 wordlist loaded");
}

//radio butttons and startup data.

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
    document.getElementById("lvldisplay").innerHTML = "HSK LEVEL: 1 &nbsp &nbsp 汉语水平考试 （一级）";
}

function setLevel2(){
    level = 2;
    document.getElementById("lvldisplay").innerHTML = "HSK LEVEL: 2 &nbsp &nbsp 汉语水平考试 （二级）";
}

function setLevel3(){
    level = 3;
    document.getElementById("lvldisplay").innerHTML = "HSK LEVEL: 3 &nbsp &nbsp 汉语水平考试 （三级）";

}

function setLevel4(){
    level = 4;
    document.getElementById("lvldisplay").innerHTML = "HSK LEVEL: 4 &nbsp &nbsp 汉语水平考试 （四级）";

}

function setLevel5(){
    level = 5;
    document.getElementById("lvldisplay").innerHTML = "HSK LEVEL: 5 &nbsp &nbsp 汉语水平考试 （五级）";

}

function setLevel6(){
    level = 6;
    document.getElementById("lvldisplay").innerHTML = "HSK LEVEL: 6 &nbsp &nbsp 汉语水平考试 （六级）";

}

//currently essentially unused. System needs a hash code generator for the tests.
let codeBox = [];
let hashCode = 0;

//generates a random character.

function randomCharacter(){

    document.getElementById("pindisplay").classList.remove('pressed');
    document.getElementById("pindisplay").classList.remove('unpressed');
    document.getElementById("pindisplay").classList.add('unpressed');
    document.getElementById("engdisplay").classList.remove('pressed2');
    document.getElementById("engdisplay").classList.remove('unpressed');
    document.getElementById("engdisplay").classList.add('unpressed');
   
    if (level === 1){
         let randomNumber = Math.floor(Math.random() * hsk1Array.length-1);
         if (randomNumber < 0){
             randomNumber = 1;
         }
         if (hsk1Array[randomNumber].length === 3){
             heldHan = hsk1Array[randomNumber][0];
             heldPin = hsk1Array[randomNumber][1];
             heldEng = hsk1Array[randomNumber][2];
             console.log(heldHan, heldPin, heldEng);
             codeBox.push(randomNumber);

         }
         else {
             console.log("error");
         }
    }
    else if (level === 2){
        let randomNumber = Math.floor(Math.random() * hsk2Array.length-1);
        if (randomNumber < 0){
            randomNumber = 1;
        }
        heldHan = hsk2Array[randomNumber][0];
        heldPin = hsk2Array[randomNumber][1];
        heldEng = hsk2Array[randomNumber][2];
        console.log(heldHan, heldPin, heldEng);
        codeBox.push(randomNumber);

    }
    else if (level === 3){
        let randomNumber = Math.floor(Math.random() * hsk3Array.length-1);
        if (randomNumber < 0){
            randomNumber = 1;
        }
        heldHan = hsk3Array[randomNumber][0];
        heldPin = hsk3Array[randomNumber][1];
        heldEng = hsk3Array[randomNumber][2];
        console.log(heldHan, heldPin, heldEng);
        codeBox.push(randomNumber);

    }
    else if (level === 4){
        let randomNumber = Math.floor(Math.random() * hsk4Array.length-1);
        if (randomNumber < 0){
            randomNumber = 1;
        }
        heldHan = hsk4Array[randomNumber][0];
        heldPin = hsk4Array[randomNumber][1];
        heldEng = hsk4Array[randomNumber][2];
        console.log(heldHan, heldPin, heldEng);
        codeBox.push(randomNumber);

    }
    else if (level === 5){
        let randomNumber = Math.floor(Math.random() * hsk5Array.length-1);
        if (randomNumber < 0){
            randomNumber = 1;
        }
        heldHan = hsk5Array[randomNumber][0];
        heldPin = hsk5Array[randomNumber][1];
        heldEng = hsk5Array[randomNumber][2];
        console.log(heldHan, heldPin, heldEng);
        codeBox.push(randomNumber);

    }
    else if (level === 6){
        let randomNumber = Math.floor(Math.random() * hsk6Array.length-1);
        if (randomNumber < 0){
            randomNumber = 1;
        }
        heldHan = hsk6Array[randomNumber][0];
        heldPin = hsk6Array[randomNumber][1];
        heldEng = hsk6Array[randomNumber][2];
        console.log(heldHan, heldPin, heldEng);
        codeBox.push(randomNumber);

    }
    else{
        console.log("error");
    }
    document.getElementById("handisplay").innerHTML = heldHan;
    document.getElementById("pindisplay").innerHTML = "Pinyin";
    document.getElementById("engdisplay").innerHTML = "English";
    if (codeBox.length > 200){
        codeBox = [];
    }
}

// these functions govern the pinyin / english reveal buttons.

function showPinyin(){
    document.getElementById("pindisplay").classList.remove('pressed');
    document.getElementById("pindisplay").classList.remove('unpressed');
    document.getElementById('pindisplay').classList.add('pressed');
    document.getElementById("pindisplay").innerHTML = heldPin;
}

function showEnglish(){
    document.getElementById("engdisplay").innerHTML = heldEng;
    document.getElementById("engdisplay").classList.remove('pressed2');
    document.getElementById("engdisplay").classList.remove('unpressed');
    document.getElementById('engdisplay').classList.add('pressed2');
}

//exam generators.

let twentyWordExam = [];
let hundredWordExam = [];
let currentExam;

//generate 20-word and 100-word exams and sets 'current exam' to them.

function genTwenty(){
    twentyWordExam = [];
    randomCharacter();
    let doubled = false;
    twentyWordExam.push([heldHan, heldPin, heldEng]);
    while (twentyWordExam.length < 20){
        doubled = false;
        randomCharacter();
        for (let i = 0; i < twentyWordExam.length; i++){
            if (heldHan === twentyWordExam[i][0]){
                doubled = true;
            }
        }
        if (doubled === false){
            twentyWordExam.push([heldHan, heldPin, heldEng]);
        }
        else {
            console.log("reroll");
            randomCharacter();
            doubled = false;
        }
   }
   console.log("Test built succesfully");
   currentExam = twentyWordExam;
   windowOpener();
   codeBox = [];
   hashCode = 0;
}

//actually generates 44, leaving as-is for now.
function genHundred(){
    hundredWordExam = [];
    randomCharacter();
    let doubled = false;
    hundredWordExam.push([heldHan, heldPin, heldEng]);
    while (hundredWordExam.length < 44){
        doubled = false;
        randomCharacter();
        for (let i = 0; i < hundredWordExam.length; i++){
            if (heldHan === hundredWordExam[i][0]){
                doubled = true;
            }
        }
        if (doubled === false){
            hundredWordExam.push([heldHan, heldPin, heldEng]);
        }
        else {
            console.log("reroll");
            randomCharacter();
            doubled = false;
        }
   }
   console.log("Test built succesfully");
   currentExam = hundredWordExam;
   windowOpener();
   codeBox = [];
   hashCode = 0;
}

// opens a window with the test.

function windowOpener() {
    codeGenerator();
    testCleaner();
    var myWindow = window.open("", "MsgWindow", "width=563,height=750");
    myWindow.document.write('');
    myWindow.document.write(currentExam.toString());
    console.log("Test Code: " + hashCode);
  }

  //generates the html for an exam paper and the answers.

  function testCleaner(){
    let html = '';
    let size =  currentExam.length;
    let category;
    let leftIndent = 0;
    if (size < 100){
        category = "small";
    }
    else {
        category = "large";
    }
    let row = '';
    let items = 0;
    html = html + hashCode +"&#12288;" +"&#12288;" +"&#12288;" + "Student Name: "+"&#12288;" +"&#12288;" +"&#12288;" +"&#12288;" +"&#12288;" +"&#12288;"  +"&#12288;" +"&#12288;" +"&#12288;" +"&#12288;" +"Date: " + "&#12288;" + "&#12288;" + "&#12288;"; 
    html = html + "&#12288;" +"&#12288;" +"&#12288;";
    if (level === 1){
        html = html + "HSK Level 1";
    }
    else if (level === 2){
        html = html + "HSK Level 2";
    }
    else if (level === 3){
      html = html + "HSK Level 3";
    }
    else if (level === 4){
      html = html + "HSK Level 4";
    }
    else if (level === 5){
      html = html + "HSK Level 5";
    }
    else if (level === 6){
      html = html + "HSK Level 6";
    }
    html = html + "<br></br>"
    html = html + "<br></br>"

    for (let i = 0; i < size; i++){
        if (items === 0){
            items = items + 1;
            row = row + "&#12288;";
            row =  row + "&nbsp" + "&nbsp" + (i+1) + ".";
            if (category === "small" && (i+1) < 10){
                row = row + "&nbsp" +  "&nbsp";
            }
            else if (category === "large" && (i+1) < 10){
                row = row +  "&nbsp" +  "&nbsp" + "&nbsp" +  "&nbsp";
            }
            else if (category === "large" && (i+1) < 100){
                row = row +  "&nbsp" + "&nbsp";
            }
            row = row + "&#12288;" + currentExam[i][0] + ":";
            leftIndent = 4 - currentExam[i][0].length;
            for (let n = 0; n < leftIndent; n++){
                row = row + "&#12288;";
            }
        }
        else {
            items = 0;
            indent = leftIndent - currentExam[i][0].length;
            for (let j = 0; j < 10; j++){
                row = row + "&#12288;";
            }
         
            row = row + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + (i+1) + ".";
            if (category === "small" && (i+1) < 10){
              row = row + "&nbsp" +  "&nbsp";
          }
          else if (category === "large" && (i+1) < 10){
              row = row +  "&nbsp" +  "&nbsp" + "&nbsp" +  "&nbsp";
          }
          else if (category === "large" && (i+1) < 100){
              row = row +  "&nbsp" + "&nbsp";
          }
            row = row + "&#12288;" + currentExam[i][0] + ":";
            row = row + "<br></br>";
            html = html + row;
            row = '';
        }
    }
    html = html + "<br></br>";
    html = html + hashCode +"&nbsp"+ "&#12288;" +"&#12288;" + "answersheet" + "&#12288;"+ "&#12288;"+ "&#12288;" + "feedback: james.stonelunde@berkeley.edu";
    html = html + "<br></br>";
    for (let i = 0; i < size; i++){
        if (items === 0){
            items = items + 1;
            row = row + "&#12288;";
            row =  row + "&nbsp" + (i+1) + ".";
            if (category === "small" && (i+1) < 10){
                row = row + "&nbsp" +  "&nbsp";
            }
            else if (category === "large" && (i+1) < 10){
                row = row +  "&nbsp" +  "&nbsp" + "&nbsp" +  "&nbsp";
            }
            else if (category === "large" && (i+1) < 100){
                row = row +  "&nbsp" + "&nbsp";
            }
            row = row + "&#12288;" + currentExam[i][0] + "&#12288;" + currentExam[i][1] + ", " + "&nbsp"+"&nbsp"+ currentExam[i][2];
            leftIndent = 4 - currentExam[i][0].length;
           
        }
        else {
            items = 0;
            indent = leftIndent - currentExam[i][0].length;
            for (let j = 0; j < 2; j++){
                row = row + "&#12288;";
            }
         
            row = row + "&nbsp" + (i+1) + ".";
            if (category === "small" && (i+1) < 10){
              row = row + "&nbsp" +  "&nbsp";
          }
          else if (category === "large" && (i+1) < 10){
              row = row +  "&nbsp" +  "&nbsp" + "&nbsp" +  "&nbsp";
          }
          else if (category === "large" && (i+1) < 100){
              row = row +  "&nbsp" + "&nbsp";
          }
            row = row + "&#12288;" + currentExam[i][0] + "&#12288;" + currentExam[i][1] + ", " + "&nbsp"+"&nbsp"+ currentExam[i][2];
            row = row + "<br></br>";
            html = html + row;
            row = '';
        }
    }
    currentExam = html;
}

//unique test code hash generator.(nonreversible)
function codeGenerator(){
    hashCode = "L" + level.toString();
    let tempVal = Math.floor(Math.random()*100000);
    if (codeBox.length < 45){
        hashCode = hashCode + "S";
    }
    else {
        hashCode = hashCode + "B";
    }
    hashCode = hashCode + tempVal.toString();
    let randomizer = Math.floor(randomNumber(0, hsk6Array.length));
    hashCode = hashCode + hsk6Array[randomizer][0][0];
}

//generates a random number between two limits
function randomNumber(min, max) {  
    return Math.random() * (max - min) + min; 
}  

//let's build in-browser test-taking technology!

let homePageHTML = document.getElementById("all").innerHTML;
let testPageHTML =  "<button" + " onclick" + "=" + "'" + "exit()" + "'" + '>' +  "abandon test </button>";

function onlineTestSmall(){
    document.getElementById("all").innerHTML= testPageHTML;
}

function onlineTestLarge(){
    document.getElementById("all").innerHTML= testPageHTML;
    // genHundred();
    // document.getElementById('printdiv').innerHTML = currentExam;
    // let printDiv= document.getElementById('printdiv');
    // let superDiv  = document.getElementById('superdiv');
    // printDiv.style.display = 'block';
    // superDiv.style.display = 'none';
}

function exit(){
    document.getElementById("all").innerHTML = homePageHTML;
    heldHan = "欢迎!";
    heldPin = "huān yíng!";
    heldEng = "Welcome!";
    level = 1;
    // location.reload();
}