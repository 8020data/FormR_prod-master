
//       FormR      =   require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs` )                            //#.(10418.02.1).(10829.03.1)
     var FormR      =   require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )   // .(10829.03.1)
         FormR.init(  __dirname, __filename );       //  FormR.help(); process.exit()                                    

// -------  -----------  =   ------------- : -----------------------------------------

       var  aHost        =  'http://localhost:50253'

       var  aRoute1      =  '/api/rauth/register'                                           
       var  aRoute2      =  '/api/formr/users'                                           
     
       var  pBody        ={ 'username'     : 'robin5'
//                        , 'email'        : 'robin.mattern@sicomm.net'       // .(10228.06.2 Email already in use)
                          , 'email'        : 'robin5.mattern@sicomm.net'
                          , 'password'     : '1234'
//                        , 'roles'        :[ 'editor'  ]                      // .(11112.01.1 Requires sequelize OneToMany table: user_roles)
                             }

       var  onResponse   = function( pError,  pResponse,  pBody ) {
                             console.log( "\n Register:", pBody ? pBody.message : pError.message ); 
                             }
//          -----------  =   -----------------------------------

       //   sendAPI(        'POST',      aRoute1,    pBody, onResponse )
       //   sendAPI(        'DELETE', `${aRoute2}/124`, '', onResponse )
       //   sendAPI(        'GET',    `${aRoute2}` )

// -------  -----------  =   ------------- : -----------------------------------------

  function  sendAPI( aMethod, aRoute, pBody, xNext  ) {

       var  request      =   require( 'request' );

       var  pHeaders     ={ 'cache-control': 'no-cache'
                            'content-type' : 'application/json' }

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

