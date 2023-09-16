let sheetCont = [];
let sheetDB = [];

{
    let addSheetbtn = document.querySelector(".sheet-add-icon");
    addSheetbtn.click();
}

// for (let i = 0; i < rows; i++) {
//   let sheetrow = [];
//   for (let j = 0; j < col; j++) {
//     let cellProp = {
//       bold: false,
//       italic: false,
//       underline: false,
//       alignment: "left",
//       fontFamily: "monospace",
//       fontSize: "14",
//       fontColor: "#000000",
//       BGcolor: "#000000",
//       value : "",
//       formula : "",
//       children : [],
//     };

//     sheetrow.push(cellProp);
//   }
//   sheetDB.push(sheetrow);
// }

// selectors for Cell prop

let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let alignment = document.querySelectorAll(".alignment") ;
let left_align = alignment[0];
let center_align = alignment[1];
let right_align = alignment[2];
let fontColor = document.querySelector(".font-color-prop");
let BGcolor = document.querySelector(".bg-color-prop");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";
let formulaBar = document.querySelector(".formula-bar");
//add eventListeners for Selector

bold.addEventListener("click", (e) => {
  let activeCell = addressBar.value;
  let [rid, cid] = DecodeAddressBarValue(activeCell);
  let [cell, cellProp] = getCellAndCellProp(rid, cid);

  cellProp.bold = !cellProp.bold;
  cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; // Cell UI change
  bold.style.backgroundColor = cellProp.bold  // Bold button UI change
    ? activeColorProp
    : inactiveColorProp;
});

italic.addEventListener("click", (e) => {
  let activeCell = addressBar.value;
  let [rid, cid] = DecodeAddressBarValue(activeCell);
  let [cell, cellProp] = getCellAndCellProp(rid, cid);

  cellProp.italic = !cellProp.italic;
  cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
  italic.style.backgroundColor = cellProp.italic
    ? activeColorProp
    : inactiveColorProp;
});

underline.addEventListener("click", (e) => {
  let activeCell = addressBar.value;
  let [rid, cid] = DecodeAddressBarValue(activeCell);
  let [cell, cellProp] = getCellAndCellProp(rid, cid);

  cellProp.underline = !cellProp.underline;
  cell.style.textDecoration = cellProp.underline ? "underline" : "none";
  underline.style.backgroundColor = cellProp.underline
    ? activeColorProp
    : inactiveColorProp;
});

fontSize.addEventListener("change",(e) => {
  let activeCell = addressBar.value;
  let [rid, cid] = DecodeAddressBarValue(activeCell);
  let [cell, cellProp] = getCellAndCellProp(rid, cid);

  cellProp.fontSize = fontSize.value;  //data change
  cell.style.fontSize = cellProp.fontSize + "px"; //UI change
  fontSize.value = cellProp.fontSize;

})

fontFamily.addEventListener("change",(e) => {
    let activeCell = addressBar.value;
    let [rid, cid] = DecodeAddressBarValue(activeCell);
    let [cell, cellProp] = getCellAndCellProp(rid, cid);
  
    cellProp.fontFamily = fontFamily.value;  //data change
    cell.style.fontFamily = cellProp.fontFamily; //UI change
    fontFamily.value = cellProp.fontFamily;
  
  })

 
 fontColor.addEventListener("change", () => {
    let activeCell = addressBar.value;
    let [rid, cid] = DecodeAddressBarValue(activeCell);
    let [cell, cellProp] = getCellAndCellProp(rid, cid);

    cellProp.fontColor = fontColor.value ; 
    cell.style.color = cellProp.fontColor;
    fontColor.value = cellProp.fontColor
 }) 

 BGcolor.addEventListener("change", () => {
    let activeCell = addressBar.value;
    let [rid, cid] = DecodeAddressBarValue(activeCell);
    let [cell, cellProp] = getCellAndCellProp(rid, cid);

    cellProp.BGcolor = BGcolor.value ; 
    cell.style.backgroundColor = cellProp.BGcolor;
    BGcolor.value = cellProp.BGcolor;
 })


 alignment.forEach((alignElem) => {
    alignElem.addEventListener("click",(e) => {
        let activeCell = addressBar.value;
        let [rid, cid] = DecodeAddressBarValue(activeCell);
        let [cell, cellProp] = getCellAndCellProp(rid, cid);

        let alignValue = e.target.classList[0];
        cellProp.alignment = alignValue;  // Data change
        cell.style.textAlign = cellProp.alignment ; // cell Content UI Change
   // properties UI change
        switch(alignValue){
            case "left" :
                left_align.style.backgroundColor = activeColorProp;
                center_align.style.backgroundColor = inactiveColorProp;
                right_align.style.backgroundColor = inactiveColorProp; 
            break;
            case "center" :
                left_align.style.backgroundColor = inactiveColorProp;
                center_align.style.backgroundColor = activeColorProp;
                right_align.style.backgroundColor = inactiveColorProp;
            break;
            case "right" : 
            left_align.style.backgroundColor = inactiveColorProp;
            center_align.style.backgroundColor = inactiveColorProp;
            right_align.style.backgroundColor = activeColorProp;
            break;
        }


    })
 })

 let allCells = document.querySelectorAll(".cell");

 for(let i=0;i<allCells.length; i++){
 
    addListenerToAttachCellProperites(allCells[i]);
    // addListenerToShowBackgroundColor(allCells[i]);
    // addListenerToFocusIn(allCells[i]);
    // addListenerToFoucusOut(allCells[i]);
 }



// function addListenerToFocusIn(cell){
//     cell.addEventListener("focusin",(e) => {
//         if(ctrlKey === false){
//         cell.style.border = "1px solid yellowgreen";
//          let colId = cell.getAttribute("cid");
//          let rowId = cell.getAttribute("rid");
//          let colCell = document.querySelectorAll(".address-col")[rowId];
//          let rowCell = document.querySelectorAll(".address-row")[colId];
//          colCell.style.backgroundColor = "lightgrey";
//          rowCell.style.backgroundColor = "lightgrey";
//         }
        
//     })
// } 

// function addListenerToFoucusOut(cell){
//     cell.addEventListener("focusout",(e)=>{
//         if(ctrlKey === false){
//         cell.style.border = "1px solid #dfe4ea";
//         let colId = cell.getAttribute("cid");
//         let rowId = cell.getAttribute("rid");
//         let colCell = document.querySelectorAll(".address-col")[rowId];
//         let rowCell = document.querySelectorAll(".address-row")[colId];
//         colCell.style.backgroundColor = "white";
//         rowCell.style.backgroundColor = "white";
//         }
//     })
// }

// function addListenerToShowBackgroundColor(cell){
//     cell.addEventListener("keydown", (e) => {
//         if(ctrlKey) return;
//         if(e.keyCode == 37){
            
//             // console.log("leftarrow");
//             let activeCell = addressBar.value;
//             let [rid, cid] = DecodeAddressBarValue(activeCell);
            
//             cid = cid - 1;
            
//             if(cid < 0) return;

//             // cell.style.border = "1px solid #dfe4ea";
//             let nextCell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
            
//             // nextCell.style.border = "1px solid yellowgreen";
//             nextCell.focus();
//             nextCell.click();
            
            
//         }
//         else if(e.keyCode == 38){
            
//             // console.log("uparrow");
//             let activeCell = addressBar.value;
//             let [rid, cid] = DecodeAddressBarValue(activeCell);
            
//             // cid = cid + 1;
//             rid = rid - 1;
            
//             if(rid < 0) return ;
//             // cell.style.border = "1px solid #dfe4ea";
//             let nextCell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
            
//             // nextCell.style.border = "1px solid yellowgreen";
//             nextCell.focus();
//             nextCell.click();
            
            
//         }
//         else if(e.keyCode == 39){
//             // cell.style.border = "1px solid #dfe4ea";
//             // console.log("rightarrow");
//             let activeCell = addressBar.value;
//             let [rid, cid] = DecodeAddressBarValue(activeCell);
            
//             cid = cid + 1;
            
//             let nextCell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
            
//             // nextCell.style.border = "1px solid yellowgreen";
//             nextCell.focus();
//             nextCell.click();

//         }
//         else if(e.keyCode == 40){
//             // cell.style.border = "1px solid #dfe4ea";
//             // console.log("downarrow");
//             let activeCell = addressBar.value;
//             let [rid, cid] = DecodeAddressBarValue(activeCell);
            
//             // cid = cid + 1;
//             rid = rid + 1;
            
//             let nextCell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
            
//             // nextCell.style.border = "1px solid yellowgreen";
//             nextCell.focus();
//             nextCell.click();
//         }
//     })
// }

function addListenerToAttachCellProperites(cell){
cell.addEventListener("click", (e) => {
    let activeCell = addressBar.value;
    let [rid, cid] = DecodeAddressBarValue(activeCell);
    let [cell, cellProp] = getCellAndCellProp(rid, cid);

    cell.style.fontWeight = cellProp.bold ? "bold"  : "normal";
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    cell.style.textDecoration = cellProp.underline ? "underline" : "none";
    cell.style.fontSize = cellProp.fontSize + "px";
    cell.style.fontFamily = cellProp.fontFamily; 
    cell.style.color = cellProp.fontColor;
    cell.style.backgroundColor = cellProp.BGcolor === "#000000" ? "transparent" : cellProp.BGcolor;
    cell.style.textAlign = cellProp.alignment

    //UI properties change
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp ;
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp ;
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
    fontSize.value = cellProp.fontSize;
    fontFamily.value = cellProp.fontFamily;
    formulaBar.value = cellProp.formula;
    cell.innerText = cellProp.value;
    
    //address col UI change



       
    switch(cellProp.alignment){
        case "left" :
            left_align.style.backgroundColor = activeColorProp;
            center_align.style.backgroundColor = inactiveColorProp;
            right_align.style.backgroundColor = inactiveColorProp;  
            
        break;
        case "center" :
            left_align.style.backgroundColor = inactiveColorProp;
            center_align.style.backgroundColor = activeColorProp;
            right_align.style.backgroundColor = inactiveColorProp;
        break;
        case "rigth" : 
        left_align.style.backgroundColor = inactiveColorProp;
        center_align.style.backgroundColor = inactiveColorProp;
        right_align.style.backgroundColor = activeColorProp;
        break;
    }
    fontColor.style.color = cellProp.fontColor;
    BGcolor.style.backgroundColor = cellProp.BGcolor;


    
    
   
    
})
}



function DecodeAddressBarValue(activeCell) {
  let rid = Number(activeCell.slice(1)) - 1;
  let cid = Number(activeCell.charCodeAt(0)) - 65;
  return [rid, cid];
}

function getCellAndCellProp(rid, cid) {
  let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
  let cellProp = sheetDB[rid][cid];
  return [cell, cellProp];
}
