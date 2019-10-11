let Result = document.querySelector('#ecran .result');

let isStart = false;
let operatorsTab = ['+','*','-','/','%'];
let endOfMathFunctions = ['s','n','t','p','0','h','v'];
let beginOfMathFunctions = ['c','s','t','e','l'];
const val = value => {
    if(isStart){
        if (Result.textContent[0] === "0" || Result.textContent === "Error") {
            if(value !== "^"){
                Result.textContent = value;
            }
        } else {
                Result.textContent += value;
        }
        if(Result.textContent.length >= 23){
            Result.style.fontSize = "15px";
        }else{
            Result.style.fontSize = "20px";
        }
        document.querySelector('.error').style.opacity= "0";
    }
};


const supp = ()=> {
    if(isStart){
        if(Result.textContent.length === 1 || Result.textContent === "Error"){
            Result.textContent = "0";
        }else{
            let r =  Result.textContent;
            Result.textContent = r.slice(0,r.length-1);
        }
        if(Result.textContent.length >= 23){
            Result.style.fontSize = "15px";
        }else{
            Result.style.fontSize = "20px";
        }
        document.querySelector('.error').style.opacity= "0";
    }
};


const absolue = ()=>{
    if(isStart){
        Result.textContent = Math.abs(parseFloat(result(Result.textContent)));
    }
};

const carre = ()=>{
    if(isStart){
        Result.textContent = Math.pow(parseFloat(result(Result.textContent)),2);
    }
};


const ifInclude = (chaine,elcherche,elreplace) =>{
    let outputChaine = "";
    let verif = true;
    while(verif){
        if(chaine.includes(elcherche)){
            let  newChaine = chaine.slice(0,chaine.indexOf(elcherche[elcherche.length-1])+1);
            newChaine = newChaine.replace(elcherche,elreplace);
            outputChaine += newChaine;
            chaine = chaine.slice(chaine.indexOf(elcherche[elcherche.length-1])+1,chaine.length);
        }else{
            verif = false;
        }
    }
    outputChaine = outputChaine + chaine;
    return outputChaine;
};

   // console.log( tab.join(''));

const f = (chaine)=>{
    let tab = chaine.split('');
    let output = [];
    let nombre = "";
    let verifNombre = "";
    let verifNombre0 = "";
    let skap = false;
    let skap2 = false;
    for(let i = 0; i < tab.length ; i++){
        if(tab[i] === "(" && (operatorsTab.includes(tab[i-1]) || i === 0) && skap === false && skap2 === false){
            skap = true;
            continue;
        }
        if(tab[i] === "(" && endOfMathFunctions.includes(tab[i-1]) && skap === false && skap2 === false){
            skap2 = true;
            nombre+=tab[i];
            continue;
        }
        if(skap){
            if(tab[i] === ")") {
                if(verifNombre.includes("(")){
                    nombre += tab[i];
                }else{
                    skap = false;
                    console.log(nombre);
                    nombre = "(" + result(nombre.toString()) + ")";
                    console.log(nombre);
                }
                verifNombre = "";
            }else{
                nombre += tab[i];
                verifNombre += tab[i];
            }
        }else if(skap2){
            if(tab[i] === ")") {
                if(verifNombre0.includes("(")){
                    console.log(verifNombre0);
                    nombre += tab[i];
                }else{
                    skap2 = false;
                    console.log(nombre);
                    nombre += tab[i];
                    console.log(nombre);
                }
                verifNombre0 = "";
            }else{
                nombre += tab[i];
                verifNombre0 += tab[i];
            }
        }else{
            if(operatorsTab.includes(tab[i])){
                output.push(nombre);
                output.push(tab[i]);
                nombre = "";
            }else {
                nombre += tab[i];
            }
        }
        if(i === tab.length-1){
            output.push(nombre);
        }
    }
    console.log(output);
     for(let i = 0; i < output.length ; i++){
            let Tskap = false;
            let nombre2 = "";
            let nombre0 = "";
            let verifNombre2 = "";
        for(let l = 0; l < output[i].length; l++){
            if(output[i][l] === "(" && endOfMathFunctions.includes(output[i][output[i].indexOf("(")-1]) && Tskap === false){
                Tskap = true;
                nombre0 += output[i][l];
                continue;
            }
            if(Tskap){
                if(output[i][l] === ")"){
                    if(verifNombre2.includes("(")) {
                        nombre2 += output[i][l];
                    }else{
                        nombre0 += result(nombre2) + output[i][l];
                        nombre2 = "";
                        Tskap = false;
                    }
                    verifNombre2 = "";
                }else{
                    nombre2 += output[i][l];
                    verifNombre2 += output[i][l];
                }
                  console.log(nombre2);
            }else{
                nombre0 += output[i][l];
            }
            if(l === output[i].length-1){
                output[i] = nombre0;
                nombre0 = "";
            }
        }
    }
     console.log(output);
    for(let i = 0; i < output.length; i++){
        output[i] = ifInclude(output[i],'cos','Math.cos');
        output[i] = ifInclude(output[i],'sin','Math.sin');
        output[i] = ifInclude(output[i],'tan','Math.tan');
        output[i] = ifInclude(output[i],'exp','Math.exp');
        output[i] = ifInclude(output[i],'log','Math.log');
        output[i] = ifInclude(output[i],'pi','3.14');
        if(output[i].includes("^")){
                output[i] = `Math.pow(${output[i].slice(0,output[i].indexOf("^"))},${output[i].slice(output[i].indexOf("^")+1)})`;
        }
        if(output[i].includes("v")){
            output[i] = `Math.sqrt(${output[i].slice(output[i].indexOf("v") + 1)})`;
        }
        if(output[i].includes("(") && operatorsTab.includes(output[i][output[i].indexOf('(')-1])){
            output[i] = `Math.sqrt(${output[i].slice(output[i].indexOf("v") + 1)})`
        }
    }
    return output.join('');
};

const result = (el) => {
    let result = f(el);
    try {
        Result.textContent = eval(result);
        console.log(eval(result));
        return eval(result);
    }catch{
        document.querySelector('.error').style.opacity= "1";
    }

};

let key = [];
document.addEventListener('keyup',(e)=>{
    console.log(key.join(''));
    key.push(e.keyCode);
    if(!isStart) {
        if (key.join('').includes("8384658284")) {
            on();
            key = [];
        }
    }
    if(isStart) {
        if (e.keyCode === 97) val('1');
        else if (e.keyCode === 98) val('2');
        else if (e.keyCode === 99) val('3');
        else if (e.keyCode === 100) val('4');
        else if (e.keyCode === 101) val('5');
        else if (e.keyCode === 102) val('6');
        else if (e.keyCode === 103) val('7');
        else if (e.keyCode === 104) val('8');
        else if (e.keyCode === 105) val('9');
        else if (e.keyCode === 96) val('0');
        else if (e.keyCode === 110) val('.');
        else if (e.keyCode === 111) val('/');
        else if (e.keyCode === 106) val('*');
        else if (e.keyCode === 109) val('-');
        else if (e.keyCode === 107) val('+');
        else if (e.keyCode === 8) supp();
        else {
            key.push(e.keyCode);
            if (key.join('').includes("797070")) {
                off();
                key = [];
            }
        }
    }
});

/* fin des touches */


const C = ()=>{
    if(isStart){
        Result.textContent = "0";
        document.querySelector('.error').style.opacity= "0";
    }
};

/* gérer la seconde fonction  */

const setSecondF = ()=>{
    if(isStart){
        document.querySelector('.nde').style.opacity = "1";
        document.querySelector('.secondF').setAttribute('onclick','unsetSecondF();');
        document.querySelector('input[value="/"]').setAttribute('onclick','val("%")');
        document.querySelector('input[value="/"]').setAttribute('value','%');
        document.querySelector('input[value="cos"]').setAttribute('onclick','val("cosh(")');
        document.querySelector('input[value="cos"]').setAttribute('value','cosh');
        document.querySelector('input[value="sin"]').setAttribute('onclick','val("sinh(")');
        document.querySelector('input[value="sin"]').setAttribute('value','sinh');
        document.querySelector('input[value="tan"]').setAttribute('onclick','val("tanh(")');
        document.querySelector('input[value="tan"]').setAttribute('value','tanh');
        document.querySelector('input[value="log"]').setAttribute('onclick','val("log10(")');
        document.querySelector('input[value="log"]').setAttribute('value','log10');
        document.querySelector('input[value="X^2"]').setAttribute('onclick','val("^")');
        document.querySelector('input[value="X^2"]').setAttribute('value','x^y');
    }
};

const unsetSecondF = ()=>{
    if(isStart){
        document.querySelector('.nde').style.opacity = "0";
        document.querySelector('.secondF').setAttribute('onclick','setSecondF();');
        document.querySelector('input[value="%"]').setAttribute('onclick','val("/")');
        document.querySelector('input[value="%"]').setAttribute('value','/');
        document.querySelector('input[value="cosh"]').setAttribute('onclick','val("cos(")');
        document.querySelector('input[value="cosh"]').setAttribute('value','cos');
        document.querySelector('input[value="sinh"]').setAttribute('onclick','val("sin(")');
        document.querySelector('input[value="sinh"]').setAttribute('value','sin');
        document.querySelector('input[value="tanh"]').setAttribute('onclick','val("tan(")');
        document.querySelector('input[value="tanh"]').setAttribute('value','tan');
        document.querySelector('input[value="log10"]').setAttribute('onclick','val("log(")');
        document.querySelector('input[value="log10"]').setAttribute('value','log');
        document.querySelector('input[value="x^y"]').setAttribute('onclick','carre();');
        document.querySelector('input[value="x^y"]').setAttribute('value','X^2');
    }
};
/* end fonction */

/*fonction change to parenthCalcul

 */
/* end */

const on = ()=> {
    let time = 0;
    document.querySelector('#ecran').style.background = "#cffcff";
    document.querySelector('#ecran').style.opacity = "1";
    document.querySelector("input[value='ON']").setAttribute('onclick','C();');
   function anim() {
        time += 100;
       if(time === 1300){
           document.querySelector('.etat').style.background = "orange";
       }
       if(time === 1600){
           document.querySelector('.ecranOmbre p').style.color = "#444";
       }
        if(time < 4000){
            setTimeout(anim,100);
        }else{
            let phrase = "The easy way to make an operation".split('');
            let time = 0;
            function showPhrase(){
                document.querySelector('.ecranOmbre span').textContent += phrase[time];
                time++;
                document.querySelector('.ecranOmbre span').style.opacity = "1";
                if(time < phrase.length){
                    setTimeout(showPhrase,50);
                }else{
                    let seconde = 0;
                    function timeOut(){
                        seconde++;
                        if(seconde < 3){
                            setTimeout(timeOut,1000);
                        }else{
                            let phrase = "The easy way to make an operation".split('');
                            let length = phrase.length;
                           function hidePhrase(){
                               phrase.shift();
                               document.querySelector('.ecranOmbre span').textContent = phrase.join('');
                               length--;
                               document.querySelector('.ecranOmbre span').style.opacity = "0";
                               document.querySelector('.ecranOmbre p').style.color = "transparent";
                               if(length > 0){
                                   setTimeout(hidePhrase,50);
                               }else{
                                   let time = 0;
                                   function setTime(){
                                       time++;
                                       if(time < 2){
                                           setTimeout(setTime,1000)
                                       }else{
                                           isStart = true;
                                           document.querySelector('.ecranOmbre').style.display = "none";
                                           Result.textContent = "0";
                                           document.querySelector('.etat').style.background = "lime";
                                           document.querySelector('.etat').classList.add("animvoyant");
                                           document.querySelector("input[value='ON']").setAttribute('value','C');
                                       }
                                   }
                                   setTime();
                               }
                           }
                           hidePhrase();
                        }
                    }
                    timeOut();
                }
            }
            showPhrase();
        }
    }
    anim();
};

const off = ()=>{
    if(isStart){
        if(document.querySelector('.secondF').getAttribute("onclick") === "unsetSecondF();"){
            document.querySelector('.secondF').click();
        }
        isStart = false;
        let time = 0;
        document.querySelector('#ecran .result  ').textContent = "";
        document.querySelector('.ecranOmbre').style.display = "block";
        function timeOut(){
            time++;
            if(time === 2){
                document.querySelector('.ecranOmbre p').style.color ="#444";
                document.querySelector('.etat').classList.remove("animvoyant");
                document.querySelector('.etat').style.background = "orange";
            }
            if(time < 5){
                setTimeout(timeOut, 1000);
            }else{
                document.querySelector('#ecran').style.opacity = "0.3";
                document.querySelector('.ecranOmbre p').style.color = "transparent  ";
                document.querySelector('#ecran').style.background = "darkgrey";
                let time = 0;
                function powerOff(){
                    time++;
                    if(time < 5){
                        setTimeout(powerOff,1000);
                    }else{
                        document.querySelector('.etat').style.background = "black";
                        document.querySelector("input[value='C']").setAttribute('onclick','on();');
                        document.querySelector("input[value='C']").setAttribute('value','ON');
                    }
                }
                powerOff();
            }
        }
        timeOut();
    }
};