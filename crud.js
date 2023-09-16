let ctrlKey ;
let copyBtn = document.querySelector(".copy");
let cutBtn = document.querySelector(".cut");
let pasteBtn = document.querySelector(".paste");
document.addEventListener("keydown",(e) => {
    ctrlKey = e.ctrlKey;
    // console.log(ctrlKey);
})
document.addEventListener("keyup",(e) =>{
   ctrlKey = e.ctrlKey;
//    console.log(ctrlKey);
})

for(let i=0 ;i<rows;i++){
    for(let j=0;j<col;j++){
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        handleSelectedCell(cell);
    }
}
let selectedCellRange = [];
function handleSelectedCell(cell){
    cell.addEventListener("click",(e) => {
        if(!ctrlKey) return ;
        
        if(selectedCellRange.length >= 2) {
            handleSelectedCellUI();
            selectedCellRange = [];
        }


        cell.style.border = "3px solid #1abc9c";
        
        let rid = Number(cell.getAttribute("rid"));
        let cid = Number(cell.getAttribute("cid"));
        selectedCellRange.push([rid,cid]);
        

    })
}

function handleSelectedCellUI(){
    for(let i=0;i<selectedCellRange.length;i++){
        let cell = document.querySelector(`.cell[rid="${selectedCellRange[i][0]}"][cid="${selectedCellRange[i][1]}"]`);
        cell.style.border = "1px solid #dfe4ea";
    }
}

let copyData = [];
copyBtn.addEventListener("click",(e) => {
    
    if(selectedCellRange.length < 2) return ;
    copyData=[];


    for(let i = selectedCellRange[0][0];i<=selectedCellRange[1][0];i++)
    {
        let copyRow = [];
        for(let j=selectedCellRange[0][1];j<=selectedCellRange[1][1];j++)
        {
             let Cellprop = sheetDB[i][j];
            copyRow.push(Cellprop);
        }
        copyData.push(copyRow);
    }
    handleSelectedCellUI();
    // selectedCellRange = [];
})

pasteBtn.addEventListener("click",(e) => {
    if(selectedCellRange.length < 2) return ;
    let targetCell = addressBar.value;
    let [srid,scid] = DecodeAddressBarValue(targetCell);

    let totalRow = Math.abs(selectedCellRange[0][0] - selectedCellRange[1][0]);
    let tolCol = Math.abs(selectedCellRange[0][1] - selectedCellRange[1][1]);

    for(let i = srid,k=0;i<= srid+totalRow; i++,k++)
    {
        for(let j = scid,l=0;j <= scid+tolCol;j++,l++){
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            if(!cell) continue;

            let cellProp = sheetDB[i][j];
            
            let data = copyData[k][l];
            //DB
            cellProp.value = data.value;
            cellProp.bold = data.bold;
            cellProp.italic = data.italic;
            cellProp.underline = data.underline ;
            cellProp.alignment = data.alignment;
            cellProp.fontColor = data.fontColor;
            cellProp.BGcolor = data.BGcolor;
            cellProp.fontSize = data.fontSize;
            cellProp.fontFamily = data.fontFamily;
             
            // console.log(cellProp);
            // console.log(sheetDB[i][j]);

            //UI
            cell.click();
        }
    }


})


cutBtn.addEventListener("click",(e) => {
    if(selectedCellRange.length < 2) return ;



    for(let i = selectedCellRange[0][0];i<=selectedCellRange[1][0];i++)
    {
        
        for(let j=selectedCellRange[0][1];j<=selectedCellRange[1][1];j++)
        {
             let Cellprop = sheetDB[i][j];
             
             let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            
            cell.innerText = "";
            Cellprop.value = "";
            Cellprop.bold = false;
            Cellprop.italic = false;
            Cellprop.underline = false ;
            Cellprop.alignment = "left";
            Cellprop.fontColor = "#000000";
            Cellprop.BGcolor = "#000000";
            Cellprop.fontSize = "14";
            Cellprop.fontFamily = "monospace";
            Cellprop.formula = "";
            
            cell.click();
        }
        
    }
    handleSelectedCellUI();
    
    // selectedCellRange = [];
})