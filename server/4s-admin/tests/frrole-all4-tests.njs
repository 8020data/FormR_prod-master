
//          FormR    =   require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs` )                            //#.(10418.02.1).(10829.03.1)
       var  FormR    =   require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )   // .(10829.03.1)
            FormR.init(__dirname, __filename );      //    FormR.help(); process.exit()

//     ------------  =   --------------------------------------------------------

       var  aRoute          = '/api/formr/roles'
       var  aHost           = `http://localhost:50254`

       var  aArgs           = '?filter={}&range=[0,9]&sort=["id","ASC"]'

       var  pData1 =
             {  name        : 'swimmer1'
             ,  updatedAt   :  new Date
             ,  createdAt   :  new Date
                }

       var  pData2 =
             {  name        : 'diver'
             ,  updatedAt   :  new Date
                }

    ; (     async          ( ) => {

//      var pResult =   await  jstFns.sndAPI( 'POST',  `${aHost}${aRoute}`, pData1 )    // C reate a rec  .(11103.05.1 RAM Why not .body[0].id?)
//      var  nID    =   pResult.body.id

//    if (pResult.Error) { console.log( "You got an error", pResult.Error); process.exit()  }

//     console.log( pResult )


//                    await  jstFns.sndAPI( 'GET',   `${aHost}${aRoute}`, aArgs  )            // R ead 10 recs

//                    await  jstFns.sndAPI( 'PUT',   `${aHost}${aRoute}/${nID}`, pData2 )     // U pdate a rec

//                    await  jstFns.sndAPI( 'DELETE',`${aHost}${aRoute}`, nID    )            // D elete a red
     var nID = 1
         var pResult =   await jstFns.sndAPI( 'GET',   `${aHost}${aRoute}`, nID    )            // R ead one rec that doesn't exist
       console.log( pResult )


                           } )( )

// ----- ----------  =    ---------------------------------------------------------

