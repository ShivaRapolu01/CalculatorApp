class Calculator{
    constructor(prevopText,curropText){
        this.prevopTextElement=prevopText; 
        this.curropTextElement=curropText;
        this.reset();
    }
    delete(){
      this.curropText=this.curropText.toString().slice(0,-1);
    }
    reset(){
       this.prevopText='';
       this.curropText='';
       this.operation=undefined; 
    }
    compute(){
       let prev=parseFloat(this.prevopText);
       let curr=parseFloat(this.curropText);
       console.log("printing");
       console.log(prev,curr);
       if(isNaN(prev)||isNaN(curr))return; 
       switch(this.operation){
            case '+': prev=prev+curr;
            break;
            case '-': prev=prev-curr;
            break;
            case '*': prev=prev*curr;
            break;
            case '÷': prev=prev/curr;
            break;
            default:
                return;         
       }
       this.prevopText='';
       this.curropText=prev.toString();
       this.operation=undefined;
    }
    chooseOperation(number){
        if(this.curropText==='')return;   
        if(this.prevopText!=='' && this.prevopText!='0÷'){
            this.compute();
        }
       this.operation=number; 
       this.prevopText=this.curropText;
       this.curropText='';
    }
    appendNumber(number){
        if(number==='.' && this.curropText.includes('.'))return ;
        // console.log("inside appendNumber");
        // console.log(this.curropText.toString());
        // console.log(number.toString());
        if(number=='0' && this.operation=='/' && this.prevopText=='0'){console.log("hello23451");this.curropTextElement.innerText="error";this.reset();return;}
        this.curropText=this.curropText.toString()+number.toString();
        // console.log( this.curropText);
    }
    formatDisplay(number){
        // let floatnum= parseFloat(number);//decimal point can't be parsed TODO
        // if(isNaN(floatnum))return '';
        // return floatnum.toLocaleString('en');

        let buf=number.toString(); 
        let integerpart=parseFloat(buf.split('.')[0]);
        let decimalpart=buf.split('.')[1];
        let integerDisplay;
        if(isNaN(integerpart)){
            integerDisplay='';
        }else{
            integerDisplay=integerpart.toLocaleString('en',{maximumFractionDigits:0})
        }
        if(decimalpart!=null){
            return `${integerDisplay}.${decimalpart}`;
        }else{
            return integerDisplay;
        }

    }
    updateDisplay(){
        this.curropTextElement.innerText=this.formatDisplay(this.curropText); 
        if(this.operation!=null&&this.operation!=undefined){
            this.prevopTextElement.innerText=`${this.formatDisplay(this.prevopText)}${this.operation}`;
        }else{
            this.prevopTextElement.innerText=this.prevopText;
        }
    }

}





const num=document.querySelectorAll("[data-num]");
const del=document.querySelector("[data-del]");
const operation=document.querySelectorAll("[data-operation]");
const reset=document.querySelector("[data-reset]");
const equals=document.querySelector("[data-equals]");
const prevopTextElement=document.querySelector("[data-prev-op]");
const curropTextElement=document.querySelector("[data-curr-op]");
const calculator=new Calculator(prevopTextElement,curropTextElement);


equals.addEventListener('click',()=>{
    calculator.compute(); 
    calculator.updateDisplay();
})

reset.addEventListener('click',()=>{
    calculator.reset();
    calculator.updateDisplay();
})

del.addEventListener('click',()=>{
    calculator.delete();
    calculator.updateDisplay();
    
})
num.forEach((btn)=>{
    btn.addEventListener('click',()=>{
        console.log(btn.innerText);
        calculator.appendNumber(btn.innerText);
        calculator.updateDisplay();
    });
});

operation.forEach((btn)=>{
    btn.addEventListener('click',()=>{
        calculator.chooseOperation(btn.innerText); 
        calculator.updateDisplay();
    })
})

