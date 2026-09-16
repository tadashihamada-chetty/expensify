
const BudgetForm = document.querySelector("#budget-Form");
const rightSection= document.querySelector(".right-section");
const modalOne= document.querySelector(".modal-one");
const modalTwo= document.querySelector(".modal-two");
const closeButtonOne=document.querySelector(".close-button")
const expenseForm= document.querySelector("#expense-form")
const closeButtonTwo= document.querySelector(".close-button-two")
const totalBudgetinDisplay= document.querySelector(".totalbudgetin") 
const historyDisplay= document.querySelector(".historyDisplay")
const totalbalance=document.querySelector(".totalbalance")
const  totalSpentFood = document.querySelector(".food")
const  totalSpentTransport = document.querySelector(".transport")
const  totalSpentBills = document.querySelector(".bills")
const  totalSpentshopping = document.querySelector(".shopping")
const  totalSpentOther = document.querySelector(".other")




const DataArray=[];
let number1=0;
let number2=0;
let ballance =0;



class IdGenerator{
 static #counter= 0;
 static generate(prefix= "tran"){
  const timestamp = Date.now();
  this.#counter= (this.#counter +1)% 1000;
  const padcounter= String(this.#counter).padStart(4,"0");
  return `${prefix}-${timestamp}-${this.#counter}-${padcounter}`
 }
}

handleTotalBudgetDisplay();
handlehistoryDisplay(loadData("array"))
const savedArray= loadData("array")

handleTotalSpent(savedArray,totalSpentFood,"Food", "food");
handleTotalSpent(savedArray,totalSpentTransport,"Transport","transport" );
handleTotalSpent(savedArray,totalSpentBills,"Bills","bills" );
handleTotalSpent(savedArray,totalSpentshopping,"Shopping","shopping" );
handleTotalSpent(savedArray, totalSpentOther,"Other","other" );

const closeFunc=()=>{
   if(modalOne.style.display==="flex"){
 modalOne.style.display="none";
   }
   if(modalTwo.style.display==="flex")
     modalTwo.style.display="none";
}
 
closeButtonOne.addEventListener("click",closeFunc)
closeButtonTwo.addEventListener("click",closeFunc)




rightSection.addEventListener("click",(event)=>{
    if(event.target.classList.contains("total")){
       modalOne.style.display="flex";
       return
    };

    if(event.target.classList.contains("expense")){
       modalTwo.style.display="flex"
        return
    }
})

BudgetForm.addEventListener("submit",(event)=>{
  event.preventDefault();
  const amount=  event.target.querySelector("#amount").value;
  const Name=   event.target.querySelector("#period").value;
   handleBudget(amount,Name);  
   closeFunc() 
})

expenseForm.addEventListener("submit",(event)=>{
  event.preventDefault();
  const amount=  event.target.querySelector("#amount").value;
 const option= event.target.querySelector("#category-option").value;
    
 if(amount===""||option===""){
alert("please enter  expense details")
 }else {
   const dataObject={
    id:IdGenerator.generate(),
    amount:amount,
    type:option,
    date:new Date().toLocaleDateString()
   }  

const extractNum = dataObject.amount;
number2= Number(extractNum);
    handlecalculation(); 
      if(dataObject){
   addToData(dataObject);
 }}
closeFunc(); 
handlehistoryDisplay(DataArray);


})

function handlecalculation(){
ballance= number1 -number2;

totalbalance.innerHTML=`
<span class="balance">
 GhC ${ballance}
</span>
`
number1 = ballance
storeData("ballance", ballance)

handleBalanceDispaly();


}

handleBalanceDispaly();

function handleBalanceDispaly(){
  const saved= loadData("ballance")
if(saved){
   totalbalance.innerHTML=`
<span class="balance">
 GhC ${saved}
</span>
`
} 
}



function handleTotalSpent(array, target,text,term){
  if(!array ){
    return
  }
const filterData = array.filter(item=> item.type===term);
const amountData= filterData.map(item => item.amount)

if(amountData.length ===0){
  return
}else{
  const totalspent = amountData.reduce((acc, curr)=>{
 return  Number (acc) + Number(curr) 
} ,0)

target.innerHTML=`
    <div class="totalsHolder">
   <span class="inner-text"> ${text} </span>
   <span class="inner-number"> GhC: ${totalspent} </span>
   </div>
   `

}

}


function addToData(object){
  DataArray.push(object) 
  handleTotalSpent(DataArray,totalSpentFood,"Food", "food");
handleTotalSpent(DataArray,totalSpentTransport,"Transport","transport" );
handleTotalSpent(DataArray,totalSpentBills,"Bills","bills" );
handleTotalSpent(DataArray,totalSpentshopping,"Shopping","shopping" );
handleTotalSpent(DataArray, totalSpentOther,"Other","other" );

 storeData("array", DataArray)
}

const handleBudget=(amount,period)=>{
const obj={
  budget:amount,
  duration:period
}

totalBudgetinDisplay.innerHTML=`
<span class="Amount">GhC${obj.budget} </span>
<span class="days"> ${obj.duration} for days </span>
`
storeData("object",obj)
}



function handlehistoryDisplay(array){
if(!array){
  historyDisplay.innerHTML=`No history `
}else{
  historyDisplay.innerHTML= array.map(doc=>`<div class="historyDataHolder">
   <span>${doc.type} </span>       
   <span> Ghc ${doc.amount}  </span>
   <span> ${doc.date} </span>
    </div>
    ` ).join(' ') ;
    }
}

function handleTotalBudgetDisplay(){
  const saved= loadData("object");
  if(!saved){
    return
  }
  const  totalNum = saved.budget;
  number1 = Number(totalNum);
  if(saved){
totalBudgetinDisplay.innerHTML=`<span class="Amount">GhC
${saved.budget}</span>
<span class="days"> ${saved.duration} for days</span>
`}
}


function storeData(key,data){
   localStorage.setItem( key, JSON.stringify(data))
}
 
function loadData(key){
  const item= JSON.parse(localStorage.getItem(key))
  return item
}





 
 