const { expect } = require("chai");

const {
    Signal,
    SignalTimeoutError,
} = require("../../src");

module.exports = function ()
{
    it("should be able to wait for an emit call.", function (done)
    {
        this.timeout(4000);

        const data = {
            foo : "foo",
        };
        const signal = new Signal();
        setTimeout(signal.emit.bind(signal), 2000, data);
        signal
            .then(function (result)
            {
                expect(result).to.equal(data);

                done();
            })
        ;
    });

    it("should be able to specify a timeout.", function (done)
    {
        this.timeout(10000);

        const signal = new Signal(2000);
        signal
            .catch(function (error)
            {
                expect(error).to.be.instanceOf(SignalTimeoutError);
                done();
            })
        ;
    });

    it("should be able to not throw an error on a timeout.", function (done)
    {
        this.timeout(10000);

        const signal = new Signal(2000, true);
        signal
            .then(function (result)
            {
                expect(result).to.be.instanceOf(SignalTimeoutError);
                done();
            })
        ;
    });

    it("should support finally if the native promise supports finally.", async function ()
    {
        this.timeout(10000);

        expect((await (async () =>
        {
            let err = null;
            let result = false;

            return (new Signal(2000))
                .catch(function (error)
                {
                    err = error;
                })
                .finally(function ()
                {
                    result = !!err;
                })
                .then(function ()
                {
                    return result;
                })
            ;
        })())).to.be.equal(true);
        expect((await (async () =>
        {
            let result = false;

            return (new Signal(2000, true))
                .finally(function ()
                {
                    result = true;
                })
                .then(function ()
                {
                    return result;
                })
            ;
        })())).to.be.equal(true);
        expect((await (async () =>
        {
            let result = false;

            const signal = new Signal(2000);
            setTimeout(signal.emit.bind(signal), 1000);

            return signal
                .finally(function ()
                {
                    result = true;
                })
                .then(function ()
                {
                    return result;
                })
            ;
        })())).to.be.equal(true);
    });
};
