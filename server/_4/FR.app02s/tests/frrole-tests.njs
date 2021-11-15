
//          FormR    =   require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs` )                            //#.(10418.02.1).(10829.03.1)
       var  FormR    =   require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )   // .(10829.03.1)
            FormR.init(__dirname, __filename );      //    FormR.help(); process.exit()

//     ------------  =   --------------------------------------------------------

       var  aRoute          = '/api/formr/roles'
       var  aHost           = `http://localhost:50253`

       var  aArgs           = '?filter={}&range=[0,9]&sort=["id","ASC"]'

       var  pData1 =
             {  name        : 'Swimmer'
             ,  updatedAt   :  new Date
             ,  createdAt   :  new Date
                }

       var  pData2 =
             {  name        : 'Diver'
             ,  updatedAt   :  new Date
                }

// ----- ----------  =    ---------------------------------------------------------

            doTests() 

     async  function doTests() {

//          bQuiet   =  1
       var  mResults = [], pResult, nID = 666

            pResult  =  await jstFns.sndAPI( 'GET',   `${aHost}${aRoute}`, nID    );        mResults.push( pResult )  // R ead one rec that doesn't exist
            pResult  =  await jstFns.sndAPI( 'GET',   `${aHost}${aRoute}`, aArgs  );        mResults.push( pResult )  // R ead 10 recs
            pResult  =  await jstFns.sndAPI( 'POST',  `${aHost}${aRoute}`, pData1 );        mResults.push( pResult )  // C eate a rec
        if (nID      =  pResult.body && pResult.body.id ) {
            pResult  =  await jstFns.sndAPI( 'PUT',   `${aHost}${aRoute}/${nID}`, pData2 ); mResults.push( pResult )  // U pdate a rec
            pResult  =  await jstFns.sndAPI( 'DELETE',`${aHost}${aRoute}`, nID    );        mResults.push( pResult )  // D elete a red
            }

        if (bQuiet)  {  console.dir( fmtObj( mResults ) ) }
            }
//   -----  --------------  =  --------------------------------------------------------
