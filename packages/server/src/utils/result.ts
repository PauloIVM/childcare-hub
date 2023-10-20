type Maybe<T> = T | null | undefined;

export type Result<T, E> = { res: Maybe<T>; err: Maybe<E> };

export const ok = <T>(res: T): Result<T, null> => {
    return { res, err: null };
};

export const error = <E>(err: E): Result<null, E> => {
    return { res: null, err };
};
