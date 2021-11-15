//FileName: ./Server/appNs/api/controllers/fruser.controllers
// --------------------------------------------------------------------------------------------------------

//          FormR           =  require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs` )                            //#.(10418.02.1).(10829.03.1)
        var FormR           =  require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )   // .(10829.03.1)
            FormR.init(      __dirname, __filename );       //  FormR.help(); process.exit()

//      --------------------------------------------------------------------------------------------------

        var aTable          =  'formr/users'                                                                // .(10318.01.1 RAM Maybe Want this)
//      var aTable          =  'users'
        var aModel          =  'fruser'                                                                     // .(10301.08.1 RAM If this is wrong everything breaks)

        var aFName          =  `${aModel}.controllers`

        var pConfig         ={ ControllersFilename: __filename }                                            // .(10301.03.1 RAM Let's try saving the file name)
//          pConfig.Cmd     = 'replace default controllers'                                                 //#.(10301.03.2 RAM Replace the default Controller Routes).(10918.02.7)
//          pConfig.Cmd     = `replace default controllers, then use ${aModel} controllers`                 // .(10918.02.7 RAM if not set here, see .env, otherwise it defaults to 'use')

//      var pModel          =  require( `${APP_HOME}/api/models/index.js` )[ aModel ]                       //#.(10109.03.1 RAM Make Generic).(10314.08.3).(10318.02.5).(10414.02.7)
//      var pModel          =  require( `${FORMRs_4_API}/models/index.js` )[ aModel ]                       //#.(10414.02.8)
        var pModel          =  require(              `../models/index.js` )[ aModel ]                       // .(10414.02.8)

        var aPrimaryCol     =  pModel && pModel.Primary                                                     // .(10328.01.7 End).(10328.03.2 RAM In case aModel is undefined).(11109.02.3)
        var aColToSearch    =  pModel && pModel.ToSearch                                                    // .(10418.03.1 RAM Different than PrimaryID Column).(11109.02.4)

//      var Op              =  require( '../models/index.js' ).Sequelize.Op;                                //#.(10228.03.3 RAM Was: db.Sequelize.Op).(10310.01.4)
        var Op              =  require( 'sequelize' ).Op;                                                   // .(10103.03.3).(10314.08.4)

//      --------------------------------------------------------------------------------------------------

        var pRoutes  =  //  {  aRoute                            : [ aRoles,    aController ] = mControllerRoles }
               { 'Method        Route (Order is important!)    ' : [ 'Roles ',  'Controller          ' ]    // .(11109.01.1 RAM Add 1st row to all commas on each subsequent row)
//                -----------  --------------------------------       -------    --------------------
//             , 'http.get     /api/${aTable}/                 ' : [ '      I', 'findAll             ' ]    // .(10314.08.1 RAM Add Controllera for React-Admin)
//             , 'http.get     /api/${aTable}/model/           ' : [ 'A - - -', 'getModel            ' ]    //   Retrieve schema model    .(10905.08.5 RAM Use default model controller)
//             , 'http.get     /api/${aTable}/test/            ' : [ '      E', 'test                ' ]    // .(10917.09.1 RAM Let's test this controller)
//             , 'http.get     /api/${aTable}/:id              ' : [ '      I', 'findOne             ' ]    // .(10314.08.3)
               , 'http.post    /api/${aTable}/                 ' : [ '      I', 'createOne           ' ]    // .(10314.08.3)
//             , 'http.put     /api/${aTable}/:id              ' : [ '      I', 'updateOne           ' ]    // .(10314.08.5)
//             , 'http.delete  /api/${aTable}/:id              ' : [ '      I', 'deleteOne           ' ]    // .(10314.08.7)
                  }
            delete pRoutes[ 'Method        Route (Order is important!)    ' ]                               // .(11109.01.2 RAM Delete the 1st row)

// ---------------------------------------------------------------------------------------------------------

        var pControllers    = {

//          controller1       : { }                                                                         //#.(10917.06.3)
            _fruserController : { Table: aTable, Model: aModel }                                            // .(10917.06.3 RAM Identify yourself).(11114.06.1 RAM Was: aDefault)

//      CreateOne (ie POST) Controller
//      -----------------------------------------------------------------------------------------

      , createOne           :  function createOne( req, res ) { trace( `\nCreate user: ${req.body[ aColToSearch ]}` )     // .(10315.12.1 Beg RAM Added)

       if (!req.body[ aColToSearch ] ) {                                                                                    // Validate request .(10418.03.2 RAM Was: aPrimaryCol)
                               res.status( 200 ).send( { message: "The Search column, ${aColToSearch}, is required!" } );
                   return;
                   }
//          ---------------------------------------------------------------------------------

       if (!req.body.password) {                                                                                            // .(11114.05.1 Beg RAM Password is required)
                               res.status( 200 ).send( { message: "A Password is required!" } );
                   return;
       } else {                                                                                                         
        var bcrypt          =  require( 'bcryptjs' );                                                                       // .(11114.05.2 Beg RAM Gotta encrypt password for users)
        var aPassword       =  req.body.password
        var aSalt_inTransit = '$2a$04$qy3HhHlVJT/wUB364EVjmu'                                                               // .(10416.04.1 RAM Need this for bcrypt.hash to match).(11113.01.1 RAM Was: aSalt)
        var aSalt_atRest    =  8                                                                                            // .(11113.01.2 RAM For DB storage)

        if (aPassword.match( /^\$(.){50,60}/ ) == null) {                                                                   // .(11113.01.3 Beg RAM HASH it if not already).(11114.04.1 RAM was: {59}, could be {50} as it means at least)
                                         trace( `    Encrypting Password: '${ aPassword }' (un-encrypted)` )                // .(11114.05.3 RAM More info)
            aPassword       =  bcrypt.hashSync( aPassword, aSalt_inTransit )
//                                       trace( `                     to: '${ aPassword }' (encrypted InTransit)` )         // .(11114.05.4)
        } else {
//                                       trace( `     Receiving Password: '${ aPassword }' (encrypted InTransit)` )         // .(11114.05.5)
            }                                                                                                               // .(11113.01.3 End)
            aPassword       =  bcrypt.hashSync( aPassword, aSalt_atRest ); req.body.password = aPassword                    // .(10416.04.9 RAM But needs to be encrypted again to go into the DB).(11113.01.5 RAM was: 8)
            }                                                                                                               // .(11114.05.1 End)
//          ---------------------------------------------------------------------------------

       var  pBody           =                                                                                               //  Create a user
//           {  id          :  req.body.id
             {  username    :  req.body.username
             ,  email       :  req.body.email
             ,  password    :  req.body.password 
             ,  role        :  req.body.role         ? req.body.role         : "User"
             ,  active      :  req.body.active       ? req.body.active       : "Yes"
             ,  passworddate:  req.body.passworddate ? req.body.passworddate :  fmtDate( 6, 90 )                            // .(10315.14.1)
                };

            pModel.create(     pBody )                                                                                      // .(10109.03.5 RAM Was UserData, then pData)
                  .then(       pData => { pData  =  pData.toJSON( )                                                         // .(10402.01.1 RAM Convert it so that it's easy to view)

                               trace( `     to be stored in DB: '${ pData.password }' (encrypted atRest)`      )            // .(11114.06.2)
                               trace( `    User ${pData.id} registered successfully for role: ${ pData.role }.`)            // .(11114.06.1)
                               res.send(  pData  ); })

                  .catch(      pErr  => {
                               res.status( 200 ).send( { message: pErr.message || "Some error occurred while creating the user." } ); } )

             } // eof createOne
//          ------------------------------------------------------------------

//      Action Controller
//      -----------------------------------------------------------------------------------------

      , action              :  function action( req, res ) { trace( ` ${req.params.id}` )                   // .(10314.08.9 RAM Add Sample Action Controller for React-Admin)

        var id              =  req.params.id;

            pModel.findByPk(   id )
                  .then(       pData => {
                               res.send( pData ); } )
                  .catch(      pErr  => {
                               res.status( 200 ).send( { message: `Error retrieving id: ${id}` } ); } );
            } // eof action
//          ------------------------------------------------------------------

            }  // eoo pControllers
//      --------------------------------------------------------------------------------------------------

        module.exports      =
         {  TableName       :  aTable
         ,  ModelName       :  aModel
         ,  Routes          :  pRoutes
         ,  Controllers     :  pControllers
         ,  Options         :  pConfig                                   // .(10301.03.3)
            }

        trace( 'module.exports', __filename )                            // .(11113.03.8)

// =================================================================================================================

          nDoTests        =   1

      if (doTest( 1, __filename )) {   // Format and possible redefine Controllers and Routes in pTableRoutes

      var { getControllers }  =  require( `${FORMRs_4}/controller.fns.njs`  ).fns                       // .(10318.02.7).(10328.06.12)
      var { setTableRoutes }  =  require( `${FORMRs_4}/route.fns.njs`       ).fns                       // .(10318.02.8).(10328.06.12)

            pTableRoutes      =  getControllers( module.exports, 'showem' )
                                 setTableRoutes( pTableRoutes, aTable, 'ShowEm' )                       // .(10318.04.2 RAM Was: aTable)
            }
//    ---   ------------------------------------------------------------------

      if (doTest( 2, __filename )) {   // Show initial routes and then change roles for it

      var { shoTableRoutes }  =  require( `${FORMRs_4}/route.fns.njs`       ).fns                       // .(10318.02.8).(10328.06.12)
      var { setRouteRoles  }  =  require( `${FORMRs_4}/route.fns.njs`       ).fns                       // .(10318.02.8).(10328.06.12)

            shoTableRoutes( pRoutes, aTable ); DoShowEm = true

//                      Routes   Role     Cmd    Controller / Route Actions
//                      ------  -------  -----  -------------------------------
//          setRouteRoles(  pRoutes, 'Admin', 'chg', 'all'                          )  // chg  Gives   access to only one role  for all  actions
            setRouteRoles(  pRoutes, 'Owner', 'add', 'update*,  find*, delete*'     )  // add  Adds    access     for one role  for many actions
            setRouteRoles(  pRoutes, 'User' , 'add', 'updateOne,       deleteOne'   )  // del  Removes access     for one role  for two  actions
            setRouteRoles(  pRoutes, 'User' , 'del', '                 delete*'     )  // del  Removes access     for one role  for one  action
            setRouteRoles(  pRoutes, 'Admin', 'chg', 'createOne,       deleteAll'   )  // chg  Gives   access to only one role  for two  actions, removes all other roles

            shoTableRoutes( pRoutes, aTable )
            }
// --------------------------------------------------------------------------------------------------------
