// let formulaBar = document.querySelector(".formula-bar");

for(let i=0;i<rows;i++){

    for(let j=0 ;j<col;j++){
  
      let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
      cell.addEventListener("blur", (e) => {
          let address = addressBar.value;
          let [activeCell, cellProp] = getCellAndCellProp(i,j);
  
          let enterdData = activeCell.innerText;
  
          if(enterdData == cellProp.value) {
              return ;
          }
          else {
          cellProp.value = enterdData;
  
          removeChildFromParent(cellProp.formula);
          cellProp.formula = "";
          updateChildrenCells(address);
          
          }

          
      })
  }
  }
  
  formulaBar.addEventListener("keydown", async (e) => {
      let address = addressBar.value
      let inputFormula = formulaBar.value;
      if(e.key ==="Enter" && inputFormula){
          let [rid, cid] = DecodeAddressBarValue(address);
          let [cell, cellProp] = getCellAndCellProp(rid, cid);
          // remove p-c relationship , evaluate new formula and update it 
        if(inputFormula != cellProp.formula) removeChildFromParent(cellProp.formula,address);
             
  
         addChildtoGraphComponent(address,inputFormula);
  
         let cycleResponse = isGraphCyclic(graphMatrixRow);
         if(cycleResponse){
          
          let response=confirm("your graph is cyclic,do you want to trace path");
          while(response === true){
              //keep on tracking until user gets satisfied
             await isGraphCyclicPathDetection(graphMatrixRow,cycleResponse);
              response = confirm("your graph is cyclic,do you want to trace path");
          }
          removeChildFromGraphComponent(address,inputFormula);
          return;
         }
  
          let evaluatedValue = evaluateFormula(inputFormula);
  
          
          // To update Cell Ui and Cellprop in DB
          setCellUIAndCellProp(evaluatedValue,inputFormula,address);
          console.log("reach");
          // to Add child to parent
          addChildToParent(inputFormula,address);
          // console.log(sheetDB);
          updateChildrenCells(address);
          
      }
  })
  
  function addChildtoGraphComponent(childAddress,formula){
  let [crid,ccid] = DecodeAddressBarValue(childAddress);
  let encodedFormula = formula.split(" ");
  for(let i=0;i<encodedFormula.length;i++){
      let assciValue = encodedFormula[i].charCodeAt(0);
      if(assciValue>=65 &&  assciValue <=90){
          let[prid,pcid] = DecodeAddressBarValue(encodedFormula[i]);
          graphMatrixRow[prid][pcid].push([crid,ccid]);
  
      }
  }
  
  }
  
  function removeChildFromGraphComponent(childAddress,formula){
      // let [crid,ccid] = DecodeAddressBarValue(childAddress);
  let encodedFormula = formula.split(" ");
  for(let i=0;i<encodedFormula.length;i++){
      let assciValue = encodedFormula[i].charCodeAt(0);
      if(assciValue>=65 &&  assciValue <=90){
          let[prid,pcid] = DecodeAddressBarValue(encodedFormula[i]);
          graphMatrixRow[prid][pcid].pop();
  
      }
  }
  
  }
  
  
  function removeChildFromParent(formula,address){
      let childAddress = address;
      let encodedFormula = formula.split(" ");
      for(let i=0;i < encodedFormula.length; i++){
          let AssciValue = encodedFormula[i].charCodeAt(0);
          if(AssciValue >= 65 && AssciValue <=90){
              let [rid, cid] = DecodeAddressBarValue(encodedFormula[i]);
              let [parentCell, parentCellProp] = getCellAndCellProp(rid, cid);
              
              let idx = parentCellProp.children.indexOf(childAddress);
              parentCellProp.children.splice(idx,1); 
          }    
  
  }    
  
  }
  
  
  function addChildToParent(formula,address){
      let childAddress = address;
      let encodedFormula = formula.split(" ");
      for(let i=0;i < encodedFormula.length; i++){
          let AssciValue = encodedFormula[i].charCodeAt(0);
          if(AssciValue >= 65 && AssciValue <=90){
              let [rid, cid] = DecodeAddressBarValue(encodedFormula[i]);
              let [parentCell, parentCellProp] = getCellAndCellProp(rid, cid);
              
              parentCellProp.children.push(childAddress);
          }    
  
  }
  }
  
  function updateChildrenCells(parentAddress){
      let [rid, cid] = DecodeAddressBarValue(parentAddress);
      let [parentCell, parentCellProp] = getCellAndCellProp(rid, cid);
      
      let children=parentCellProp.children;
      for(let i=0 ; i<children.length ; i++){
          childAddress = children[i];
          let [rid, cid] = DecodeAddressBarValue(childAddress);
          let [childCell, childCellProp] = getCellAndCellProp(rid, cid);  
          let evaluatedValue = evaluateFormula(childCellProp.formula);  
          
          setCellUIAndCellProp(evaluatedValue,childCellProp.formula,childAddress);
          updateChildrenCells(childAddress);
      }
  
  }
  
  function evaluateFormula(formula){
      let encodedFormula = formula.split(" ");
      for(let i=0;i < encodedFormula.length; i++){
          let AssciValue = encodedFormula[i].charCodeAt(0);
          if(AssciValue >= 65 && AssciValue <=90){
              
              let [rid, cid] = DecodeAddressBarValue(encodedFormula[i]);
              let [cell, cellProp] = getCellAndCellProp(rid, cid);
  
              encodedFormula[i] = cellProp.value;
  
  
          }
      }
      let decodedFormula = encodedFormula.join(" ");
      return eval(decodedFormula);
  }
  
  function setCellUIAndCellProp(evaluatedValue,formula,activeCell){
     
      let [rid, cid] = DecodeAddressBarValue(activeCell);
      let [cell, cellProp] = getCellAndCellProp(rid, cid);
    
      //Cell Ui update  
      cell.innerText = evaluatedValue ;
      // cell db update
      cellProp.value = evaluatedValue;
      cellProp.formula = formula;
      console.log("hey");
  }