
//   -----  --------------  =  --------------------------------------------------------

     async  function doTest_FindOne( nID ) { 
    
       var  pResult         =  await jstFns.sndAPI( 'GET', `${aHost}${aRoute}/${nID}`)

//     var  nID             = (pResult.error || pResult.body.length == 0) ? 0 : pResult.body[0].id 
//     var  nID2            =  pResult.body  ? (pResult.body.length ? pResult.body[0].id : pResult.body.id ) : 0
       if ((nID2 = getID( pResult.body )) >= 1 ) {
            console.log(  `    doTest_FindOne[1]  The ${aPrimaryKey}, ${nID}, exists.`)
        } else {    
            console.log(  `    doTest_FindOne[2]  The ${aPrimaryKey}, ${nID}, does not exist.`)
            }   
    return  pResult 
            }
//   -----  --------------  =  --------------------------------------------------------

     async  function doTest_FindAll( aRange, aFilter ) { 
    
       var  pResult         =  await jstFns.sndAPI( 'GET', `${aHost}${aRoute}/?${aRange}&${aFilter}` )

       if ((nID = getID( pResult.body )) >= 1 ) {
//          console.log(  `    doTest_FindAll[1]  ${ Found( pResult.body.length, aModel ) }` + ( aFilter ? ` for ${aFilter}.` : "" ) )
            console.log(  `    doTest_FindAll[1]  ${ Found( pResult.body.length, aModel, aRange, aFilter) }` ) 
        } else {    
            console.log(  `    doTest_FindAll[2]  ${ Found(              0,      aModel, aRange, aFilter) }` ) 
            }   
    return  pResult 
            }
//   -----  --------------  =  --------------------------------------------------------

     async  function doTest_Find( aValToSearch ) { 
    
       var  pResult         =  await jstFns.sndAPI( 'GET', `${aHost}${aRoute}/?${aColToSearch}=${aValToSearch}`)

       if ((nID = getID( pResult.body )) >= 1 ) {
            console.log(  `    doTest_Find[1]     The ${aModel}, '${aValToSearch}', exists with ID: ${nID}.`)
        } else {    
            console.log(  `    doTest_Find[2]     The ${aModel}, '${aValToSearch}', does not exist.`)
            }   
    return  pResult 
            }
//   -----  --------------  =  --------------------------------------------------------

     async  function doTest_Create( aValToSearch, pData ) { 
    
       var  pResult         =  await jstFns.sndAPI( 'GET', `${aHost}${aRoute}/?${aColToSearch}=${aValToSearch}`)

       if ((nID = getID( pResult.body )) >= 1 ) {
            console.log(  `    doTest_Create[1]   The ${aModel}, '${aValToSearch}', already exists with ID: ${nID}.`)
        } else { 
            pResult         =  await jstFns.sndAPI( 'POST', `${aHost}${aRoute}`, pData )
       if ((nID = getID( pResult.body )) >= 1 ) {
            console.log(  `    doTest_Create[2]   The ${aModel}, '${aValToSearch}', was created with ID: ${nID}.`)
        }   }   
    return  pResult 
            }
//   -----  --------------  =  --------------------------------------------------------

     async  function doTest_Update( aValToSearch, pData ) { 
    
       var  pResult         =  await jstFns.sndAPI( 'GET', `${aHost}${aRoute}/?${aColToSearch}=${aValToSearch}`)

       if ((nID = getID( pResult.body )) == 0 ) {
            console.log(  `    doTest_Update[1]   The ${aModel}, '${aValToSearch}', does not exist.  It can't be updated.`)
        } else { 
            pResult         =  await jstFns.sndAPI( 'PUT', `${aHost}${aRoute}/${nID}`, pData )
       if ((nID2 = getID( pResult.body )) >= 1 ) {
            console.log(  `    doTest_Update[2]   The ${aModel}, '${aValToSearch}', was updated for ID: ${nID}.`)
        }   }   
    return  pResult 
            }
//   -----  --------------  =  --------------------------------------------------------

     async  function doTest_Delete( aValToSearch ) { 
    
       var  pResult         =  await jstFns.sndAPI( 'GET', `${aHost}${aRoute}/?${aColToSearch}=${aValToSearch}`)

       if ((nID = getID( pResult.body )) == 0 ) {
            console.log(  `    doTest_Delete[1]   The ${aModel}, '${aValToSearch}', does not exist.  It can't be deleted.`)
        } else { 
            pResult         =  await jstFns.sndAPI( 'DELETE', `${aHost}${aRoute}/${nID}`)

        if (pResult.body && (pResult.body.message || '').match( /was deleted/ )) {
            console.log(  `    doTest_Delete[2]   The ${aModel}, '${aValToSearch}', was deleted for ID: ${nID}.`)
        } else {
            console.log(  `    doTest_Delete[3]   The ${aModel}, '${aValToSearch}', was NOT deleted for ID: ${nID}.`) 
        }   }
    return  pResult 
            }
//   -----  --------------  =   --------------------------------------------------------

     async  function doTest_GetModel( ) { 
    
       var  pResult         =  await jstFns.sndAPI( 'GET', `${aHost}${aRoute}/model`)

        if (pResult.body && pResult.body.FormR_Schema) { pBody = pResult.body
            console.log(  `    doTest_GetModel[1] The Model, '${aModel}', has ${ Object.keys(pBody.FormR_Schema).length } columns in DBSN: ${pBody.FormR_DBSN}.`)
        } else {    
            console.log(  `    doTest_GetModel[2] The Model, '${aModel}', was not returned.`)
            }   
    return  pResult 
            }
//   -----  --------------  =  --------------------------------------------------------

  function  fmtResults( mResults ) {
    return  "\n    mResults:\n-----------------------------------------------"  
         +  fmtObj( mResults ) 
            }
//   -----  --------------  =   --------------------------------------------------------

  function  addDate( n,  d ) { return fmtDate( 6, d, n ).substr( 0, 10 ) }    
  function  getID(  pBody  ) { return pBody ? (pBody.length ? pBody[0][aPrimaryKey] : pBody[aPrimaryKey] ) : 0 }

//   -----  --------------  =   --------------------------------------------------------

  function  plural(      n, a, y, s ) { return   n + " " + ( n == 1 ? a : ( y ? a.replace( y, s ? s : "s" ) : `${a}s` ) ) }
  function  are( b1, b2, n, a, y, s ) { return ( n == 1 ? b1 : b2) + " " + plural( n, a, y, s ) }
  function  Table_is(    n, a       ) { return are( "This is", "These are", n, a, a == "Cities" ? "y" : "", a == "Cities" ? "ies" : "" ) }
  function  Found(       n, a, r, f ) { a = plural( n, a, a == "City" ? "y" : "", a == "City" ? "ies" : "" ).replace( /[0-9 ]/g, '' ); f = (f && r) ? `${f} and ` : ''
                                        return ((n => 1) ? `Found ${n} ` : "Did not find any " ) + a + ((f || r) ? ` for ${ f ? f : '' }${ r ? r : '' }` : '' ) }

//   -----  --------------  =   --------------------------------------------------------

     global.doTest_Create   =  doTest_Create    // C reate
     global.doTest_FindOne  =  doTest_FindOne   // R ead ID
     global.doTest_FindAll  =  doTest_FindAll   // R ead All
     global.doTest_Find     =  doTest_Find      // R ead aColToSearch
     global.doTest_Update   =  doTest_Update    // U pdate aColToSearch
     global.doTest_Delete   =  doTest_Delete    // D elete aColToSearch
     global.doTest_GetModel =  doTest_GetModel  

     global.fmtResults      =  fmtResults
     global.addDate         =  addDate

     global.aPrimaryKey     =  typeof( global.aPrimary     ) != "undefined" ? global.aPrimaryKey  : 'id'
     global.aColToSearch    =  typeof( global.aColToSearch ) != "undefined" ? global.aColToSearch : 'Name'
     global.aModel          =  typeof( global.aModel       ) != "undefined" ? global.aModel       :  global.aColToSearch 
     global.aModel          =          global.aModel.substr( 0, 1 ).toUpperCase( ) + aModel.substr( 1 )
     global.aTable          =  typeof( global.aTable       ) != "undefined" ? global.aTable       :  global.aModel + 's'  

    console.log( "\n-----------------------------------------------\n" )


