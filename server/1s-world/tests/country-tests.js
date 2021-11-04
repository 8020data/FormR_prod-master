       var  FormR    =   require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )
            FormR.init(__dirname, __filename );        // FormR.help('all'); process.exit()

//     ------------  =   ------------------------------------------------------------------------------------------

            nDoTest  = 12

       var  aHost    = 'http://localhost:50251'
       var  aRoute   =                       '/api/world/countries'

       var  aFilter1 = 'USA'                                                  // Case doesn't seem to matter
       var  aFilter2 = '?Name=United'                                         // fails
       var  aFilter3 = '?filter={Code:"USA"}'                                 // JSON Args
       var  aFilter4 = '?filter={Name:"United*"}'                             // LIKE ??
       var  aFilter5 = '?filter={Name:">United*"},{Code:""}'                  // LIKE ??
       var  aFilter6 = `?filter={Name:"Pro",CountryCode:"USA"}`               // Fails: unexpected token
       var  aFilter7 = '?filter={or:{Name:"pro"},{Code:"usa"}}' 
       var  aFilter8 = '?filter={and: [ { id: [ 1,2,3] }, { id: { id: 10 } } ] }'
       var  aFilter9 = '?filter={}&range=[10,19]&sort=["code","ASC"]'         // Case doesn't seem to matter

       var  pData1   =  { Code: 'AAA', Name: "AAA Country" }                  // Unique Primary Key needs to be part of new data isno Auto-Increment
       var  pData2   =  {              Name: "AAB Country" }                  // Case is important
//     var  pData2   =  { Code: 'AAA', Name: "AAC Country" }                  // Primary Key should not be part of updated data

   if( nDoTest ==  1 ) { jstFns.sndAPI( 'GET',    `${aHost}${aRoute}/test`  ) }          // check country.controllers.test
   if( nDoTest ==  2 ) { jstFns.sndAPI( 'GET',    `${aHost}${aRoute}/model` ) }          // check country.controllers.getModel
   if( nDoTest ==  3 ) { jstFns.sndAPI( 'GET',    `${aHost}${aRoute}`       ) }          // check country.controllers.findAll
   if( nDoTest ==  4 ) { jstFns.sndAPI( 'GET',    `${aHost}${aRoute}/AGO`   ) }          // check country.controllers.findOne works
   if( nDoTest == 11 ) { jstFns.sndAPI( 'GET',    `${aHost}${aRoute}`,      aFilter1 ) } // check country.controllers.findMany range: 1 thru 19
   if( nDoTest == 11 ) { jstFns.sndAPI( 'GET',    `${aHost}${aRoute}`,      aFilter1 ) } // check country.controllers.findMany range: 1 thru 19
   if( nDoTest == 12 ) { jstFns.sndAPI( 'GET',    `${aHost}${aRoute}`,      aFilter2 ) } // check country.controllers.findMany Code = 'AAA'
   if( nDoTest == 13 ) { jstFns.sndAPI( 'GET',    `${aHost}${aRoute}`,      aFilter3 ) } // check country.controllers.findMany Name LIKE Code = 'United'
   if( nDoTest == 14 ) { jstFns.sndAPI( 'GET',    `${aHost}${aRoute}`,      aFilter4 ) } // check country.controllers.findMany Name LIKE Code = 'United'
   if( nDoTest == 15 ) { jstFns.sndAPI( 'GET',    `${aHost}${aRoute}`,      aFilter5 ) } // check country.controllers.findMany Name LIKE Code = 'United'
   if( nDoTest == 16 ) { jstFns.sndAPI( 'GET',    `${aHost}${aRoute}`,      aFilter6 ) } // check country.controllers.findMany Name LIKE Code = 'United'
   if( nDoTest == 17 ) { jstFns.sndAPI( 'GET',    `${aHost}${aRoute}`,      aFilter7 ) } // check country.controllers.findMany Name LIKE Code = 'United'
   if( nDoTest == 18 ) { jstFns.sndAPI( 'GET',    `${aHost}${aRoute}`,      aFilter8 ) } // check country.controllers.findMany Name LIKE Code = 'United'
   if( nDoTest == 19 ) { jstFns.sndAPI( 'GET',    `${aHost}${aRoute}`,      aFilter9 ) } // check country.controllers.findMany Name LIKE Code = 'United'
   if( nDoTest ==  5 ) { jstFns.sndAPI( 'POST',   `${aHost}${aRoute}`,      pData1 ) }   // check country.controllers.createOne works
   if( nDoTest ==  6 ) { jstFns.sndAPI( 'PUT',    `${aHost}${aRoute}/AAA`,  pData2 ) }   // check country.controllers.updateOne works
   if( nDoTest ==  7 ) { jstFns.sndAPI( 'DELETE', `${aHost}${aRoute}/AAA`   )        }   // check country.controllers.deleteOne works

//     ------------  =   ------------------------------------------------------------------------------------------

