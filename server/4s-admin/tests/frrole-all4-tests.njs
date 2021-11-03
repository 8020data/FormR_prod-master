
//          FormR    =   require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs` )                            //#.(10418.02.1).(10829.03.1)
       var  FormR    =   require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )   // .(10829.03.1)
            FormR.init(__dirname, __filename );       //  FormR.help(); process.exit()

//     ------------  =   --------------------------------------------------------

       var  aRoute          = '/api/formr/roles'
       var  aHost           = `http://localhost:50253`

       var  aArgs           = '?filter={}&range=[0,9]&sort=["id","ASC"]'

       var  pData1 =
             {  name        : 'swimmer'
             ,  updatedAt   :  new Date
             ,  createdAt   :  new Date
                }

       var  pData2 =
             {  name        : 'diver'
             ,  updatedAt   :  new Date
                }

    ; (     async          ( ) => {

       var  nID = ( await  jstFns.sndAPI( 'POST',  `${aHost}${aRoute}`, pData1 ) ).body.id  // C reate a rec  .(11103.05.1 RAM Why not .body[0].id?)
                    await  jstFns.sndAPI( 'GET',   `${aHost}${aRoute}`, aArgs  )            // R ead 10 recs
                    await  jstFns.sndAPI( 'PUT',   `${aHost}${aRoute}/${nID}`, pData2 )     // U pdate a rec
                    await  jstFns.sndAPI( 'DELETE',`${aHost}${aRoute}`, nID    )            // D elete a red

                           jstFns.sndAPI( 'GET',   `${aHost}${aRoute}`, nID    )            // R ead one rec that doesn't exist
                           } )( )

// ----- ----------  =    ---------------------------------------------------------

