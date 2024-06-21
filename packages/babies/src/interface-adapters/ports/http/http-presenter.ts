export interface IHttpPresenter {
    exec(controllerOutput: Record<string, any>): Record<string, any>;
}
