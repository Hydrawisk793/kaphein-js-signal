const { expect } = require("chai");

const {
    Signal,
    SignalTimeoutError,
} = require("../../src");

module.exports = function ()
{
    it("should be able to wait for an emit call.", async function ()
    {
        this.timeout(4000);

        const data = {
            foo : "foo",
        };
        const signal = new Signal();
        setTimeout(signal.emit.bind(signal), 2000, data);
        const result = await signal;

        expect(result).to.equal(data);
    });

    it("should be able to specify a timeout.", async function ()
    {
        this.timeout(10000);

        try
        {
            await (new Signal(2000));
        }
        catch(error)
        {
            expect(error).to.be.instanceOf(SignalTimeoutError);
        }
    });

    it("should be able to not throw an error on a timeout.", async function ()
    {
        this.timeout(10000);

        const result = await (new Signal(2000, true));
        expect(result).to.be.instanceOf(SignalTimeoutError);
    });

    it("should support finally if the native promise supports finally.", async function ()
    {
        this.timeout(10000);

        expect((await (async () =>
        {
            let err = null;
            let result = false;

            try
            {
                await (new Signal(2000));
            }
            catch(error)
            {
                // Ignore errors.
                err = error;
            }
            finally
            {
                result = !!err;
            }

            return result;
        })())).to.be.equal(true);
        expect((await (async () =>
        {
            let result = false;

            try
            {
                await (new Signal(2000, true));
            }
            catch(error)
            {
                // Ignore errors.
            }
            finally
            {
                result = true;
            }

            return result;
        })())).to.be.equal(true);
        expect((await (async () =>
        {
            let result = false;

            try
            {
                const signal = new Signal(2000);
                setTimeout(signal.emit.bind(signal), 1000);
                await signal;
            }
            finally
            {
                result = true;
            }

            return result;
        })())).to.be.equal(true);
    });
};
