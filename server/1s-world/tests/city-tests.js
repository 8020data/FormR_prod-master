
       var  FormR        =   require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )    
            FormR.init(    __dirname, __filename );        
//          FormR.help( 'all' ); // process.exit()                        

                             require( './fr-testFns.njs' )

//   -----  ------------  =  --------------------------------------------------------

            aHost         = 'http://localhost:50251'
            aRoute        =                       '/api/world/cities'

            aModel        = 'City' 
//          aTable        = 'Cities'
//          aColToSearch  = 'Name'
            aPrimaryKey   = 'ID'

//   -----  ------------  =  --------------------------------------------------------

       var  aCityName     = "Leesburg"
 
       var  pData1        ={ Name          :  aCityName          
                          ,  CountryCode   : 'USA'
                          ,  District      : 'Virginia'
                             }
       var  pData2        ={ Name          :  aCityName  
                          ,  Population    :  63226
                             }
 
//     var  aSearch       = 'Name=Pro'     
       var  aSearch       = 'Name=Atlan'   

       var  aRange        = 'range=[1,8]&sort=["Name","ASC"]'
       var  aRange10to19  = 'range=[10,24]&sort=["ID","ASC"]'

//     var  aFilter1      = `filter={ Name: "Pro" }`                           // Case is important
       var  aFilter1      = `filter={ Name: "San", CountryCode: "USA" }`       // Quotes are required

       var  aFilter2      = `filter={ Name: "${ pData2.Name }" }` 

//   -----  ------------  =  --------------------------------------------------------

//          doTests() 

 ; ( async  function doTests() {

            bQuiet   =  true
       var  mResults =  [], pResult
            
            pResult  =  await doTest_FindOne(  1 );                  mResults.push( pResult )
            pResult  =  await doTest_FindAll(  aSearch );            mResults.push( pResult )
            pResult  =  await doTest_FindAll(  aRange, aFilter1 );   mResults.push( pResult )
            pResult  =  await doTest_FindAll(  aRange10to19 );       mResults.push( pResult )
            pResult  =  await doTest_Find(     aCityName  );         mResults.push( pResult )
            pResult  =  await doTest_Create(   aCityName, pData1 );  mResults.push( pResult ) 
            pResult  =  await doTest_Update(   aCityName, pData2 );  mResults.push( pResult )
            pResult  =  await doTest_FindAll(  aFilter2   );         mResults.push( pResult )
            pResult  =  await doTest_Delete(   aCityName  );         mResults.push( pResult )
            pResult  =  await doTest_Find(     aCityName  );         mResults.push( pResult )
            pResult  =  await doTest_GetModel( );                    mResults.push( pResult )

            console.log( fmtResults( mResults ) )

            }  // eof doTests 
      ) ( ) // eof async function call

//   -----  ------------  =  --------------------------------------------------------
