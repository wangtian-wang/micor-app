import { BOOTSTRAPPING, LOADING_SOURCE_CODE, MOUNTED, NOT_BOOTSTRAPPED, NOT_LOADED, NOT_MOUNTED, shouldBeActived } from "./helper";
import { reRoute } from './reroute';

let app = [];
export function registerSubApps (name, loadAppFn, activeRule, props) {
    app.push({
        name,
        loadAppFn,
        activeRule,
        props,
        status: NOT_LOADED
    })
    reRoute(app);//加ོ载ོ应ོ用ོ
}
export function handleAppsState (apps) {
    const appsToLoad = [];
    const appsToMounted = [];
    const appsToUnmounted = [];
    if (!Array.isArray(apps) || apps.length < 0) return;
    apps.forEach(app => {
        // shouldBeActivedStatus 子ོ应ོ用ོ的ོ激ོ活ོ规ོ则ོ 来ོ确ོ定ོ是ོ否ོ要ོ加ོ载ོ 挂ོ载ོ子ོ应ོ用ོ
        const shouldBeActivedStatus = shouldBeActived(app);
        switch (app.status) {
            case NOT_LOADED:
            case LOADING_SOURCE_CODE:
                if (shouldBeActivedStatus) {
                    appsToLoad.push(app)
                }
                break;
            case NOT_BOOTSTRAPPED:
            case BOOTSTRAPPING:
            case NOT_MOUNTED:
                if (shouldBeActivedStatus) {
                    appsToMounted.push(app)
                }
                break;
            case MOUNTED:
                if (!shouldBeActivedStatus) {
                    appsToUnmounted.push(app)
                }
                break;

        }
    })
    return {
        appsToLoad,
        appsToMounted,
        appsToUnmounted

    }

}