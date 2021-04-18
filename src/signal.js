var SignalTimeoutError = require("./signal-timeout-error").SignalTimeoutError;

module.exports = (function ()
{
    /**
     *  @constructor
     *  @param {number} [timeoutInMs]
     *  @param {boolean} [timeoutShouldNotThrow]
     */
    function Signal()
    {
        if("undefined" === typeof Promise)
        {
            throw new Error("This environment does not support ECMAScript 6 Promise.");
        }

        var timeoutInMs = arguments[0];
        if(!Number.isSafeInteger(timeoutInMs) || timeoutInMs < 0)
        {
            timeoutInMs = -1;
        }

        var timeoutShouldNotThrow = !!arguments[1];

        this._pending = true;
        this._to = null;
        this._rs = null;
        this._rj = null;
        this._p = new Promise((function (resolve, reject)
        {
            this._rs = (function ()
            {
                if(this._pending)
                {
                    this._pending = false;

                    if(this._to)
                    {
                        clearTimeout(this._to);
                    }

                    resolve(arguments[0]);
                }
            }).bind(this);
            this._rj = (function ()
            {
                if(this._pending)
                {
                    this._pending = false;

                    if(this._to)
                    {
                        clearTimeout(this._to);
                    }

                    reject(arguments[0]);
                }
            }).bind(this);

            if(timeoutInMs >= 0)
            {
                this._to = setTimeout((function ()
                {
                    if(this._pending)
                    {
                        var error = new SignalTimeoutError();

                        if(timeoutShouldNotThrow)
                        {
                            this._rs(error);
                        }
                        else
                        {
                            this._rj(error);
                        }
                    }
                }).bind(this), timeoutInMs);
            }
        }).bind(this));
    }

    Signal.prototype = {
        constructor : Signal,

        emit : function emit()
        {
            if(arguments[1])
            {
                this._rj(arguments[0]);
            }
            else
            {
                this._rs(arguments[0]);
            }
        },

        then : function then(onFulfilled, onRejected)
        {
            return this._p.then(onFulfilled, onRejected);
        },

        "catch" : function (onRejected)
        {
            return this._p.catch(onRejected);
        },

        "finally" : function (onFinally)
        {
            return this._p.finally(onFinally);
        }
    };

    return {
        Signal : Signal
    };
})();
