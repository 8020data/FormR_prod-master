// --------------------------------------------------------------------------------------------------------

//          FormR       =  require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs` )                            //#.(10418.02.1).(10829.03.1)
        var FormR       =  require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )   // .(10829.03.1)
            FormR.init(  __dirname, __filename );       //  FormR.help(); process.exit()                                    

// --------------------------------------------------------------------------------------------------

        var jwt                 =  require( 'jsonwebtoken' );
        var bcrypt              =  require( 'bcryptjs'     );

//    const config              =  require("../config/auth.config");                                        //#.(10227.03.2)
//      var aSecret             = 'bezkoder-secret-key'                                                     //#.(10227.03.2).(10317.01.1)
        var aJWTkey             =  require( `${FORMRs_3}JWT_Config1-0.njs`).Key                             // .(10317.01.2)
        var aSalt_inTransit     = '$2a$04$qy3HhHlVJT/wUB364EVjmu'                                           // .(10416.04.1 RAM Need this for bcrypt.hash to match).(11113.01.1 RAM Was: aSalt)
        var aSalt_atRest        =  8                                                                        // .(11113.01.2 RAM For DB storage)

            AUTH                = 'rauth'                                                                   // .(10330.08.1 RAM Should it 'auth' or 'formr'?).(10909.01.9 RAM or 'rauth', or 'frauth')
//          bQuiet              =  true

      if (! process.env.DBSN) {
            process.env.DBSN    = 'MySQL_AWS_IO' 
            }
// --------------------------------------------------------------------------------------------------

//      var aTable              = `${AUTH}/auth                                                             // .(10329.02.1 RAM Was 'auth').(10330.08.2)
        var aTable              =  AUTH                                                                     // .(10329.02.1 RAM Was 'auth').(10330.08.2)
        var aModel              = 'frauth'                                                                  // .(10329.02.2).(10330.08.3).(10331.06.1 RAM I like frauth, today)
        var aPrimaryCol         = 'name'

//      --------------------------------------------------------------------------------------------------

        var aFName              = `${aModel}.controller`

        var pConfig         ={ ControllersFilename: __filename }                                            // .(10301.03.1 RAM Let's try saving the file name)
//          pConfig.Cmd     = `use default controllers`                                                     // .(11111.01.1 RAM Let's set it to use the default controllers)
//          pConfig.Cmd     = `don't use default controllers`                                               // .(11111.01.1 RAM Let's set it to not use the default controllers)
//          pConfig.Cmd     =  'replace default controllers'                                                //#.(10301.03.2 RAM Replace the default Controller Routes).(10918.02.7)
//          pConfig.Cmd     =  `replace default controllers, then use ${aModel} controllers`                // .(10918.02.7 RAM if not set here, see .env, otherwise it defaults to 'use')
//  -->     pConfig.Cmd     = `dont use default controllers, use ${aModel} controllers`                     // .(10918.02.7 RAM if not set here, see .env, otherwise it defaults to 'use')

//      var pModel          =  require( `${APP_HOME}/api/models/index.js` )[ aModel ]                       //#.(10109.03.1 RAM Make Generic).(10314.08.3).(10318.02.5).(10414.02.7)
//      var pModel          =  require( `${FORMRs_4_API}/models/index.js` )[ aModel ]                       //#.(10414.02.8).(11109.11.2 RAM This is undefined because there is no model for 'frauth')

        var db              =  require( `${FORMRs_4_API}/models/index.js` );                                // .(10328.06.6 RAM Back to normal app).(10414.02.6).(11109.11.3)

        var User            =  db.fruser;                                                                   //#.(10228.03.1 RAM Was: db.user).(10310.01.2).(10326.07.x RAM And 'fr...' are the actual FormR model names)
        var Role            =  db.frrole;                                                                   // .(10228.03.2).(10310.01.3).(10326.07.x)

//      var Op              =  require( '../models/index.js' ).Sequelize.Op;                                //#.(10228.03.3 RAM Was: db.Sequelize.Op).(10310.01.4)
        var Op              =  db.Sequelize.Op;                                                             // .(10228.03.3 RAM Was: db.Sequelize.Op).(10310.01.4)

// --------------------------------------------------------------------------------------------------

        var pRoutes  =  //  {  aRoute                            : [ aRoles,    aController ] = mControllerRoles }
               { 'Method        Route (Order is important!)    ' : [ 'Roles ',  'Controller          ' ]    // .(11109.01.1 RAM Add 1st row to all commas on each subsequent row) 
//                -----------  --------------------------------       -------    --------------------
               , 'http.post    /api/${aTable}/register/        ' : [ '      E', 'register            ' ]    // .(10228.12.1).(10305.03.1 RAM S.B http.post, not get)
               , 'http.post    /api/${aTable}/login/           ' : [ '      E', 'login               ' ]    // .(10228.12.2).(10305.03.2)
               , 'http.get     /api/${aTable}/session/         ' : [ '      E', 'session             ' ]    // .(10312.10.1 RAM Let's add it here)
               , 'http.get     /api/${aTable}/test/            ' : [ '      I', 'test                ' ]    // .(10917.09.7 RAM Let's test this controller).(10918.04.2)
                  }
            delete pRoutes[ 'Method        Route (Order is important!)    ' ]                               // .(11109.01.2 RAM Delete the 1st row) 

// ---------------------------------------------------------------------------------------------------------

   var pControllers = {

//          controller1       : {}                                                                          //#.(10917.06.3)
            _frauthController : { Table: aDefault, Model: aModel }                                          // .(10917.06.3 RAM Identify yourself)

//          ----------------------------------------------------------------------------------

          , getModel        :  function getModel( req, res ) { trace( `${aModel}.model` )

//          var aModel_JSON =  require( 'fs' ).readFileSync( `${APP_HOME}/api/models/${aModel}.model.json`, 'ASCII' )       //#.(10414.04.1 RAM Use fruser to be conistent. Or it could be ${aModel} as it was).(10903.01.1)
            var aModel_JSON =  JSON.stringify( pModel.RSchema )                                                             // .(10903.01.1 RAM Get a Live version)

                               res.json( JSON.parse( aModel_JSON ) )                                                        // .(10414.04.4 RAM Gotcha: var aModel = `{aModel} is undefined).(10903.01.2)

            } // eof `${aFName}.getModel`
//          ------------------------------------------------------------------

, register  : function register( req, res ) { trace( `    username: ${req.body.username}` ) // .(10228.12.3)

//   var addDate  = function( n, d )  { return fmtDate( 6, new Date( d.setDate( d.getDate() + n ) ) ).substr( 0, 10 ) }
     var addDate  = function( n, d )  { return fmtDate( 6, d, n ).substr( 0, 10 ) }                                         // .(10314.06.1 RAM Use fmtDate)

     var aNewRole =  req.body.username.match( /admin/  ) ? 'admin'  : 'viewer'                                              // .(10416.06.1 RAM Cute. The default roles if admin or editor is contained in the username) 
         aNewRole =  req.body.username.match( /editor/ ) ? 'editor' :  aNewRole                                             // .(10416.06.2)   

     if (req.body.password.match( /^\$(.){50,60}/ ) == null) {                                                              // .(11113.01.3 Beg RAM HASH it if not already).(11114.04.1 RAM was: {59}, could be {50} as it means at least)
                                        trace( `    Encrypting Password: '${ req.body.password }' (un-encrypted)` )         // .(11114.05.1 RAM More info)
         req.body.password  = bcrypt.hashSync( req.body.password, aSalt_inTransit )
                                        trace( `                     to: '${ req.body.password }' (encrypted InTransit)` )  // .(11114.05.2)         
     } else {                                        
                                        trace( `     Receiving Password: '${ req.body.password }' (encrypted InTransit)` )  // .(11114.05.3)
         }                                                                                                                  // .(11113.01.3 End)

     var pNewUser =
          {  username       :  req.body.username
          ,  email          :  req.body.email
          ,  active         :  req.body.active       ? req.body.active       : 'yes'                                // .(10314.04.1 RAM Added)
          ,  role           :  req.body.role         ? req.body.role         :  aNewRole                            // .(10416.06.3)
          ,  passworddate   :  req.body.passworddate ? req.body.passworddate :  addDate( 90 )                       // .(10314.06.2) 

//        ,  password       :  bcrypt.hashSync(  req.body.password, aSalt_inTransit )                               //#.(10416.04.2 RAM Was , 8).(11113.01.3 RAM was: aSalt)
//        ,  password       :                    req.body.password                                                  //#.(10416.04.8 RAM It'coming in encrypted)
          ,  password       :  bcrypt.hashSync(  req.body.password, aSalt_atRest )                                  // .(10416.04.9 RAM But needs to be encrypted again to go into the DB).(11113.01.5 RAM was: 8)
             }

      User.create( pNewUser )

          .then( function onAddUser( user ) {                                                                       // .(10228.04.4 RAM Get rid of anonymous function)

     if (req.body.roles) {

         Role.findAll( { where: { name: { [Op.or]: req.body.roles } } } )

             .then( roles => {   user.setRoles( roles )                                                             // .(10312.06.1 RAM This Sequilize method stores each role in {req.body.roles} into the related tables 'user_roles')
                                     .then( function setRole( ) {                                                   // .(10228.04.4 RAM Get rid of anonymous function)
                             var aRoles =  roles.map( ( aRole, i ) => roles[i].name ).join( ',' )                   // .(10311.05.5 Beg RAM SAve list of roles)
                             var aMsg   = `User ${user.id} registered successfully for role(s): ${ aRoles }.`       // .(11113.10.4)
                                 res.send( { message: aMsg } ); trace( aMsg.padStart( 4 + aMsg.length ) );          // .(10228.05.x RAM user roles).(10311.05.5 End)
                     } );        } );
     } else {  //                user.setRoles( [ 1 ]  )                                                            //#.(10312.06.1 RAM Not sure how [ 1 ] sets a non-existant role for the new user)
               //                    .then( function setRole1( ) {                                                  //#.(10228.04.4 RAM Get rid of anonymous function).(10312.06.2)
                             var aMsg   = `User ${user.id} registered successfully for role: ${ pNewUser.role }.`   // .(10312.06.3 RAM Was: .roles[0])//.(11113.10.5)
                                                                trace( `     being stored in DB: '${ pNewUser.password }' (encrypted atRest)` )         
                                 res.send( { message: aMsg } ); trace( aMsg.padStart( 4 + aMsg.length ) );
               //                } );                                                                               // .(10228.05.x RAM user role[1]).(10311.05.5 End)
//                               trace("User registered successfully!" )                                            //#.(10228.05.x RAM user role = 1).(10311.05.6)
//                               res.send( { message: "User registered successfully!" } ); } );                     //#.(10311.05.6)
              }
        } )
    .catch( err => {
                                 trace(  `${ "Registration failed!".padStart( 4 + 20 ) }\n` + err.message )         // .(10228.05.x)
            res.status( 500 ).send({ message: err.message } ); } );

     } // eom register( req, res ) { ... }
//   ------------------------------------------------------------------------------------------


//   ------------------------------------------------------------------------------------------

, login   : function login( req, res )    { trace( `\nLogin for ${req.body.username}` )             // .(10228.12.4)

    User.findOne( { where: { username: req.body.username } } )

    .then( function chkUser( user ) {                                                               // .(10228.04.4 RAM Get rid of anonymous function)

        if (!user) {             trace(  "User Not found.".padStart( 4 + 15 ) )                     // .(10228.05.x)
                                 return res.status(404).send( { message: "User Not found." } ); 
                                 }
           if (req.body.password.match( /^\$(.){50,60}/ ) == null) {                                // .(11113.01.6 Beg RAM Check if sent unhashed).(11114.04.2)                              
                                 trace(   `    Checking Password:   '${req.body.password}' (un-encrypted)` )
             req.body.password = bcrypt.hashSync(  req.body.password, aSalt_inTransit )        
              }                                                                                     // .(11113.01.6
                                 trace(   `    Checking Password:   '${req.body.password}' (encrypted inTransit)` )         
                                 trace(   `       vs. stored in DB: '${user.password}' (encrypted atRest)`     )         

          var passwordIsValid  = bcrypt.compareSync( req.body.password, user.password );
         if (!passwordIsValid) {
                                 trace(  "Invalid Password.".padStart( 4 + 17 ) )                   // .(10228.05.x)
                                 return res.status(401).send( { accessToken: null, message: "Invalid Password!" } ); 
                                 }
//        var token = jwt.sign( { id: user.id }, config.secret, { expiresIn: 86400 } )              //#.(10227.03.3 RAM 86400 = 24 hours)
          var token = jwt.sign( { id: user.id },       aJWTkey, { expiresIn: 86400 } )              // .(10227.03.3 RAM Was: config.secret, 86400 = 24 hours).(10317.01.1 Was aSecret)
/*                                                                                                  //#.(10415.05.2 Beg)
          var authorities = [], aRoles = ""                                                         // .(10311.05.4)
              user.getRoles( ).then( function setRoles( roles ) {                                   // .(10228.04.4 RAM Get rid of anonymous function)
//                           var aRoles = user.getRoles().join( ",")                                //#.(10311.05.1 RAM user.getRoles() is a promise not an array)
//                           var aRoles = roles.join( ",")                                          //#.(10311.05.3 RAM roles is a array of sequelize objects)
         for (let  i = 0;  i  <  roles.length;  i++) {            
                                 aRoles = `${aRoles},${roles[i].name}`                              // .(10311.05.5)
              authorities.push( "ROLE_" + roles[i].name.toUpperCase() );
              }
                             var nWdt   =  4 + 29 + aRoles.length - 1
                                 trace(  `Login successful for roles: '${ aRoles.substr(1) }'.`.padStart( nWdt ) )   // .(10228.05.x).(10311.05.2)
*/                                                                                                                   //#.(10415.05.2 End)
//                               trace(  `    Login successful for role: '${ user.role }'.` )                        // .(10415.05.3)
                                 trace(  `    Logged in with role: '${ user.role }', user.id: ${ user.id }` )  
          var pData =                                                                                                // .(10312.01.1 RAM Need to see it when debugging)
               {  id           : user.id
               ,  username     : user.username
               ,  email        : user.email
//             ,  password     : user.password                                                      // .(10312.01.1 RAM Don't send this)
               ,  active       : user.active                                                        // .(10311.08.1 RAM Add fields for Bruce)
               ,  group        : user.group                                                         // .(10312.02.1 RAM Added)
               ,  role         : user.role                                                          // .(10311.08.2)
//             ,  user_roles   : authorities                                                        // .(10415.05.1 RAM Not needed)
               ,  passworddate : user.passworddate                                                  // .(10311.08.3)
               ,  createdAt    : String(user.createdAt)                                             // .(10311.08.3 string violation: createdAt cannot be an array or an object,
               ,  updatedAt    : String(user.updatedAt)                                             // .(10311.08.4 string violation: updatedAt cannot be an array or an object,)
               ,  accessToken  : token
                  };

              res.status( 200 ).send( pData )

//        } ); // user.getRoles(        ).then( function setRoles( roles ) { ... } )                //#.(10415.05.2)
        } )    // User.findOne( { ... } ).then( function chkUser(  user  ) { ... } )

    .catch( err => {             trace(  "Login failed.".padStart( 4 + 13 ) )                       // .(10228.05.x)
                                 res.status( 500 ).send( { message: err.message } );
            } );

     }  // eof login( req, res ) { ... }
//   ------------------------------------------------------------------------------------------

, session : function session( req, res ) {  // trace( `    req.headers.x-access-token` )                // .(10312.12.1 Beg RAM)

       var  aToken = req.headers[ 'x-access-token']; 
                               trace( `    x-access-token:      '${ aToken.substr( 0, 70 ) }\n${ aToken.substr( 70 ).padStart( 86 + 70 ) }'` )
               
       var  pToken = verify( aToken )

        if (pToken.err) {      trace( "       Invalid token" )
            res.status(  500 ).send(   pToken.err     )
                               return
            }

        if (pToken.id) {
//     var  User  =  require( '../models/index.js' ).user

       User.findByPk( pToken.id )
           .then( function chkUserSession( pUser ) {
            var aRole       =  pUser.role
            var aUsername   =  pUser.username
            var aMsg        = `${'This session is validated for'.padStart( 4 + 29 )} ${aUsername} with ${aRole} privileges.`    // .(11112.03.1 RAM Was 21 + 29)                              
                               trace( aMsg )
            res.status(  200 ).send(  aMsg )
                               return
                               } )
           .catch( err => {    trace( "Session failed.".padStart( 4 + 15 ) )                                                    // .(11112.03.2 RAM Was 21 + 15)                              
            res.status(  500 ).send( { message: "Session failed", err: err } );
                               return
                               } );
            } // eif pToken.id
     } // eof session( req, res ) { ... }
//   ------------------------------------------------------------------------------------------

//    Test Controller
//    -----------------------------------------------------------------------------------------

, test : function( req, res ) { trace( '' )                                                                     // .(10917.09.2 Beg RAM Create test controller)

            res.status(  200 ).send(  `Test response from: '${ __filename.replace( /[\/\\]/g, '/' ).replace( /.+\/server/, './server' ) }'.` ); 
                               return 
            } // eof test                                                                                       // .(10917.09.2 End)                                                                         
//          ------------------------------------------------------------------

//    Action Controller
//    -----------------------------------------------------------------------------------------

, action : function action( req, res ) { trace( ` ${req.params.id}` )                                           // .(10314.08.9 RAM Add Sample Action Controller for React-Admin)

        var id         =   req.params.id;

            pModel.findByPk( id )
     .then( pData => {
                          res.send( pData ); } )
    .catch( pErr  => {
                          res.status( 500 ).send( { message: `Error retrieving id: ${id}` } ); } );
            } // eof action
//          ------------------------------------------------------------------

   } // eoo pControllers
// --------------------------------------------------------------------------------------------------

   function verify( aToken, onVerify ) {

//      var jwt     =  require( 'jsonwebtoken' )                                        //#.(11112.02.1)
//      var aSecret = 'bezkoder-secret-key'                                             //#.(11112.02.2)
      try {
        var pToken  =  jwt.verify( aToken, aJWTkey )                                    // .(11112.02.3 RAM Was aSecret).(10317.01.2 See above)
   } catch( pErr ) {
        var pToken  = { message: 'BAD Token', err: pErr }
            }
    return pToken

//          ---------------------------------------------------------

//          jwt.verify( aToken, aSecret, onVerify )     // asyncronously

   function onVerify( pErr, pDecodedToken ) {
            console.log( pErr ? { msg: 'BAD Token', err: pErr } : pDecodedToken );
            }
//          ---------------------------------------------------------
            }
// --------------------------------------------------------------------------------------------------------

   module.exports =
             {  TableName   :   aTable
             ,  ModelName   :   aModel
             ,  Routes      :   pRoutes
             ,  Controllers :   pControllers
             ,  Options     :   pConfig                                                 // .(10301.03.3)
                }

            trace( 'module.exports', __filename )                                       // .(11113.03.5)    

// --------------------------------------------------------------------------------------------------------

     nDoTests = 1

 if (doTest( 1, __filename )) {

     var  { getControllers } =  require( `${FORMRs_4}/controller.fns.njs`  ).fns        // .(10327.04.9 RAM Moved)
     var  { getAppRoutes   } =  require( `${FORMRs_4}/route.fns.njs`       ).fns        // .(10327.04.10 RAM Moved)

            pTableRoutes     =  getControllers( module.exports, 'showem' )
               shoRoutes(       getAppRoutes(   pTableRoutes ) )
      }
//    --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------
