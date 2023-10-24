type IDependenciesAsFactories<C> = {
    [P in keyof C]: InjectorFactory<new (...args: unknown[]) => C[P]>;
};

type IInstance<C> = C extends new (...args: unknown[]) => infer I ? I : C;

export class InjectorFactory<C extends new (...args: unknown[]) => any> {
    private method!: C;
    private instance?: () => IInstance<C>;
    private dependencies?: IDependenciesAsFactories<ConstructorParameters<C>>;

    constructor(
        method?: InjectorFactory<C>["method"],
        dependencies?: IDependenciesAsFactories<ConstructorParameters<C>>,
    ) {
        if (!method) return;
        this.method = method;
        this.dependencies = dependencies;
    }

    create(): IInstance<C> {
        if (this.instance) return this.instance();
        const dependencies = this.resolveDependencies();
        if (!dependencies) return new this.method();
        return new this.method(...dependencies);
    }

    injectInstance(instance: () => IInstance<C>) {
        this.instance = instance;
        return this;
    }

    private resolveDependencies() {
        if (!this.dependencies) return [];
        const dependencies =
            (this.dependencies as unknown as InjectorFactory<C>[]) || [];
        const results: IInstance<C>[] = [];
        for (const dependency of dependencies) {
            const result = dependency.create();
            results.push(result);
        }
        return results;
    }
}
