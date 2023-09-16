async function isGraphCyclicPathDetection(graphMatrixRow,cycleResponse){
    let [srcr,srcc] = cycleResponse;
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

    // for(let i=0 ;i<rows;i++){
    //     for(let j=0;j<col;j++){
    //      let response = dfsCycleDetectionPathTracing(graphMatrixRow,i,j,visited,dfsVisited);
    //      if(response === true) return true;
    //     }
        
    // }
          let response = await dfsCycleDetectionPathTracing(graphMatrixRow,srcr,srcc,visited,dfsVisited);
         if(response === true) return Promise.resolve(true);
        
         return Promise.resolve(false);
}

function colorPromise(){
  return new Promise((resolve,reject)=> {
    setTimeout(() => {
      resolve();
    }, 1000);
  })
}

async function dfsCycleDetectionPathTracing(graphMatrixRow,srcr,srcc,visited,dfsVisited){
  
    visited[srcr][srcc] = true;
    dfsVisited[srcr][srcc] = true;

    let cell = document.querySelector(`.cell[rid="${srcr}"][cid="${srcc}"]`);
    cell.style.backgroundColor = "lightblue";
   await colorPromise();

    for(let children =0 ; children<graphMatrixRow[srcr][srcc].length;children++){
      let [crid,ccid] = graphMatrixRow[srcr][srcc][children];
      if(visited[crid][ccid] === false){
      let response = await dfsCycleDetectionPathTracing(graphMatrixRow,crid,ccid,visited,dfsVisited);
      if(response == true)  {
        cell.style.backgroundColor = "transparent";
       await colorPromise();
        return Promise.resolve(true);
      }
      }
      else if(visited[crid][ccid] === true && dfsVisited[crid][ccid] ===true){
        let cyclicCell = document.querySelector(`.cell[rid="${crid}"][cid="${ccid}"]`);
        cyclicCell.style.backgroundColor = "lightsalmon";
       await colorPromise();
        cyclicCell.style.backgroundColor = "transparent";
        await colorPromise();
       cell.style.backgroundColor = "transparent";
       await colorPromise();
        return Promise.resolve(true);
      }


    }




    dfsVisited[srcr][srcc]=false;
    return Promise.resolve(false);
}