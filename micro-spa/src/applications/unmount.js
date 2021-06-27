import { MOUNTED, NOT_MOUNTED, UNMOUNTING } from "./helper";

export async function handleUnmount (app) {
    if (app.status !== MOUNTED) {
        return app
    }
    app.status = UNMOUNTING;
    await app.unmount(app.props)
    app.status = NOT_MOUNTED;
    return app;
}