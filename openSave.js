let saveBtn = document.querySelector(".download");
let openBtn = document.querySelector(".open");


saveBtn.addEventListener("click",(e) => {

    let jsonData = JSON.stringify([sheetDB,graphMatrixRow])
    let file = new Blob([jsonData],{type : "application/json"});

    let a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = "sheetData";
    a.click();
    console.log(a.href);

})



openBtn.addEventListener("click",(e)=>{
    //open file explorer
    let input = document.createElement("input");
    input.setAttribute("type","file");
    input.click();

    input.addEventListener("change",(e) => {
        let fr = new FileReader();
        let selectedFile = input.files[0];
        fr.readAsText(selectedFile);

        fr.addEventListener("load",(e) => {
            let readSheetData = JSON.parse(fr.result);

            addSheetbtn.click();

            sheetDB = readSheetData[0];
            graphMatrixRow = readSheetData[1];


           sheetCont[sheetCont.length-1] = readSheetData[0];
           collectedGraphComponentMatrix[collectedGraphComponentMatrix.length-1] = readSheetData[1];


           handleSheetProperties(); 
        })
    })
})

