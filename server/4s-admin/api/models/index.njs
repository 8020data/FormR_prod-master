
//    FormR       =  require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs` )                            //#.(10418.02.1).(10829.03.1)
  var FormR       =  require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )   // .(10829.03.1)
      FormR.init(  __dirname, __filename );       //  FormR.help(); process.exit()

/// -------------------------------------------------------------------------------------------------

  var dbConnect          =  require( `${FORMRs_4}/db.connect3-2.njs` )                                      // .sequelize// .(10325.04.2 RAM Gotta use FORMRs_4).(10326.02.x).(10328.05.1 RAM We love to change names).(10928.03.1 RTAM Changed extension to .njs)

  var pDB                =  dbConnect( 'RAUTH', 'checkDB' );                                                // .(10220.10.1 RAM Switch to db.connect).(10328.0x.x).(10414.02.2).(10928.01.1 RAM Change DB Reference).(10928.02.3)

//    pDB.fruser         =  require( "${FORMRs_4_API}/models/fruser.model.js")(  pDB, 'users'  )            //#.(10220.10.4 RAM Was: (sequelize, Sequelize) ).(10328.06.7).(10414.02.3
      pDB.fruser         =  require(              "../models/fruser.model.js")(  pDB, 'users'  )            // .(10220.10.4 RAM Was: (sequelize, Sequelize) ).(10328.06.8)
      pDB.fruser.DB      =  pDB // or pDBs[ pDB[ pDB.DBSN ] ]                                               // .(10416.01.6)

//    pDB.frrole         =  require( "${FORMRs_4_API}/models/frrole.model.js")(  pDB, 'roles'  )            //#.(10309.03.1 RAM Need this).(10328.06.8).(10414.02.4)
      pDB.frrole         =  require(              "../models/frrole.model.js")(  pDB, 'roles'  )            // .(10309.03.1 RAM Need this).(10328.06.8)
      pDB.frrole.DB      =  pDB // or pDBs[ pDB[ pDB.DBSN ] ]                                               // .(10416.01.5)

// -------------------------------------------------------------------------------------------------

      pDB.ROLES          = [ "viewer", "editor", "admin" ];                                                 // .(10309.03.2 End).(10414.05.1 RAM Reorder them)

//    ----------------------------------------------------------------------------------

      module.exports     =  pDB;

//                          trace(  '\nmodule.exports' )

// -------------------------------------------------------------------------------------------------

