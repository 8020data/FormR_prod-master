
       var  FormR          =   require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )    
            FormR.init(      __dirname, __filename );        
//          FormR.help( 'all' ); // process.exit()                        

                               require( './fr-testFns.njs' )

//   -----  --------------  =  --------------------------------------------------------

            aHost           = `http://localhost:50253`
            aRoute          =                       '/api/formr/users'
            aColToSearch    = 'username'

//   -----  --------------  =  --------------------------------------------------------

       var  aUserName       = 'suzee'

       var  pData1          =
             {  username    :  aUserName
             ,  email       : 'suzee.parker94@gmail.com'
             ,  role        : 'User'
             ,  password    : '1234'
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
//   -----  --------------  =  --------------------------------------------------------

            doTests() 

     async  function doTests() {

            bQuiet   =  true
       var  mResults =  [], pResult
            
            pResult  =  await doTest_FindAll(  );                    mResults.push( pResult )
            pResult  =  await doTest_FindOne(  666 );                mResults.push( pResult )
            pResult  =  await doTest_Delete(   aUserName );          mResults.push( pResult )
            pResult  =  await doTest_Find(     aUserName );          mResults.push( pResult )
            pResult  =  await doTest_Create(   aUserName, pData1 );  mResults.push( pResult )   
            pResult  =  await doTest_Find(     aUserName );          mResults.push( pResult )
            pResult  =  await doTest_Update(   aUserName, pData2 );  mResults.push( pResult )
//          pResult  =  await doTest_Delete(   aUserName );          mResults.push( pResult )
//          pResult  =  await doTest_Find(     aUserName );          mResults.push( pResult )
            pResult  =  await doTest_GetModel( aUserName );          mResults.push( pResult )

//          console.dir( fmtObj( mResults ) ) 
            }
//   -----  --------------  =  --------------------------------------------------------

