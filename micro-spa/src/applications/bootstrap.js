import { BOOTSTRAPPING, NOT_BOOTSTRAPPED, NOT_MOUNTED } from "./helper";

export async function handleBootstrapApps (app) {
    if (app.status !== NOT_BOOTSTRAPPED) {
        return app;
    }
    app.status = BOOTSTRAPPING;
    await app.bootstrap(app.props);
    app.status = NOT_MOUNTED;
    return app;
}