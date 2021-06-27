import { LOADING_SOURCE_CODE, NOT_BOOTSTRAPPED } from './helper';
// compose 
function flattenFnArrays (fns) {
    fns = Array.isArray(fns) ? fns : [fns];
    return (props) => fns.reduce((p, fn) => {
        p.then(() => fn(props
        ))
    }, Promise.resolve())
}
export async function handleLoadPromise (app) {

    if (app.loadPromise) {
        return app.loadPromise;
    }
    return (app.loadPromise = Promise.resolve().then(async () => {
        app.status = LOADING_SOURCE_CODE;
        const { bootstrap, mount, unmount } = await app.loadAppFn(app.props);
        app.status = NOT_BOOTSTRAPPED;
        // 如ོ果ོ用ོ户ོ传ོ递ོ了ོ多ོ个ོbོoོoོtོsོtོrོaོpོ方ོ法ོ 需ོ要ོ变ོ为ོ一ོ位维ོ数ོ组ོ
        app.bootstrap = flattenFnArrays(bootstrap);
        app.mount = flattenFnArrays(mount);
        app.unmount = flattenFnArrays(unmount);
        delete app.loadPromise;
        return app;
    }))
}