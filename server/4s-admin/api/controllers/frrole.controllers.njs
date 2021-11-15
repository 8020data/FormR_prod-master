//FileName: ./ServerN/appNs/api/controllers/frrole.controllers 
// --------------------------------------------------------------------------------------------------------

//          FormR           =  require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs` )                            //#.(10418.02.1).(10829.03.1)
        var FormR           =  require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )   // .(10829.03.1)
            FormR.init(      __dirname, __filename );       //  FormR.help(); process.exit()                                    

//      --------------------------------------------------------------------------------------------------

        var aTable          =  'formr/roles'
//      var aTable          =  'roles'
        var aModel          =  'frrole'

//      --------------------------------------------------------------------------------------------------

        var aFName          =  `${aModel}.controllers`
 
        var pConfig         ={ ControllersFilename: __filename }                                            // .(10301.03.1 RAM Let's try saving the file name)
//          pConfig.Cmd     = 'replace default controllers'                                                 //#.(10301.03.2 RAM Replace the default Controller Routes).(10918.02.7)
//          pConfig.Cmd     = `replace default controllers, then use ${aModel} controllers`                 // .(10918.02.7 RAM if not set here, see .env, otherwise it defaults to 'use')

//      var pModel          =  require( `${APP_HOME}/api/models/index.js` )[ aModel ]                       //#.(10109.03.1 RAM Make Generic).(10314.08.3).(10318.02.5).(10414.02.7)
//      var pModel          =  require( `${FORMRs_4_API}/models/index.js` )[ aModel ]                       //#.(10414.02.8)
        var pModel          =  require(              '../models/index.js' )[ aModel ]                       // .(10414.02.8)

        var aPrimaryCol     =  pModel && pModel.Primary                                                     // .(10328.01.7 End).(10328.03.2 RAM In case aModel is undefined).(11109.02.1 Added)
        var aColToSearch    =  pModel && pModel.ToSearch                                                    // .(10418.03.1 RAM Different than PrimaryID Column).(11109.02.1 Added)

 //     var Op              =  require( '../models/index.js' ).Sequelize.Op;                                //#.(10228.03.3 RAM Was: db.Sequelize.Op).(10310.01.4)
        var Op              =  require( 'sequelize' ).Op;                                                   // .(10103.03.3).(10314.08.4)

//      --------------------------------------------------------------------------------------------------

        var pRoutes  =  //   { aRoute                            : [ aRoles,    aController ] = mControllerRoles }
               { 'Method        Route (Order is important!)    ' : [ 'Roles ',  'Controller          ' ]    // .(11109.01.1 RAM Add 1st row to all commas on each subsequent row) 
//                -----------  --------------------------------       -------    --------------------
//             , 'http.get     /api/${aTable}/                 ' : [ '      I', 'findAll             ' ]    // .(10314.08.1 RAM Add Controllera for React-Admin)
//             , 'http.get     /api/${aTable}/model/           ' : [ 'A - - -', 'getModel            ' ]    //   Retrieve schema model    .(10905.08.5 RAM Use default model controller)
//             , 'http.get     /api/${aTable}/test/            ' : [ '      E', 'test                ' ]    // .(10917.09.1 RAM Let's test this controller)
//             , 'http.get     /api/${aTable}/:id              ' : [ '      I', 'findOne             ' ]    // .(10314.08.3)
//             , 'http.post    /api/${aTable}/                 ' : [ '      I', 'createOne           ' ]    // .(10314.08.3)
//             , 'http.put     /api/${aTable}/:id              ' : [ '      I', 'updateOne           ' ]    // .(10314.08.5)
//             , 'http.delete  /api/${aTable}/:id              ' : [ '      I', 'deleteOne           ' ]    // .(10314.08.7)
                  }
            delete pRoutes[ 'Method        Route                          ' ]                               // .(11109.01.2 RAM Delete the 1st row) 

// ---------------------------------------------------------------------------------------------------------

        var pControllers    = { 

//          controller1     : { }                                                                           //#.(10328.02.3 RAM Added Table and Model. Cute).(10917.06.1)
            _frroleController : { Table: aDefault, Model: aModel }                                          // .(10917.06.1 RAM Identify yourself)

//          ------------------------------------------------------------------

//      Action Controller
//      -----------------------------------------------------------------------------------------

          , action          :  function action( req, res ) { trace( ` ${req.params.id}` )                   // .(10314.08.9 RAM Add Sample Action Controller for React-Admin)

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

        trace( 'module.exports', __filename )                            // .(11113.03.7)    

// =================================================================================================================
