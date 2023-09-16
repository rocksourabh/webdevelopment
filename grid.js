let rows = 100;
let col = 26;

let addressColCont = document.querySelector(".address-col-cont");
let addressRowCont = document.querySelector(".address-row-cont");
let cellCont = document.querySelector(".cells-cont");
let addressBar = document.querySelector(".address-bar");

for (let i = 0; i < rows; i++) {
  let addressCol = document.createElement("div");
  addressCol.innerText = i + 1;
  addressCol.setAttribute("class", "address-col");
  addressColCont.appendChild(addressCol);
}

for (let i = 0; i < col; i++) {
  let addressRow = document.createElement("div");

  let addressRowBorder = document.createElement("span");
  addressRowBorder.setAttribute("class","address-row-border");
  addressRow.innerText = String.fromCharCode(65 + i);
  addressRow.setAttribute("class", "address-row");
  addressRow.setAttribute("cid",i);

  addressRowCont.appendChild(addressRow);

  addressRowCont.appendChild(addressRowBorder);
}

for (let i = 0; i < rows; i++) {
  let rowCont = document.createElement("div");
  rowCont.setAttribute("class", "row-cont");
  for (let j = 0; j < col; j++) {
    let cell = document.createElement("div");
    let cellBorder = document.createElement("span");
    cell.setAttribute("class", "cell");
    cell.setAttribute("contenteditable", "true");
    cell.setAttribute("spellcheck", false);
    
    //Identification of cell for cell prop
    cell.setAttribute("rid", i);
    cell.setAttribute("cid", j);
    ValueToAddressBar(cell, i, j);

    //assing properties to cellBorder
    cellBorder.setAttribute("class","cellBorder");



    rowCont.appendChild(cell);
    rowCont.appendChild(cellBorder);
  }
  cellCont.appendChild(rowCont);
}

function ValueToAddressBar(cell, i, j) {
  cell.addEventListener("click", (e) => {
    let rowId = i + 1;
    let colId = String.fromCharCode(65 + j);
    addressBar.value = `${colId}${rowId}`;
  });
}

let firstCell = document.querySelector(".cell");
firstCell.click();
