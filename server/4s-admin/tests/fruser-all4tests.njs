
       var  FormR     =   require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )   // .(10829.03.1)
            FormR.init( __dirname, __filename );    //   FormR.help(); process.exit()                                // .(10829.01.3)

//   -----  --------------  =  --------------------------------------------------------

       var  aHost           = `http://localhost:50254`
       var  aRoute          = '/api/formr/users'
       var  aUserName       = 'suzee'

       var  pData1          =
             {  username    :  aUserName
             ,  email       : 'suzee.parker94@gmail.com'
             ,  role        : 'User'
//           ,  createdAt   : '2021-03-15T20:31:02.000Z'
             ,  updatedAt   :  new Date
                }

       var  pData2          =
             {  username    :  aUserName
             ,  email       : 'suzee.parker94@gmail.com'
             ,  group       : 'Dept34'
             ,  password    : '1234'
             ,  active      : 'Yes'
             ,  role        : 'Admin'
             ,  passworddate:  addDate( 90 )
             ,  updatedAt   :  new Date

                }            

         doTests() 

   async function doTests() {

//   await doTest_Find(   aUserName ) 
     await doTest_Create( aUserName, pData1 )       
//   await doTest_Find(   aUserName ) 
//   await doTest_Update( aUserName, pData2 )       
//   await doTest_Delete( aUserName )       
//   await doTest_Find(   aUserName ) 
     }

//   -----  --------------  =  --------------------------------------------------------

     async  function doTest_Find( aUserName ) { // 
    
       var  pResult         =  await jstFns.sndAPI( 'GET', `${aHost}${aRoute}/?username=${aUserName}`)

//      if (pResult.Error)  {  return  }
//      if (pResult.body.id) { 

       var  nID             = (pResult.Error || pResult.body.length == 0) ? 0 : pResult.body[0].id 
        if (nID >= 1)  { 
            console.log(     ` doTest_Find[1]  The username, '${aUserName}', exists with ID: ${nID}.`)
        } else {    
            console.log(     ` doTest_Find[2]  The username, '${aUserName}', does not exist.`)
        }   }
//   -----  --------------  =  --------------------------------------------------------

     async  function doTest_Create( aUserName, pData ) { // 
    
       var  pResult         =  await jstFns.sndAPI( 'GET', `${aHost}${aRoute}/?username=${aUserName}`)

       var  nID             = (pResult.Error || pResult.body.length == 0) ? 0 : pResult.body[0].id 
        if (nID >= 1) {
            console.log(     ` doTest_Create[1]  The username, '${aUserName}', already exists with ID: ${nID}.`)
        } else { 
                               jstFns.sndAPI( 'POST', `${aHost}${aRoute}`, pData )
        }   }
//   -----  --------------  =  --------------------------------------------------------

     async  function doTest_Update( aUserName, pData ) { // 
    
       var  pResult         =  await jstFns.sndAPI( 'GET', `${aHost}${aRoute}/?username=${aUserName}`)

       var  nID             = (pResult.Error || pResult.body.length == 0) ? 0 : pResult.body[0].id 
        if (nID == 0) {
            console.log(     ` doTest_Update[1]  The username, '${aUserName}', does not exist.`)
        } else { 
                               jstFns.sndAPI( 'PUT', `${aHost}${aRoute}/${nID}`, pData )
        }   }
//   -----  --------------  =  --------------------------------------------------------

     async  function doTest_Delete() { // 
    
       var  pResult         =  await jstFns.sndAPI( 'GET', `${aHost}${aRoute}/?username=${aUserName}`)

       var  nID             = (pResult.Error || pResult.body.length == 0) ? 0 : pResult.body[0].id 
        if (nID == 0) {
            console.log(     ` doTest_Delete[1]  The username, '${aUserName}', does not exist.`)
        } else { 
                                     jstFns.sndAPI( 'DELETE', `${aHost}${aRoute}/${nID}`)
        }   }
//   -----  --------------  =   --------------------------------------------------------

  function  addDate( n, d )  { return  fmtDate( 6, d, n ).substr( 0, 10 ) }    // .(10314.06.1 RAM Use fmtDate)
