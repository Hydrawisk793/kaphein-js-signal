var kapheinJsTypeTrait = require("kaphein-js-type-trait");
var isString = kapheinJsTypeTrait.isString;
var kapheinJsObjectUtils = require("kaphein-js-object-utils");
var extendClass = kapheinJsObjectUtils.extendClass;

module.exports = (function ()
{
    var SignalTimeoutError = extendClass(
        Error,
        /**
         *  @constructor
         *  @param {string} [message]
         */
        function SignalTimeoutError()
        {
            this.name = "SignalTimeoutError";
            this.message = (isString(arguments[0]) ? arguments[0] : "Timed out waiting for a signal.");

            if(Error.captureStackTrace)
            {
                Error.captureStackTrace(this, SignalTimeoutError);
            }
        },
        {}
    );

    return {
        SignalTimeoutError : SignalTimeoutError
    };
})();
