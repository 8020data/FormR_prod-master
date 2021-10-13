       var  FormR    =   require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )
            FormR.init(__dirname, __filename );        // FormR.help('all'); process.exit()

//     ------------  =   ------------------------------------------------------------------------------------------

       var  aHost    = 'http://localhost:50251'
       var  aRoute   = '/api/world/countries'

       var  aFilter1 = '?filter={}&range=[10,19]&sort=["code","ASC"]'         // Case doesn't seem to matter
       var  aFilter2 = '?filter={Code: "AAA"}'                                // JSON Args
       var  aFilter3 = '?filter={Name: "United%"}'                            // LIKE ??
       var  pData1   =  { Code: 'AAA', Name: "AAA Country" }                  // Unique Primary Key needs to be part of new data isno Auto-Increment
       var  pData2   =  {              Name: "AAB Country" }                  // Case is important
//     var  pData2   =  { Code: 'AAA', Name: "AAC Country" }                  // Primary Key should not be part of updated data

            jstFns.sndAPI(    'GET',    `${aHost}${aRoute}/test`  )           // country.controllers.test
//          jstFns.sndAPI(    'GET',    `${aHost}${aRoute}/model` )           // country.controllers.getModel
//          jstFns.sndAPI(    'GET',    `${aHost}${aRoute}`       )           // country.controllers.findAll
//          jstFns.sndAPI(    'GET',    `${aHost}${aRoute}/5`   )             // country.controllers.findOne works
//          jstFns.sndAPI(    'GET',    `${aHost}${aRoute}`,      aFilter1 )  // country.controllers.findMany range: 1 thru 19
//          jstFns.sndAPI(    'GET',    `${aHost}${aRoute}`,      aFilter2 )  // country.controllers.findMany Code = 'AAA'
//          jstFns.sndAPI(    'GET',    `${aHost}${aRoute}`,      aFilter3 )  // country.controllers.findMany Name LIKE Code = 'United'
//          jstFns.sndAPI(    'POST',   `${aHost}${aRoute}`,      pData1 )    // country.controllers.createOne works
//          jstFns.sndAPI(    'PUT',    `${aHost}${aRoute}/AAA`,  pData2 )    // country.controllers.updateOne works
//          jstFns.sndAPI(    'DELETE', `${aHost}${aRoute}/AAA`   )           // country.controllers.deleteOne works

//     ------------  =   ------------------------------------------------------------------------------------------

