let sheetFolderCont = document.querySelector(".sheet-folder-cont");
let addSheetbtn = document.querySelector(".sheet-add-icon");
addSheetbtn.addEventListener("click",(e)=>{
    let sheet = document.createElement("div");
    sheet.setAttribute("class","sheet-folder");

    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    sheet.setAttribute("id",allSheetFolders.length);

    sheet.innerHTML = `<div class="sheet-content">Sheet${allSheetFolders.length+1}</div>`;
    sheetFolderCont.appendChild(sheet);
    sheet.scrollIntoView();

    createSheetDB();
    createGraphComponentMatrix();
    handleSheetActiveness(sheet);
    handleSheetRemoval(sheet);
    sheet.click();
    
    
})

function handleSheetRemoval(sheet){
    sheet.addEventListener("mousedown",(e) =>{
        //right click detection
        if(e.button !==2) return;
        let allSheetFolders = document.querySelectorAll(".sheet-folder");
        if(allSheetFolders.length == 1){
            alert("you need to have atleast one sheet");
            return;
        }
        let response = confirm("your sheet will be removed permanently,Are you sure?");
        if(response == false) return;
        let sheetIdx=Number(sheet.getAttribute("id"));
        //collected sheet db
        sheetCont.splice(sheetIdx,1);
        collectedGraphComponentMatrix.splice(sheetIdx,1);
        
        handleSheetUIRemoval(sheet);

        //by default bring sheet to active
        sheetDB = sheetCont[0];
        graphMatrixRow = collectedGraphComponentMatrix[0];
        handleSheetProperties();

    })

}

function handleSheetUIRemoval(sheet){
    sheet.remove();
    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    for(let i=0 ;i < allSheetFolders.length;i++){
        allSheetFolders[i].setAttribute("id",i);
        let sheetContent = allSheetFolders[i].querySelector(".sheet-content");
        sheetContent.innerText = `Sheet ${i+1}`;
        allSheetFolders[i].style.backgroundColor = "transparent";
    }
    allSheetFolders[0].style.backgroundColor = "#ced6e0";
} 




function handleSheetUI(sheet){
    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    for(let i=0;i<allSheetFolders.length;i++){
        allSheetFolders[i].style.backgroundColor = "transparent";
    } 
    sheet.style.backgroundColor = "#ced6e0";
}

function handleSheetDB(sheetIdx){
    sheetDB=sheetCont[sheetIdx];
    graphMatrixRow=collectedGraphComponentMatrix[sheetIdx];
}

function handleSheetProperties(){
    for(let i=0;i<rows;i++){
        for(let j=0;j<col;j++){
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            cell.click();
        }
    }
    let firstCell = document.querySelector(".cell");
firstCell.click();
}


function handleSheetActiveness(sheet){
    sheet.addEventListener("click",(e)=>{
        let sheetIdx=Number(sheet.getAttribute("id"));
        handleSheetDB(sheetIdx);
        handleSheetProperties();
        handleSheetUI(sheet);
    })

}

function createSheetDB(){
    let     sheetDB = [];
    for (let i = 0; i < rows; i++) {
        let sheetrow = [];
        for (let j = 0; j < col; j++) {
          let cellProp = {
            bold: false,
            italic: false,
            underline: false,
            alignment: "left",
            fontFamily: "monospace",
            fontSize: "14",
            fontColor: "#000000",
            BGcolor: "#000000",
            value : "",
            formula : "",
            children : [],
          };
      
          sheetrow.push(cellProp);
        }
        sheetDB.push(sheetrow);
      } 
      sheetCont.push(sheetDB);
}

function createGraphComponentMatrix(){
    let graphMatrixRow = []; // this is made to store relationship betw cells

for(let i=0;i<rows;i++){
    let graphStorageRow = [];
    for(let j=0;j<col;j++){
        
     graphStorageRow.push([]);
    }

    graphMatrixRow.push(graphStorageRow);
    
}
collectedGraphComponentMatrix.push(graphMatrixRow);
}