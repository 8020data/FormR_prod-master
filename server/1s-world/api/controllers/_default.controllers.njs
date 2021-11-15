//FileName: ./ServerN/_4/FR.app02s/api/controllers/_default.controllers                                          // .(10331.05.1 RAM Won't ever be used, but must be present)
// --------------------------------------------------------------------------------------------------------

//          FormR           =  require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs` )                            //#.(10418.02.1).(10829.03.1)
        var FormR           =  require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )   // .(10829.03.1)
            FormR.init(      __dirname, __filename );       //  FormR.help(); process.exit()                                    

//      --------------------------------------------------------------------------------------------------

//      var aTable          =  '_default'
//      var aModel          =  '_default'
//      var aPrimaryCol     =   pModel.Primary                                                              //#.(10326.06.1 RAM Need this).(10328.01.7 RAM But not here)        var aFName          =  `${aModel}.controllers`

//      var pConfig         ={ ControllersFilename: __filename }                                            // .(10301.03.1 RAM Let's try saving the file name)
//          pConfig.Cmd     = 'replace default controllers'                                                 //#.(10301.03.2 RAM Replace the default Controller Routes).(10918.02.7)
//          pConfig.Cmd     = `replace default controllers, then use ${aModel} controllers`                 // .(10918.02.7 RAM if not set here, see .env, otherwise it defaults to 'use')

//      --------------------------------------------------------------------------------------------------

        var pRoutes  =  //  {  aRoute                            : [ aRoles,    aController ] = mControllerRoles }
               { 'Method        Route (Order is important!)    ' : [ 'Roles ',  'Controller          ' ]    // .(11109.01.1 RAM Add 1st row to all commas on each subsequent row) 
//                -----------  --------------------------------       -------    --------------------
               , 'http.post    /api/${aTable}/                 ' : [ 'A O - -', 'createOne           ' ]    // Create a new table record               
               , 'http.get     /api/${aTable}/                 ' : [ 'A O U E', 'findAll             ' ]    // Retrieve all table records
               , 'http.get     /api/${aTable}/model/           ' : [ 'A - - -', 'getModel            ' ]    // Retrieve schema model       // .(10905.08.1 RAM).(10918.04.1 RAM Order is important)
               , 'http.get     /api/${aTable}/test/            ' : [ '      I', 'test                ' ]    // Display controller filename // .(10917.09.7 RAM Let's test this controller).(10918.04.2)
               , 'http.get     /api/${aTable}/findMany/:ids    ' : [ 'A O U -', 'findMany            ' ]    // Retrieve many table records with filter
//             , 'http.put     /api/${aTable}/updateMany/:ids  ' : [ 'A O - -', 'updateMany          ' ]    // Update many table records with ids
//             , 'http.delete  /api/${aTable}/deleteMany/:ids  ' : [ 'A O - -', 'deleteMany          ' ]    // Delete all table records with id = ids
//             , 'http.delete  /api/${aTable}/deleteAll/       ' : [ 'A - - -', 'deleteAll           ' ]    // Retrieve all published table records
               , 'http.get     /api/${aTable}/:id              ' : [ 'A O U -', 'findOne             ' ]    // Retrieve one table record with id  // .(10918.03.1 RAM Should these be 'getAll', 'getOne' and 'getMany'?)
               , 'http.put     /api/${aTable}/:id              ' : [ 'A O U -', 'updateOne           ' ]    // Update a table record with id
               , 'http.delete  /api/${aTable}/:id              ' : [ 'A O U -', 'deleteOne           ' ]    // Delete all table records
                  }
            delete pRoutes[ 'Method        Route (Order is important!)    ' ]                               // .(11109.01.2 RAM Delete the 1st row) 

// ---------------------------------------------------------------------------------------------------------

        var pControllers    =  function( aModel, aDBSN ) {                                                  // .(10328.01.8 RAM Major change. Was: pControllers =)

        var pDB             =  require( '../models/index.js' )                                              // .(10328.01.4 Beg RAM Needed now) 
        var aTable          =  aModel                                                                       // .(11019.01.5 RAM Need this below)
        var pModel          =  pDB[ aModel ]                                                                // .(10328.02.6 RAM Each model is defined in pDB).(10328.01.5).(10414.02.8)
        var aFName          = `${aModel}.controllers`
        var aPrimaryCol     = (pModel && pModel.Primary) || 'id'                                            // .(10328.01.7 End).(10328.03.2 RAM In case aModel is undefined).(10418.07.1 RAM Added Default)
        var aColToSearch    =  pModel && pModel.ToSearch || ''                                              // .(10418.03.1 RAM Different than PrimaryID Column)

//      var Op              =  require( '../models/index.js' ).Sequelize.Op;                                //#.(10228.03.3 RAM Was: db.Sequelize.Op).(10310.01.4)
        var Op              =  require( 'sequelize' ).Op;                                                   // .(10103.03.3).(10314.08.4).(10328.01.6) 

//          ------------------------------------------------------------------------------------------

        var pControllers_   = {                                                                             // .(10328.01.9).(10328.04.1) 
            
//          controller1     : { }                                                                           //#.(10328.02.3 RAM Added Table and Model. Cute).(10917.06.1)
           _defaultController : { Table: '_default', Model: aModel }                                        // .(10917.06.1 RAM Identify yourself)

//          ----------------------------------------------------------------------------------

//    GetModel Controller
//    -----------------------------------------------------------------------------------------

          , getModel        :  function getModel( req, res ) { trace( `${aModel}.model` )                   // .(10905.08.2 RAM Add getModel to _default.controllers.njs file)

//      var aModel_JSON     =  require( 'fs' ).readFileSync( `${APP_HOME}/api/models/${aModel}.model.json`, 'ASCII' ) //#.(10414.04.2 RAM Use frrole to be conistent. Or it could be ${aModel} as it was).(10903.01.1)
        var aModel_JSON     =  JSON.stringify( pModel.RSchema )                                             // .(10903.01.1 RAM Get a Live version)
        if (aModel_JSON) {                                                                                  // .(10918.05.1) 
                               res.json( JSON.parse( aModel_JSON ) )                                        // .(10414.04.4 RAM Gotcha: var aModel = `{aModel} is undefined).(10903.01.2)
        } else {                                                                                            // .(10918.05.2 Beg) 
//                             sndError( pErr, `Error occurred while getting model for table ${aModel}.`, res ) 
                               res.send( `There is no pModel.RSchema defined for this model, '${aModel}''`) // .(10414.04.4 RAM Gotcha: var aModel = `{aModel} is undefined).(10903.01.2)
            }                                                                                               // .(10918.05.2 End) 
            } // eof `${aFName}.getModel`
//          ----------------------------------------------------------------------------------

//    CreateOne (ie GET) Controller
//    -----------------------------------------------------------------------------------------

          , createOne       :  function createOne( req, res ) { trace( `${aModel}.createOne ${req.body[ aColToSearch ]}` )  // .(10315.12.1 Beg RAM Added)

              if (!req.body[   aColToSearch ] ) {                                                           // Validate request .(10418.03.2 RAM Was: aPrimaryCol)
                                             sndError( '',   `Search column ${aColToSearch} can not be empty for table ${aModel}.!`, res )  // .(11109.03.1 RAM Was: aCol2Search)
                   return;
                   }

//           const mData    =  Object.keys( req.body ).map( aCol => {                                       // .(10928.04.1 RAM Create record from request using .map)
//                 return                   req.body[ aCol ]
//                 } )
                    
               var pReqBody = { }                                                                           // .(11018.01.1 RAM Changed name of var: pData to pReqBody)
                               Object.keys( req.body ).forEach( aCol => {                                   //#.(10928.04.1 RAM Create record from request usin .forEach)
                   pReqBody[ aCol ]       = req.body[ aCol ]                                                // .(11018.01.2)
                   } )

                   pModel.create( pReqBody )                                                                // Create record in database .(11018.01.3)
                         .then(   pResult => {                                                              // .(11018.01.3 RAM Changed name of var: pBody to pResult)
                                             res.send( pResult ); } )
                         .catch(  pErr  => {
                                             sndError( pErr, `Error occurred while creating a record for table ${aModel}.`, res ) } )
            } // eof `${aFName}.createOne`
//          ----------------------------------------------------------------------------------

//    FindOne (ie GET) Controller
//    -----------------------------------------------------------------------------------------

          , findOne         :  function findOne(     req, res ) { trace( `${aModel}.findOne`)               // .(10918.03.1 RAM Was getOne)

               var id       =  req.params.id;                                                               // .(10331.02.1 RAM Express or Sequelize's id from route /:id).(10906.06.1 RAM Does it always exist)
//             var id       =  req.params[ 'id' ];                                                          //#.(10331.02.1 RAM Express or Sequelize's id from route /:id)
//             var id       =  req.params[ aPrimaryCol ];                                                   //#.(10326.06.1 RAM Need this).(10331.02.1).(10906.06.1)
//             var id       =  req.params[ aPrimaryCol.toLowerCase() ];                                     //#.(10906.06.1 RAM Need this).(10331.02.1).(10906.06.1 RAM <html> form vars are always lowercase per React-Admin?)

                   pModel.findByPk( id )
                         .then(   pBody => {           pRow    =  pBody.dataValues                          // .(10906.05.1 RAM Just send the actual values for React-Admin )
                                                       pRow.id =  id                                        // .(10906.05.2 Required by React-Admiin, even though pRow.ID exists)
                                             res.send( pRow ); } )                                          // .(10906.05.3 RAM Was: pData)
                         .catch(  pErr  => {
                                             sndError( pErr, `Error retrieving id = '${id}' for table ${aModel}.`, res ) } )
            } // eof `${aFName}.getOne`
//          ----------------------------------------------------------------------------------

//    FindAll (ie GET) Controller
//    -----------------------------------------------------------------------------------------

          , findAll         :  function findAll(     req, res ) { trace( `${aModel}.findAll`)

              var  pArgs    =  getArgs( req, pModel )                                                                 // .(11019.01.1 RAM Move code to this function)           

//                 pModel.findAndCountAll( { offset: nOffset, limit: nLimit, ...pOptions } )                          //#.(10111.01.2).(11019.01.2)
                   pModel.findAndCountAll(   pArgs   )                                                                // .(10111.01.2).(11019.01.2)

                         .then(  pResult => {                                                                         // .(11018.01.4)

                            var  pBodyRows =  pResult.rows.map( pRow => { var pNewRow = {} //{ ... pRow };            // .(11018.01.5)
                                 pNewRow          =    pRow.dataValues                                                // .(10418.04.1 RAM This seems more like it, except for maybe the ID column )
                                 pNewRow.id       =    pRow.dataValues[ aPrimaryCol ]                                 // .(10418.09.1 Required by React-Admiin)
                                 return pNewRow 

                                 } )   // eol pResult.rows.map( pRow => { ...; return pNewRow } )

                            var  nCnt  =  pResult.count // or pResult.rows.length                                     // .(11019.01.3)
//                          var  nBeg  =  mRange[0] || 0, nEnd =  mRange[1] || pResult.rows.length, nCnt = pResult.count   //#.(10103.01.3 RAM Get range counts).(11018.01.6).(11019.01.4)
                            var  nBeg  =  pArgs.offset,   nEnd =  pArgs.limit || nCnt                                 // .(11019.01.4 RAM Not sure about nEnd vs nCnt)
                                 res.setHeader(   'Access-Control-Expose-Headers', 'Content-Range'     );             // .(10103.05.1 RAM Allow use of 'Content-Range' Header)
                                 res.setHeader(   'Accept-Ranges', `${aTable}`                         );             // .(10103.01.4 RAM Both are require for browser, ie. Chrome)
                                 res.setHeader(   'Content-Range', `${aTable} ${nBeg}-${nEnd}/${nCnt}` );             // .(10103.01.5 RAM Send Header)
//                               res.send(         pBody.rows     )                                                   // .(10111.01.3 RAM Added data.rows)
//                               res.send( { data: pResult.rows } )                                                   // .(10331.01.1 RAM Will this work?)
                                 res.send(         pBodyRows      )                                                   // .(10111.01.3 RAM Used pBodyRows)

                                 } )   // eof .then ( pResult => { ...; send( pBodyRows ) } )

                         .catch( pError => {
//                               res.status( 500) .send( { message: pError.message || `Some error occurred while retrieving all records for table ${aModel}.` } );  
                            var  pMsg =  { message: ` ** Error retrieving all records for table ${aModel}.`, error: fmtObj(pError).replace( /[\n]/g, '\n  ---' ) }
                                 console.log( fmtObj( pMsg ) ); // res.status( 500 ).send( pMsg );                    //#.(10418.06.1 RAM I didn't get the message).(10917.05.1)
                                 sndError( pMsg.message );                                                            // .(10917.05.1 RAM)

                               } );    // eof .catch( pError => { ...; sendError( pMsg.message ) } ) 

            } // eof `${aFName}.findAll`
//          ----------------------------------------------------------------------------------

//    FindMany (ie GET) Controller
//    -----------------------------------------------------------------------------------------

          , findMany        :  function findMany(    req, res ) { trace( `${aModel}.findMany`)

              pControllers_.findAll( req, res )                                                                       // .(11103.02.1 RAM Was: pController.findAll)

//            const aFilter  =  req.query.filter;
//            const mFilter  =  aFilter ? aFilter.split( /=/ ) : null; aField = mFilter ? mFilter[0] : null
//              var aClause  =  aField  ? { aField: { [ Op.like ]: `%${ mFilter[1] }%` } } : null;
//                  pModel.findAll( { where: aClause } )
//                        .then(   pBody => {
//                                            res.send( pBody ); } )
//                        .catch(  pErr  => {
//                                           sndError( pErr, ` ** Error retrieving filter = '${aFilter}' for table ${aModel}.`, res ) } );
            } // eof `${aFName}.findMany`
//          ----------------------------------------------------------------------------------

//    UpdateOne (ie PUT) Controller
//    -----------------------------------------------------------------------------------------

          , updateOne       :  function updateOne(   req, res ) { trace( `${aModel}.updateOne`)
/*
//           const id       =  req.params[ 'id' ];
//           const pBody    =  req.body
//           const pWhere   =  { }; pWhere[ aPrimaryCol ] = id                                                        // .(10418.08.1 RAM Will this work?)
//
//                 pModel.update( pBody, { where: pWhere } )                                                          // .(10418.08.2 RAM Instead of this: { id: id } )
//                       .then(  nNum  => { if (nNum == 1) {
//                                          res.send( { message: `Table ${aModel} was updated successfully.` } );
//                                      } else {
//                                          sndError( "",    `Cannot update record with ${aPrimaryCol}=${id} for table ${aModel}.`, res ) } } )
//
//
//                       .catch( pErr  => {
//                                          sndError( pErr, `Error updating record with ${aPrimaryCol}=${id} for table ${aModel}.`, res ) } );
*/
           var id           =  req.params.id;                                                                       // .(10331.02.1 RAM Express or Sequelize's id from route /:id).(10906.06.1 RAM Does it always exist)
//         var id           =  req.params[ aPrimaryCol.toLowerCase() ];                                             // .(10906.06.1 RAM <html> form vars are always lowercase per React-Admin?)
           if (req.body.id) {  delete req.body.id }                                                                 // .(10315.13.1 RAM id can't be part of body)

           var pBody        =  req.body
           var pWhere       = { }; pWhere[ aPrimaryCol ] = id                                                       // .(10418.08.1 RAM Will this work using Sequelize's PrimaryCol )
//         var pWhere       = { }; pWhere[ id ] = id                                                                //#.(11109.05.1 RAM Will this work?? )

           if (pBody[ aPrimaryCol ]) { delete pBody[ aPrimaryCol ] }                                                // .(10315.13.1 RAM aPrimaryCol can't be part of body)

//             pModel.update( req.body,    { where: { id: id } } )
               pModel.update(  pBody,    { where: pWhere } )                                                        // .(10418.08.2 RAM Instead of this: { id: id } )
                     .then(    ( )   =>  { return pModel.findByPk( id ) } )
                     .then(    pData =>  {                                                                          // .(10906.05.4 RAM pData is pRow returned by pModel.findByPk, not pData returned by Sequelize) 
                           if (pData)    { res.send( pData.toJSON() );  }
                             else {        sndError( '',   `Cannot update record with ${aPrimaryCol}=${id} for table ${aModel}.` ); } } )
                     .catch(   pErr  =>  {
                                           sndError( pErr, `Error updating record with ${aPrimaryCol}=${id} for table ${aModel}.`, res ) } );
            } // eof `${aFName}.updateOne`
//          ----------------------------------------------------------------------------------

//    UpdateOne2 (ie PUT) Controller
//    -----------------------------------------------------------------------------------------

          , updateOne2      :  function updateOne( req, res ) { trace( ` ${req.params.id}` )                    // .(10314.08.6 RAM Add UpdateOne Controller for React-Admin)

        var id             =   req.params.id;
        if (req.body.id) {     delete req.body.id }                                                             // .(10315.13.1 RAM id can't be part of body)

            pModel.update(     req.body, { where: { id: id } } )
     .then( ( )   => {         return  pModel.findByPk( id )      } )
     .then( pData => {
                               res.send( pData.toJSON() );   } )                                                // .(10315.14.1 RAM Added .toJSON())
    .catch( pErr  => {
                               res.status( 500 ).send( { message: `Error updating id: ${id}.\n ${pErr}` } ); } );
            } // eof updateOne
//          ------------------------------------------------------------------

//    Delete Controller
//    -----------------------------------------------------------------------------------------

          , deleteOne       :  function deleteOne(    req, res ) { trace( `${aModel}.deleteOne`)

               var id       =  req.params.id;
               var pWhere   =   {  }; pWhere[ aPrimaryCol ] = id                                                      // .(10418.08.3 RAM Will this work?)

                   pModel.destroy( {  where:  pWhere } )                                                              // .(10418.08.4 RAM Instead of this: { id: id } )

                         .then(   nNum  => { if (nNum == 1) {
                                             res.send( { message: `Record ${id} was deleted successfully from table ${aModel}!`,  id: id } );  // .(11109.06.1 RAM Added id).(11113.10.1 RAM Added it to message)
                                         } else {
                                             res.send( { message: `Cannot delete record with id=${id} for table ${aModel}.`       } ); } } )
                         .catch(  pErr  => {
                                            sndError( pErr, `Error deleting record with id=${id} for table ${aModel}.`           , res ) } );  // .(10828.03.1)
            } // eof `${aFName}.deleteOne`
//          ----------------------------------------------------------------------------------
/*
//    DeleteAll Controller
//    -----------------------------------------------------------------------------------------

          , deleteMany      :  function deleteMany(   req, res ) { trace( `${aModel}.deleteMany`)

                controller( req, res, 'deleteMany(' + req.params.ids + ')' )

            } // eof `${aFName}.deleteMany` 
//          ----------------------------------------------------------------------------------
*/
//    DeleteAll Controller
//    -----------------------------------------------------------------------------------------

          , deleteAll       :  function deleteAll(    req, res ) { trace( `${aModel}.deleteAll`)

                                             res.send( { message: `Alll records for table ${aModel} would be deleted successfully!` });
                                         process.exit()

                   pModel.destroy( { where: { }, truncate: false } )
                         .then(   nNum  => {
                                             res.send( { message: `${nums} records for table ${aModel} were deleted successfully!` } ); } )
                         .catch(  pErr  => {
                               res.status( 500 ).send( { message: err.message || `Some error occurred while removing all records for table ${aModel}.`  } );
                               } );

            } // eof `${aFName}.deleteAll`
//          ----------------------------------------------------------------------------------

//    Test Controller
//    -----------------------------------------------------------------------------------------

          , test            : function( req, res ) { trace( '' )                                            // .(10917.09.8 Beg RAM Create test controller)

                               res.status(  200 ).send(  `Test response from: '${ __filename.replace( /[\/\\]/g, '/' ).replace( /.+\/server/, './server' ) }'.` ); 
                               return 

            } // eof test                                                                                   // .(10917.09.8 End)                                                                         
//          ------------------------------------------------------------------

//    Action Controller
//    -----------------------------------------------------------------------------------------

          , action           : function action( req, res ) { trace( ` ${req.params.id}` )                   // .(10314.08.9 RAM Add Sample Action Controller for React-Admin)

        var id         =   req.params.id;
            pModel.findByPk( id )
     .then( pData => {
                          res.send( pData ); } )
    .catch( pErr  => {
                          res.status( 500 ).send( { message: `Error retrieving id: ${id}` } ); } );
            } // eof action
//          ------------------------------------------------------------------

          } // eoo pControllers_                                                                            // .(10328.04.2 Beg)
//        --------------------------------------------------------------------------------------------

            var renControllerFns =  require( `${FORMRs_4}/controller.fns.njs` ).fns.renControllerFns        // .(10328.04.2 RAM Will fail if run standalone)                        

                pControllers_    =  renControllerFns(  aDefault, pControllers_ )                            // .(10328.04.2 RAM Need to rename _default controllers now, because when assigned to routes, it uses these function names, not the renamed ones in getControllerRoutes)
         return pControllers_                                                                               // .(10328.04.2 End)

//          ------------------------------------------------------------------

  function  getArgs( req, pModel ) {                                                                                  // .(11019.01.3 Beg RAM Added)            

               var pCondition   = { }
             const aSearchVal   =  req.query[ aColToSearch || null ];                                                 // .(10109.03.4).(10418.03.4 RAM Was aPrimaryCol and aPrimaryVal)
               if (aSearchVal) {                                                                                      // .(10418.03.5)
                   pCondition[ aColToSearch ]  = { [Op.like]: `%${aSearchVal}%` }                                     // .(10418.03.6)
                   }
/*             var pOptions   = { where: pCondition, order: [] }                                                      // .(10119.01.2 RAM Was: [ mSort ])

                   pModel.findAll( pOptions )
                         .then(   pBody => {
                                             res.send( pBody ); } )
                         .catch(  pErr  => {
                               res.status( 500 ).send( { message: ` ** Error retrieving all records for table ${aModel}.` } );
                               } );
*/
//            var aTable    =    req.originalUrl.replace( /\?.+$/, '').replace( /\/api\//, '')                        // .(10107.01.1 Beg RAM Ass Sort, range and filter)
//            var aTable    =    aModel                                                                               // .(10330.03.1 RAM Use the React-Admin table name. First letter is capitalized)

              var aFilter   =    cleanURI(req.query.filter || '')                                                     // .(10330.02.1 RAM Not sure why React-Admin is using filter vs. pCondition).(11019.01.3 RAM Needed above).(1120.01.1 RAM Added clearURI)
              if (aFilter.match( /\{.+\}/ )) {                                                                        // .(11019.02.1 Beg RAM Added) 
//                pFilter   =    JSON.parse(aFilter)                   
                  pFilter   =    eval( `pFilter = ${aFilter}` )  
                  pCondition= { }; Object.keys( pFilter ).forEach( aCol => { 
                  pCondition[ aCol ] = { [Op.like]: `${ pFilter[ aCol ] }%` } 
                  } )
                  }                                                                                                   // .(11019.02.1 End)
              var mRange    =  ( req.query.range || '' ).replace( /[\[\]]/g,  '' ).split( ',' )
              
              var mSort     =  ( req.query.sort  || '' ).replace( /[\[\]"]/g, '' ).split( ',' )                       // .(10110.04.1 RAM e.g. '["username","ASC"]')
              var mOrder    =  ( req.query.sort ) ? [ mSort ] : [ ]                                                   // .(10119.01.1)
              if (mOrder.length >= 1) {
//                 mOrder[0][0] = mOrder[0][0].replace( /^id$/i, 'ID' )                                               //#.(10331.03.1 RAM Sort ID field is not capitalized correctly).(10418.07.1)
                   mOrder[0][0] = mOrder[0][0].replace( /^id$/i, aPrimaryCol || 'id' )                                // .(10331.03.1 RAM Sort ID field is not capitalized correctly).(10418.07.1 RAM Let's try this)
//                 mOrder[0][0] = mOrder[0][0].substr(0,1).toUpperCase() + mOrder[0][0].substr(1)                     // .(10331.03.1 RAM Sort field is not capitalized correctly)
                   }
              
              var pOptions  =  { where: pCondition, order: mOrder }                                                   // .(10119.01.2 RAM Was: [ mSort ])
              var nOffset   =  ( mRange[0] ||  0 ) * 1                                                                // .(10111.01.1 RAM Support Pagination)
              var nLimit    =  ( mRange[1] || 99 ) * 1; nLimit = (nLimit - nOffset) + 1

           return { offset: nOffset, limit: nLimit, ...pOptions }                                           // .(11019.01.4)
            }                                                                                               // .(11019.01.3 End) 
//          ------------------------------------------------------------------

  function  cleanURI( aURI ) {                                                                              // .(11020.01.1 RAM Added)   
       try { 
    return  decodeURI(aURI)    
   } catch (e) {
            aURI = aURI.replace( /%20/g, ' ' ).replace( /%21/g, '!' )
            aURI = aURI.replace( /%22/g, '"' ).replace( /%27/g, "'" )
            aURI = aURI.replace( /%23/g, '#' ).replace( /%23/g, "$" )
            aURI = aURI.replace( /%25/g, '%' ).replace( /%26/g, "&" )
            aURI = aURI.replace( /%2A/g, '*' ).replace( /%2B/g, '+' )
            aURI = aURI.replace( /%2B/g, '+' ).replace( /%2D/g, '+' )
            aURI = aURI.replace( /%2C/g, ',' ).replace( /%2E/g, '.' )
            aURI = aURI.replace( /%28/g, '(' ).replace( /%29/g, ')' )
            aURI = aURI.replace( /%3A/g, ':' ).replace( /%3B/g, ';' )
            aURI = aURI.replace( /%3C/g, '<' ).replace( /%3E/g, '>' )
            aURI = aURI.replace( /%3D/g, '=' ).replace( /%3F/g, '?' )
            aURI = aURI.replace( /%7B/g, '{' ).replace( /%7D/g, '}' )
            aURI = aURI.replace( /%5B/g, '[' ).replace( /%5D/g, ']' )
            aURI = aURI.replace( /%5E/g, '^' ).replace( /%5F/g, '_' )
            aURI = aURI.replace( /%2F/g, '/' ).replace( /%5C/g, '\\' )
    return  aURI
            }
            }                                                                                               // .(11020.01.1 RAM Added)          
//          ------------------------------------------------------------------

  function  sndError( pErr, aMsg, res ) {                                                                   // .(10418.06.2 RAM Beg Turn itinto a function)
       var  pMsg = { message: aMsg };  
        if (pErr)  { if (pErr.stack) {delete pErr.stack }                                                 // .(11109.08.1 RAM Delete pErr.stack)
                   pMsg.error = fmtObj( pErr ).replace( /[\n]/g, '\n  ---' ) }
//          console.log( fmtObj( pMsg ) ); res.status( 500 ).send( pMsg );                                  // .(10418.06.1 RAM I didn't get the message)
            console.log( fmtObj( pMsg ) ); res.status( 200 ).send( pMsg );                                  // .(11109.09.1 RAM Status 500 is a hard error, let's send JSON with error)
            }                                                                                               // .(10418.06.2 End)
//          ------------------------------------------------------------------
        } // eof pControllers                                                                               // .(10328.01.11) 
//      --------------------------------------------------------------------------------------------------

            pConfig         = { ControllersFilename: __filename }                                           // .(10301.03.5 RAM Let's try saving the file name)
            pConfig.Cmd     =   ''                                                                          // .(10301.03.6)

        module.exports      =
         {  Routes          :  pRoutes
         ,  Controllers     :  pControllers                                                                 // .(10328.01.12 RAM It's now a function 
         ,  Options         :  pConfig                                                                      // .(10301.03.3)
            }
//      --------------------------------------------------------------------------------------------------

        trace( 'module.exports', __filename )                                                               // .(11113.03.6)

// =================================================================================================================

