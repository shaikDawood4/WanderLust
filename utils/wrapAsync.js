module.exports = (fn)=>{ // khudse iska ek fn return hota
    return function(req,res,next){
        fn(req,res,next) .catch(next) 
    } // iss fn ka kaam hai to execute the fn function
}

// on using wrapAsync we need not to use try and catch