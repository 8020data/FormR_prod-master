       var  FormR    =   require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )
            FormR.init(__dirname, __filename, 'quietly' );        // FormR.help('all'); process.exit()

// -----------------------------------------------------------------------------------------------------------------------------

       var  aHost    = 'http://localhost:50251'

            nDoTests =  5

//          nDoTests =  1   // 1. Check if '/api/world/cities/model'         -> city.controllers.getModel 
//          nDoTests =  2   // 2. Check if '/api/world/cities/1'             -> city.controllers.findOne 
//          nDoTests =  3   // 3. Check if '/api/world/cities'               -> city.controllers.findAll 
//          nDoTests =  4   // 4. Check if '/api/world/cities/?range=[10,19] -> city.controllers.findMany with range
//          nDoTests =  5   // 5. Check if '/api/world/cities'               -> city.controllers.createOne 
//          nDoTests =  6   // 6. Check if '/api/world/cities/?filter={}     -> city.controllers.findMany with filter
//          nDoTests =  7   // 7. Check if '/api/world/cities'               -> city.controllers.updateOne 
//          nDoTests =  8   // 8. Check if '/api/world/cities/delete'        -> city.controllers.deleteOne 

            nNewCityID    =   4079 + 1
            aNewCityName  =  "Atlanta"

// ----------------------------------------------------------------------------------------------------------------

// 1. Check if '/api/world/cities/models' -> city.controllers.getModel works
//    ----------------------------------------------------------------------------------------
      if (doTest( 1, __filename )) {   

      var  aRoute          = '/api/world/cities/model'
      var  aRoute          = '/api/world/countries/model'

                    testRoute_model( 'GET', aRoute )

    async  function testRoute_model( aMethod, aRoute ) {
    try {
           await jstFns.sndAPI(  aMethod, `${aHost}${aRoute}` )
  } catch( pErr ) {
           console.log( `* Error testing model: for route, '${aRoute}':`, pErr );
           }
        } // eof testRoute_model
//    ------------------------------------------------------------------------
      } // eof Test1
// ----------------------------------------------------------------------------------------------------------------

// 2. Check if '/api/world/cities/1' -> city.controllers.findOne works 
//    ----------------------------------------------------------------------------------------
      if (doTest( 2, __filename )) {   

      var  aRoute          = '/api/world/cities/1'
//    var  aRoute          = '/api/world/cities/99999'     // Test Invalid ID 
      
                    testRoute_findOne( 'GET', aRoute )

    async  function testRoute_findOne( aMethod, aRoute ) {
    try {
           await jstFns.sndAPI(  aMethod, `${aHost}${aRoute}` )
  } catch( pErr ) {
           console.log( `* Error testing getOne: for route, '${aRoute}':`, pErr );
           }
        } // eof testRoute_getOne
//    ------------------------------------------------------------------------
      } // eof Test2
// ----------------------------------------------------------------------------------------------------------------

// 3. Check if '/api/world/cities' -> city.controllers.findAll works
//    ----------------------------------------------------------------------------------------
      if (doTest( 3, __filename )) {   

      var  aRoute          = '/api/world/cities'
      
                    testRoute_findAll( 'GET', aRoute )

    async  function testRoute_findAll( aMethod, aRoute ) {
    try {
           await jstFns.sndAPI(  aMethod, `${aHost}${aRoute}` )
  } catch( pErr ) {
           console.log( `* Error testing getAll: for route, '${aRoute}':`, pErr );
           }
        } // eof testRoute_getOne

//    ------------------------------------------------------------------------
      } // eof Test3
// ----------------------------------------------------------------------------------------------------------------

// 4. Check if '/api/world/cities/filter=' -> city.controllers.findMany works with range and sort
//    ----------------------------------------------------------------------------------------
      if (doTest( 4, __filename )) {   

       var  aRoute          = '/api/world/cities'

       var  aData           = '?range=[10,19]&sort=["id","ASC"]'

            jstFns.sndAPI(    'GET',    `${aHost}${aRoute}`, aData )

//    ------------------------------------------------------------------------
      } // eof Test4
// ----------------------------------------------------------------------------------------------------------------

// 5. Check if '/api/world/cities' -> city.controllers.createOne works
//    ----------------------------------------------------------------------------------------
      if (doTest( 5, __filename )) {   

       var  aRoute          = '/api/world/cities'

       var  pData   = {  Name          :  aNewCityName                          // Must be ColToSearch
                      ,  CountryCode   : 'USA'
                      ,  District      : 'Virginia'
//                    ,  Population    :  58404
                         }
            jstFns.sndAPI(    'POST',   `${aHost}${aRoute}`, pData )

//    ------------------------------------------------------------------------
      } // eof Test5
// ----------------------------------------------------------------------------------------------------------------

// 6. Check if '/api/world/cities/filter=' -> city.controllers.findMany works with filter 
//    ----------------------------------------------------------------------------------------
      if (doTest( 6, __filename )) {   

       var  aRoute          = '/api/world/cities'
       var  aData           = `?filter={Name:"{aNewCityName}"}` 
       var  aData           = `?filter={Name:"Kabul"}`                         // Case is important

            jstFns.sndAPI(    'GET',    `${aHost}${aRoute}`, aData )

//    ------------------------------------------------------------------------
      } // eof Test5
// ----------------------------------------------------------------------------------------------------------------

//    ----------------------------------------------------------------------------------------
      if (doTest( 7, __filename )) {   // 7. Check if '/api/world/cities' -> city.controllers.updateOne works

       var  aRoute          = '/api/world/cities'

       var  pData           =  {                 Name: 'Reston' }
//     var  pData           =  {                 Name: 'reston' }       // Case is important
//     var  pData           =  { ID: nNewCityID, Name: 'Reston' }       // Primary Key should not be part of updated data

            jstFns.sndAPI(    'PUT',    `${aHost}${aRoute}/${nNewCityID}`, pData )

//    ------------------------------------------------------------------------
      } // eof Test7
// ----------------------------------------------------------------------------------------------------------------

//    ----------------------------------------------------------------------------------------
      if (doTest( 8, __filename )) {   // 8. Check if '/api/world/cities/delete' -> city.controllers.deleteOne works

      var  aRoute          = `/api/world/cities/${nNewCityID}`

                    testRoute_model( 'DELETE', aRoute )

    async  function testRoute_model( aMethod, aRoute ) {
    try {
           await jstFns.sndAPI(  aMethod, `${aHost}${aRoute}` )
  } catch( pErr ) {
           console.log( `* Error testing model: for model, '${aRoute}':`, pErr );
           }
      } // eof testRoute_model
//    ------------------------------------------------------------------------
      } // eof Test7
// ----------------------------------------------------------------------------------------------------------------
//  eof Tests
// -----------------------------------------------------------------------------------------------------------------------------


