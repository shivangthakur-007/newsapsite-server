const errorMiddleware= (err, _req, _res)=>{
    err.statuscode= err.statuscode|| 500,
    err.message= err.message|| 'Something went wrong',
    res.statuscode(err.statuscode).json({
        success: false,
        message: err.message,
        stack: err.stack
    })
}

export default errorMiddleware;