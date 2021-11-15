
//       FormR      =   require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs` )                            //#.(10418.02.1).(10829.03.1)
     var FormR      =   require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )   // .(10829.03.1)
         FormR.init(  __dirname, __filename );       //  FormR.help(); process.exit()                                    

// -------  -----------  =   ------------- : -----------------------------------------

       var  aHost        =  'http://localhost:50253'

       var  aRoute1      =  '/api/rauth/login'                              // .(10909.01.7)
       var  aRoute2      =  '/api/rauth/session'                            // .(10311.07.2).(10406.03.1 RM Was: /api/users/session)// .(10909.01.8)    

//     var  pBody        = { 'username' : 'viewer', 'password' : '1234'  }
       var  pBody        = { 'username' : 'robin8', 'password' : '1234'  }
//     var  pBody        = { 'username' : 'suzee',  'password' : '1234'  }
                          
//     var  pBody        = { 'username' : 'robinx', 'password' : ''      }  // Invalid Password
//     var  pBody        = { 'username' : 'robinx', 'password' : 'sdf'   }  // Invalid user
//     var  pBody        = { 'username' : 'robin1',                         // Not an admin or editor, but is a user 
//     var  pBody        = { 'username' : 'robin1', 'password' : '1234x' }  // Invalid password 
//     var  pBody        = { 'username' : 'robin1', 'password' : '1234'  }  // Valid password 
//                        }
//          -----------  =   -----------------------------------

            sendAPI(         'POST', aRoute1, pBody, '', onLogin )

// -------  -----------  =   ------------- : -----------------------------------------

  function  onLogin( pError, pResponse, pBody ) {
        if (pError) {        console.log( "\nError:",          fmtObj( pError ) ); return }
                             console.log( "\nLogin Response:", fmtObj( pBody  ) ); 

//      if (pBody.message.match( /User Not Found|Invalid Password/i )) { return }
      if (! pBody.accessToken) { return }

            sendAPI(        'GET',  aRoute2, '', pBody.accessToken, onAuth )
            } // eof onLogin
//          -----------  =   -----------------------------------

  function  onAuth( pError,  pResponse, aBody ) {
        if (pError) {        console.log( "\nError:",          fmtObj( pError ) ); return }
                             console.log( "\nSession Response:", `\n'${aBody}'` ); 
            }
//          -----------  =   -----------------------------------

  function  sendAPI( aMethod, aRoute, pBody, aToken, xNext  ) {

       var  request      =   require( 'request' );

       var  pHeaders     ={ 'cache-control': 'no-cache'
                          , 'content-type' : 'application/json' 
                             }
        if (aToken)       { 
            pHeaders      [ 'x-access-token' ] = aToken
            }                  

       var  options       ={ 'method'       :  aMethod
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
