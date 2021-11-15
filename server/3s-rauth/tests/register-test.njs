
//       FormR      =   require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs` )                            //#.(10418.02.1).(10829.03.1)
     var FormR      =   require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )   // .(10829.03.1)
         FormR.init(  __dirname, __filename );       
//       FormR.help('all');  process.exit()                                    

// -------  -----------  =   ------------- : -----------------------------------------

       var  aHost        =  'http://localhost:50253'

       var  aRoute1      =  '/api/rauth/register'                                           
       var  aRoute2      =  '/api/formr/users'                                           
     
       var  pBody        ={ 'username'     : 'robin8'
//                        , 'email'        : 'robin.mattern@sicomm.net'       // .(10228.06.2 Email already in use)
                          , 'email'        : 'robin8.mattern@sicomm.net'
                          , 'password'     : '1234'
//                        , 'passworddate' : 'apple'                          //#.(bad data) 
//                        , 'passworddate' :  addDate( 90 )                   //#.(it is set by the create controller) 
//                        , 'roles'        :['editor']                        // .(11112.01.1 Requires sequelize OneToMany table: user_roles)
                          , 'role'         : 'editor'                         // .(11112.01.2 This doesn't)
                             }

                             
       var  onResponse   = function( pError,  pResponse,  pBody ) {
                             console.log( " Register:", pBody ? pBody.message : pError.message ); 
                             }
                             console.log( "" )
//          -----------  =   -----------------------------------

//                   doTests() 
//   async  function doTests() { ... }

  ;( async  function doTests() {   bQuiet = 1; 
//;( async  ( ) => { 
//                                 sendAPI(  'GET',    `${aHost}${aRoute2}` );                                        process.exit() 
//          pResult      =   await sndAPI(   'GET',    `${aHost}${aRoute2}` ); console.log( fmtObj( pResult.body ) ); process.exit() 

//                           await sendAPI(  'DELETE', `${aHost}${aRoute2}/147`,    '', onResponse );    return 
                             await sendAPI(  'DELETE', `${aHost}${aRoute2}/Robin8`, '', onResponse ); // return 

            pResult      =   await sendAPI(  'POST',   `${aHost}${aRoute1}`,     pBody, onResponse )
      try { nID          =         pResult.body.message.match( /User ([0-9]+) reg/ )[1]  } catch(e) { nID = 0 }  

//      if (nID > 0)     {         sendAPI(  'DELETE', `${aHost}${aRoute2}/${nID}`, '', onResponse ) }
            
            }  // eof async function
     )( )  // eof async function call


// -------  -----------  =   ------------- : -----------------------------------------

     async  function sndAPI( aMethod, aURL, pBody ) {
                     return  await jstFns.sndAPI( aMethod, aURL, pBody )
            }
//          -----------  =   -----------------------------------

     async  function  sendAPI( aMethod, aURL, pBody, xNext  ) {

       var  sndAPI       =   jstFns.sndAPI; 
//     var  request      =   require( 'request'   );
//     var  fetch        =   require( 'node-fetch');

       var  pHeaders     ={ 'cache-control': 'no-cache' }
//                        , 'content-type' : 'application/json' }

//     var  pOptions     ={ 'method'       :  aMethod
//                        , 'url'          :  aURL
       var  pOptions     ={ 'headers'      :  pHeaders
//                        , 'body'         :  pBody ? pBody : {}
//                        , 'json'         :  true
                             }
       if (pBody) {
           pOptions         .body          =  pBody                
           }
            
       var  pResult      =   await sndAPI( aMethod, aURL, pOptions )

//                                request( options, xNext ? xNext : onComplete )

//     var  pResult      =   await  fetch( aMethod, aURL, pOptions )
//      if (pOptions.json) { pResult.body = await pResult.response.json() }


            onComplete   =   xNext ? xNext : onComplete

//          -----------  =   -----------------------------------

            onComplete(      pResult.Error, pResult.response, pResult.body ) 
    return  pResult 

  function  onComplete(      pError, pResponse, pBody ) {

        if (pError) {        console.log( "\n Error:",    fmtObj( pError    ) ); }
//        else      {        console.log( "\n Response:", fmtObj( pResponse ) ); }
          else      {        console.log( "\n Body:",     fmtObj( pBody     ) ); }
            }        
//          -----------  =   -----------------------------------
         } // eof sendAPI 
// -------  -----------  =   ------------- : -----------------------------------------

