import { MOUNTED, MOUNTING, NOT_MOUNTED } from "./helper";

export async function handleMountApps (app) {
    if (app.status !== NOT_MOUNTED) {
        return app;
    }
    app.status = MOUNTING;
    await app.mount(app.props);
    app.status = MOUNTED;
    return app;
}