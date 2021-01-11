var returnTrue = function (req, res, message, arr){

    return res.status(200).json(
            {
                "result": {
                    success: true,
                    message: message
                },
                "data": arr
            }
    );
};

var returnFalse = function (req, res, message, arr){

    return res.status(200).json(
        {
            "result": {
                success: false,
                message: message
            },
            "data": arr
        }
    );
};

var returnInvalid = function (req, res, message, arr){

    return res.status(403).json(
        {
            "result": {
                success: false,
                message: message
            },
            "data": arr
        }
    );
};

var returnNotFound = function (req, res, message, arr){

    return res.status(404).json(
        {
            "result": {
                success: false,
                message: message
            },
            "data": arr
        }
    );
};

var response = {
    returnTrue: returnTrue,
    returnFalse: returnFalse,
    returnInvalid : returnInvalid,
    returnNotFound : returnNotFound
};

module.exports = response;