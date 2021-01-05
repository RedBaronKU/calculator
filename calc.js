function getFormattedNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
function reverseFormattedNumber(num)
{
    return Number(num.replace(/,/g,''));
}
function getHistory()
{
    return document.querySelector('.history').innerText;
}
function setHistory(num)
{
    document.querySelector('.history').innerText=num;
}
function getInput()
{
    return document.querySelector('.input').innerText;
}
function setInput(num)
{
    if(num=='-'){
        document.querySelector('.input').innerText=0;
    }
    else
        document.querySelector('.input').innerText=getFormattedNumber(reverseFormattedNumber(num));
    
}
var num=document.getElementsByClassName('number');
for(let i=0;i<num.length;i++)
{
    num[i].addEventListener('click',()=>{
        let displayVal=reverseFormattedNumber(getInput());
        if(displayVal!=NaN)
        {
            displayVal=displayVal+`${num[i].id}`;
            setInput(displayVal.toString());
        }
        if(displayVal==='0')
           setInput(num[i].id);
    })
}
var operator=document.getElementsByClassName('operator');
for(let i=0;i<operator.length;i++)
{
    operator[i].addEventListener('click',()=>{
        let number=reverseFormattedNumber(getInput());
        let equation=getHistory();
        if(operator[i].id==='C')
        {
            document.querySelector('.input').innerText='';
            document.querySelector('.history').innerText='';
        }
        else if(operator[i].id=='CE')
        {
            if(number.length<=1)
            {
                document.querySelector('.input').innerText='';
            }
            else
            {
                number=number.substring(0,number.length-1);
                setInput(number);
            }
        }
        else if(operator[i].id==='equals')
        {   if(equation!=''){
                equation=equation+number;
                var result=eval(equation);
                setInput(result.toString());
                setHistory('');
            }
        }
        else
        {
            if(number=='' && equation!=''){
                equation=equation.substring(0,equation.length-1);
            }
            else if(number=='' && equation=="")
            {
                //Empty bcoz we need to ignore this case. Who woud evaluate(*8/4)   
            }
            else{
                equation=equation+number+operator[i].innerText;
                setHistory(equation);
                document.querySelector('.input').innerText='';
            }
        }
        
    })
}