
                                       process.env.FORMR_HOME = __dirname.replace( /[\\\/](serv|clie).+/, '')   // .(10829.01.1 RAM)
//          FormR    =   require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs` )                            //#.(10418.02.1).(10829.03.1)
       var  FormR    =   require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )   // .(10829.03.1)
            FormR.init(__dirname, __filename );       //  FormR.help(); process.exit()                                    

//     ------------  =   --------------------------------------------------------

       var  aHost           = `http://localhost:50254`
       var  aRoute2         = '/api/formr/users'
       var  aToken          = ''
       var  nId             = ''  //  68 

       var  pData =
             {  id          :  99
             ,  username    : 'robin99'
             ,  email       : 'suzee.parker98@gmail.com'
             ,  group       :  null
             ,  password    : '1234'
             ,  active      : 'Yes'
             ,  role        : 'User'
             ,  passworddate:  addDate( 90 )
             ,  updatedAt   :  new Date 
//           ,  createdAt   : '2021-03-15T20:31:02.000Z'
                }

            jstFns.sndAPI(    'PUT', `${aHost}${aRoute2}/${nId}`, pData )

// ----- ----------  =    ---------------------------------------------------------

  function  addDate( n, d )  { return  fmtDate( 6, d, n ).substr( 0, 10 ) }    // .(10314.06.1 RAM Use fmtDate)
