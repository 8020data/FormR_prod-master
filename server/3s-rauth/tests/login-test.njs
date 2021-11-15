
//       FormR      =   require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs` )                            //#.(10418.02.1).(10829.03.1)
     var FormR      =   require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )   // .(10829.03.1)
         FormR.init(  __dirname, __filename );       //  FormR.help(); process.exit()                                    

// -------  -----------  =   ------------- : -----------------------------------------

       var  aHost        =  'http://localhost:50253'

       var  aRoute1      =  '/api/rauth/login'                                           
     
       var  pBody        ={ 'username'     : 'editor'
                          , 'password'     : '1234'
                             }

       var  onResponse   = function( pError,  pResponse,  pBody ) {
                             console.log( "\n Signin Response:", pBody ? fmtObj( pBody ) : pError.message ); 
                             }
//          -----------  =   -----------------------------------

       //   sendAPI(        'POST', aRoute1, pBody  )
            sendAPI(        'POST', aRoute1, pBody, onResponse )

// -------  -----------  =   ------------- : -----------------------------------------

  function  sendAPI( aMethod, aRoute, pBody, xNext  ) {

       var  request      =   require( 'request' );

       var  pHeaders     ={ 'cache-control': 'no-cache'
                          , 'content-type' : 'application/json' }

       var  options      ={ 'method'       :  aMethod
                          , 'url'          :  aHost + aRoute
                          , 'headers'      :  pHeaders
                          , 'body'         :  pBody ? pBody : {}
                          , 'json'         :  true
                             }

            request( options, xNext ? xNext : onComplete )

//          -----------  =   -----------------------------------
         
  function  onComplete( pError, pResponse, pBody ) {

        if (pError) {        console.log( "\n Error:",    fmtObj( pError    ) ); }
//        else      {        console.log( "\n Response:", fmtObj( pResponse ) ); }
          else      {        console.log( "\n Body:",     fmtObj( pBody     ) ); }
            }        
//          -----------  =   -----------------------------------
         } // eof sendAPI 
// -------  -----------  =   ------------- : -----------------------------------------

