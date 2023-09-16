let collectedGraphComponentMatrix = [];
let graphMatrixRow = []; // this is made to store relationship betw cells

// for(let i=0;i<rows;i++){
//     let graphStorageRow = [];
//     for(let j=0;j<col;j++){
     
//      graphStorageRow.push([]);
//     }

//     graphMatrixRow.push(graphStorageRow);
    
// }


function isGraphCyclic(graphMatrixRow){
    let visited = [];
    let dfsVisited = [];

    for(let i=0;i<rows;i++){
        let visitedRow = [];
        let dfsVisitedRow = [];
        for(let j=0;j<col;j++){
         visitedRow.push(false);
         dfsVisitedRow.push(false);
        }
        visited.push(visitedRow);
        dfsVisited.push(dfsVisitedRow);
    }

    for(let i=0 ;i<rows;i++){
        for(let j=0;j<col;j++){
         let response = dfsCycleDetection(graphMatrixRow,i,j,visited,dfsVisited);
         if(response === true) return [i,j];
        }
        
    }
    return null;
}

function dfsCycleDetection(graphMatrixRow,srcr,srcc,visited,dfsVisited){
    visited[srcr][srcc] = true;
    dfsVisited[srcr][srcc] = true;

    for(let children =0 ; children<graphMatrixRow[srcr][srcc].length;children++){
      let [crid,ccid] = graphMatrixRow[srcr][srcc][children];
      if(visited[crid][ccid] === false){
      let response = dfsCycleDetection(graphMatrixRow,crid,ccid,visited,dfsVisited);
      if(response === true)  return true;
      }
      else if(visited[crid][ccid] === true && dfsVisited[crid][ccid] ===true){
        return true;
      }


    }




    dfsVisited[srcr][srcc]=false;
    return false;
}