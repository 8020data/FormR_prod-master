//   -----  --------------  =  --------------------------------------------------------

     async  function doTest_FindOne( nID ) { 
    
       var  pResult         =  await jstFns.sndAPI( 'GET', `${aHost}${aRoute}/${nID}`)

//     var  nID             = (pResult.error || pResult.body.length == 0) ? 0 : pResult.body[0].id 
       var  nID2            =  pResult.body ? (pResult.body.length ? pResult.body[0].id : pResult.body.id ) : 0
        if (nID2 >= 1)  { 
            console.log(  `    doTest_FindOne[1]  The ID, ${nID}, exists.`)
        } else {    
            console.log(  `    doTest_FindOne[2]  The ID, ${nID}, does not exist.`)
            }   
    return  pResult 
            }
//   -----  --------------  =  --------------------------------------------------------

     async  function doTest_FindAll( ) { 
    
       var  pResult         =  await jstFns.sndAPI( 'GET', `${aHost}${aRoute}/`)

       var  nID2            =  pResult.body ? (pResult.body.length ? pResult.body[0].id : pResult.body.id ) : 0
        if (nID2 >= 1)  { 
            console.log(  `    doTest_FindAll[1]  There are ${pResult.body.length} ${aColToSearch}s.`)
        } else {    
            console.log(  `    doTest_FindOne[2]  There are ${pResult.body.length} ${aColToSearch}s.`)
            }   
    return  pResult 
            }
//   -----  --------------  =  --------------------------------------------------------

     async  function doTest_Find( aValToSearch ) { 
    
       var  pResult         =  await jstFns.sndAPI( 'GET', `${aHost}${aRoute}/?${aColToSearch}=${aValToSearch}`)

       var  nID             =  pResult.body ? (pResult.body.length ? pResult.body[0].id : pResult.body.id ) : 0
        if (nID >= 1)  { 
            console.log(  `    doTest_Find[1]     The ${aColToSearch}, '${aValToSearch}', exists with ID: ${nID}.`)
        } else {    
            console.log(  `    doTest_Find[2]     The ${aColToSearch}, '${aValToSearch}', does not exist.`)
            }   
    return  pResult 
            }
//   -----  --------------  =  --------------------------------------------------------

     async  function doTest_Create( aValToSearch, pData ) { 
    
       var  pResult         =  await jstFns.sndAPI( 'GET', `${aHost}${aRoute}/?${aColToSearch}=${aValToSearch}`)

       var  nID             =  pResult.body ? (pResult.body.length ? pResult.body[0].id : pResult.body.id ) : 0
        if (nID >= 1) {
            console.log(  `    doTest_Create[1]   The ${aColToSearch}, '${aValToSearch}', already exists with ID: ${nID}.`)
        } else { 
            pResult         =  await jstFns.sndAPI( 'POST', `${aHost}${aRoute}`, pData )
       var  nID             = (pResult.body && pResult.body.id) ? pResult.body.id : 0
        if (nID >= 1) {
            console.log(  `    doTest_Create[2]   The ${aColToSearch}, '${aValToSearch}', was creatged with ID: ${nID}.`)
        }   }   
    return  pResult 
            }
//   -----  --------------  =  --------------------------------------------------------

     async  function doTest_Update( aValToSearch, pData ) { 
    
       var  pResult         =  await jstFns.sndAPI( 'GET', `${aHost}${aRoute}/?${aColToSearch}=${aValToSearch}`)

       var  nID             =  pResult.body ? (pResult.body.length ? pResult.body[0].id : pResult.body.id ) : 0
        if (nID == 0) {
            console.log(  `    doTest_Update[1]   The ${aColToSearch}, '${aValToSearch}', does not exist. Can't update it.`)
        } else { 
            pResult         =  await jstFns.sndAPI( 'PUT', `${aHost}${aRoute}/${nID}`, pData )
       var  nID             = (pResult.body && pResult.body.id) ? pResult.body.id : 0
        if (nID >= 1) {
            console.log(  `    doTest_Update[2]   The ${aColToSearch}, '${aValToSearch}', was updateds with ID: ${nID}.`)
        }   }   
    return  pResult 
            }
//   -----  --------------  =  --------------------------------------------------------

     async  function doTest_Delete( aValToSearch ) { 
    
       var  pResult         =  await jstFns.sndAPI( 'GET', `${aHost}${aRoute}/?${aColToSearch}=${aValToSearch}`)

       var  nID             =  pResult.body ? (pResult.body.length ? pResult.body[0].id : pResult.body.id ) : 0
        if (nID == 0) {
            console.log(  `    doTest_Delete[1]   The ${aColToSearch}, '${aValToSearch}', does not exist. Can't delete it.`)
        } else { 
            pResult         =  await jstFns.sndAPI( 'DELETE', `${aHost}${aRoute}/${nID}`)
       var  nID             = (pResult.body && pResult.body.id) ? pResult.body.id : 0
        if (nID >= 1) {
            console.log(  `    doTest_Delete[2]   The ${aColToSearch}, '${aValToSearch}', was deleted with ID: ${nID}.`)
        }   }
    return  pResult 
            }
//   -----  --------------  =   --------------------------------------------------------

  function  fmtResults( mResults ) {
    return  "\n mResults:\n -----------------------------------------------"  
         +  fmtObj( mResults ) 
            }
//   -----  --------------  =   --------------------------------------------------------

  function  addDate( n, d )  { return fmtDate( 6, d, n ).substr( 0, 10 ) }    

//   -----  --------------  =   --------------------------------------------------------

     global.doTest_Create   =  doTest_Create    // C reate
     global.doTest_FindOne  =  doTest_FindOne   // R ead ID
     global.doTest_FindAll  =  doTest_FindAll   // R ead All
     global.doTest_Find     =  doTest_Find      // R ead aColToSearch
     global.doTest_Update   =  doTest_Update    // U pdate aColToSearch
     global.doTest_Delete   =  doTest_Delete    // D elete aColToSearch

     global.fmtResults      =  fmtResults
     global.addDate         =  addDate

     