let colHeaders = document.querySelectorAll(".address-row"); // headerElements selector
let colHeaderBorders = document.querySelectorAll(".address-row-border"); // headerborder element selector


let headerBeingResized = null; // the Excel Column header which will be dragged and resized
let colHeaderBorderline = null;  // the excel column header border which will give feature of drag of column header
let startX = 0; // intial x position of border line element
let initialWidth = 0;
let colCells=null; // the coressponding column cells for column header
document.addEventListener("mousedown",(e) => startX = e.clientX);  // to calculate intial x postion of border line element 
colHeaderBorders.forEach((currentBorder, index) => {
    currentBorder.addEventListener('mousedown', (e) => {
        headerBeingResized = colHeaders[index];  // Target element for header resize.
        colCells = document.querySelectorAll(`.cell[cid="${index}"]`); // colcells for correponding header
        colHeaderBorderline = e.target;  // currentborder element
        initialWidth = headerBeingResized.offsetWidth;  
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        
    });
});

function handleMouseMove(e) {
    if (headerBeingResized) {
        const deltaX = e.clientX - startX;
        const newWidth = initialWidth + deltaX;
       
        /*  if (headerBeingResized.clientWidth === headerContainer.clientWidth - totalHeaderSize) {
             borderLine.removeEventListener('mousemove', handleMouseMove);
             borderLine.removeEventListener('mouseup', handleMouseUp);
             return;
         } */
        headerBeingResized.style.minWidth = newWidth + 'px';  // change the size of column header
        for(let i=0 ;i<colCells.length;i++){
            colCells[i].style.minWidth = newWidth + 'px';  // change the size of correponding header cells
        }
        
    }
}

function handleMouseUp() {
    headerBeingResized = null;
    colCells = null;
    if (colHeaderBorderline) {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        colHeaderBorderline = null;
    }
}
