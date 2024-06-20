export interface IDataMapper<M> {
    findOne(model: Partial<M>): Promise<M>;
    save(model: M): Promise<M>;
    update(model: Partial<M>, query: Partial<M>): Promise<boolean>;
}
