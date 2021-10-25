       var  FormR    =   require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )
            FormR.init(__dirname, __filename );        // FormR.help('all'); process.exit()

//     ------------  =   ------------------------------------------------------------------------------------------

       nTest  = 11

       var  aHost    = 'http://localhost:50251'
       var  aRoute   = '/api/world/countries'

       var  aFilter1 = 'USA'                                                  // Case doesn't seem to matter
       var  aFilter2 = '?Code=USA'                                            // Case doesn't seem to matter
       var  aFilter3 = '?filter={ Code: "AAA" }'                              // JSON Args
       var  aFilter4 = '?filter={ Name: "United*" }'                          // LIKE ??
       var  aFilter5 = '?filter={ Name: ">United*" },{Code: "" }'                            // LIKE ??
       var  aFilter6 = `?filter={ Name: "Pro", CountryCode: "USA" }`          // Fails: unexpected token
       var  aFilter7 = '?filter={ or: { Name: "joe"}, { Code: "sdf" } }' 
       var  aFilter8 = '?filter={ and: [ { id: [ 1,2,3] }, { id: { id: 10 } } ] }'
       var  aFilter9 = '?filter={}&range=[10,19]&sort=["code","ASC"]'         // Case doesn't seem to matter

       var  pData1   =  { Code: 'AAA', Name: "AAA Country" }                  // Unique Primary Key needs to be part of new data isno Auto-Increment
       var  pData2   =  {              Name: "AAB Country" }                  // Case is important
//     var  pData2   =  { Code: 'AAA', Name: "AAC Country" }                  // Primary Key should not be part of updated data

   if( nTest ==  1 ) { jstFns.sndAPI( 'GET',    `${aHost}${aRoute}/test`  ) }          // country.controllers.test
   if( nTest ==  2 ) { jstFns.sndAPI( 'GET',    `${aHost}${aRoute}/model` ) }          // country.controllers.getModel
   if( nTest ==  3 ) { jstFns.sndAPI( 'GET',    `${aHost}${aRoute}`       ) }          // country.controllers.findAll
   if( nTest ==  4 ) { jstFns.sndAPI( 'GET',    `${aHost}${aRoute}/AGO`   ) }          // country.controllers.findOne works
   if( nTest == 11 ) { jstFns.sndAPI( 'GET',    `${aHost}${aRoute}`,      aFilter1 ) } // country.controllers.findMany range: 1 thru 19
   if( nTest == 11 ) { jstFns.sndAPI( 'GET',    `${aHost}${aRoute}`,      aFilter1 ) } // country.controllers.findMany range: 1 thru 19
   if( nTest == 12 ) { jstFns.sndAPI( 'GET',    `${aHost}${aRoute}`,      aFilter2 ) } // country.controllers.findMany Code = 'AAA'
   if( nTest == 13 ) { jstFns.sndAPI( 'GET',    `${aHost}${aRoute}`,      aFilter3 ) } // country.controllers.findMany Name LIKE Code = 'United'
   if( nTest == 14 ) { jstFns.sndAPI( 'GET',    `${aHost}${aRoute}`,      aFilter4 ) } // country.controllers.findMany Name LIKE Code = 'United'
   if( nTest == 15 ) { jstFns.sndAPI( 'GET',    `${aHost}${aRoute}`,      aFilter5 ) } // country.controllers.findMany Name LIKE Code = 'United'
   if( nTest == 16 ) { jstFns.sndAPI( 'GET',    `${aHost}${aRoute}`,      aFilter6 ) } // country.controllers.findMany Name LIKE Code = 'United'
   if( nTest == 17 ) { jstFns.sndAPI( 'GET',    `${aHost}${aRoute}`,      aFilter7 ) } // country.controllers.findMany Name LIKE Code = 'United'
   if( nTest == 18 ) { jstFns.sndAPI( 'GET',    `${aHost}${aRoute}`,      aFilter8 ) } // country.controllers.findMany Name LIKE Code = 'United'
   if( nTest == 19 ) { jstFns.sndAPI( 'GET',    `${aHost}${aRoute}`,      aFilter9 ) } // country.controllers.findMany Name LIKE Code = 'United'
   if( nTest ==  5 ) { jstFns.sndAPI( 'POST',   `${aHost}${aRoute}`,      pData1 ) }   // country.controllers.createOne works
   if( nTest ==  6 ) { jstFns.sndAPI( 'PUT',    `${aHost}${aRoute}/AAA`,  pData2 ) }   // country.controllers.updateOne works
   if( nTest ==  7 ) { jstFns.sndAPI( 'DELETE', `${aHost}${aRoute}/AAA`   )        }   // country.controllers.deleteOne works

//     ------------  =   ------------------------------------------------------------------------------------------

