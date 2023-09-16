let pageActionsDivs = document.querySelectorAll(".page-actions");
console.log(pageActionsDivs);

for(let i=0 ; i<pageActionsDivs.length;i++){
pageActionsDivs[i].addEventListener("click",(e)=>{
    pageActionsDivs[i].style.backgroundColor = "#ecf0f1";
});    
}