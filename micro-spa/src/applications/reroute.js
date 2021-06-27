import { handleAppsState } from './register';
import { started } from './start';
import { handleLoadPromise } from './load';
import { handleUnmount } from './unmount';
import { handleBootstrapApps } from './bootstrap';
import { handleMountApps } from './mount';
import './navigator';
/**
 * reRoute 的ོ作ོ用ོ是ོ 加ོ载ོ应ོ用ོ
 */
export function reRoute (apps) {
    /**
     *  1： 获ོ取ོ需ོ要ོ加ོ载ོ的ོ应ོ用ོ
     *  2： 获ོ取ོ需ོ要ོ被ོ加ོ载ོ的ོ应ོ用ོ
     *  3： 获ོ取ོ需ོ要ོ被ོ卸ོ载ོ的ོ应ོ用ོ
     */

    const { appsToLoad, appsToMounted, appsToUnmounted } = handleAppsState(apps) || {};
    console.log(appsToLoad, appsToMounted, appsToUnmounted)





    if (started) {
        // 如ོ果ོ外ོ界ོ调ོ用ོ了ོsོtོaོrོtོ（） sོtོaོrོtོeོdོ = true 应ོ该ོ进ོ行ོ的ོ是ོ挂ོ载ོ应ོ用ོ的ོ操ོ作ོ
        console.log('started 挂ོ载ོ')
        return handleMountingApps()
    } else {
        // 应ོ用ོ初ོ始ོ化ོ的ོ操ོ作ོ
        console.log('register 预ོ加ོ载ོ')
        return handleLoadingApps()
    }
    /**
     *  预ོ加ོ载ོ应ོ用ོ = 获ོ取ོ到ོ子ོ应ོ用ོ的ོbོoོoོtོsོtོrོaོpོ mོoོuོnོtོ UོNོmོoོuོnོtོ 方ོ法ོ，放ོ到ོapp上ོ
     */

    async function handleLoadingApps () {
        let apps = await Promise.all(appsToLoad.map(handleLoadPromise));
    }
    async function handleMountingApps () {
        // 先ོ卸ོ载ོ旧ོ应ོ用ོ
        // let unmountedApps = await Promise.all(appsToUnmounted.map(handleUnmount));
        if (appsToUnmounted) {
            let unmountedApps = appsToUnmounted.map(handleUnmount);

        }
        // 切ོ换ོ应ོ用ོ 并ོ且ོ 快ོ速ོ的ོ加ོ载ོ新ོ的ོ应ོ用ོ 此ོ时ོ如ོ果ོ路ོ劲ོ不ོ匹ོ配ོ 应ོ该ོ加ོ载ོ当ོ前ོ的ོ路ོ由ོ对ོ应ོ的ོ应ོ用ོ
        if (appsToLoad) {
            appsToLoad.map(async (app) => {
                app = await handleLoadPromise(app);
                // 挂ོ载ོ新ོ的ོ应ོ用ོ5
                app = await handleBootstrapApps(app);
                await handleMountApps(app);
                return;
            })
        }
        // 挂ོ载ོ之ོ前ོlོoོaོdོ过ོ的ོ应ོ用ོ
        if (appsToMounted) {
            appsToMounted.map(async (app) => {
                app = await handleBootstrapApps(app);
                await handleMountApps(app);
                return;
            })
        }

    };
    // 当ོ路ོ由ོ切ོ换ོ的ོ时ོ候ོ 需ོ要ོ去ོ手ོ动ོ加ོ载ོ切ོ换路ོ径ོ对ོ应ོ的ོ应ོ用ོ
}