export declare class Signal<T>
{
    public constructor(
        timeoutInMs? : number,
        timeoutShouldNotThrow? : boolean
    );

    public emit(
        data? : any,
        reject? : boolean
    ) : void;

    public then<TResult1 = T, TResult2 = never>(
        onfulfilled? : (
            (
                value : T
            ) => TResult1 | PromiseLike<TResult1>
        ) | undefined | null,
        onrejected? : (
            (
                reason : any
            ) => TResult2 | PromiseLike<TResult2>
        ) | undefined | null
    ) : Promise<TResult1 | TResult2>;

    public catch<TResult = never>(
        onrejected? : (
            (
                reason : any
            ) => TResult | PromiseLike<TResult>
        ) | undefined | null
    ) : Promise<T | TResult>;

    public finally(
        onfinally? : (
            () => void
        ) | undefined | null
    ) : Promise<T>
}
