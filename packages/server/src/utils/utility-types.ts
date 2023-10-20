type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

export type AsyncReturnType<T extends (...args: any) => any> = Awaited<
    ReturnType<T>
>;

export type ArrayElement<ArrType> =
    ArrType extends readonly (infer ElementType)[] ? ElementType : never;

export type RecordElement<
    RecordType,
    keyType extends string | number | symbol = string,
> = RecordType extends Record<keyType, infer ElementType> ? ElementType : never;

export type Declare<T> = new () => T;

export type Maybe<T> = T | null | undefined;
