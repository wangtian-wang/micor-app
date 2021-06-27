(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.singleSpa = {}));
}(this, (function (exports) { 'use strict';

    const NOT_LOADED = 'NOT_LOADED';
    const LOADING_SOURCE_CODE = 'LOADING_SOURCE_CODE';
    const NOT_BOOTSTRAPPED = 'NOT_BOOTSTRAPPED';
    const BOOTSTRAPPING = 'BOOTSTRAPPING';
    const NOT_MOUNTED = 'NOT_MOUNTED';
    const MOUNTING = 'MOUNTING';
    const MOUNTED = 'MOUNTED';
    const UNMOUNTING = 'UNMOUNTING';// 解ོ除ོ挂ོ载ོ
    // 初ོ始ོ化ོ应ོ用ོ的ོ状ོ态ོ
    function shouldBeActived (app) {
        return app.activeRule(window.location)
    }

    /**
     * 挂ོ载ོ应ོ用ོ
     */

    let started = false;
    function start () {
        started = true;
        reRoute();
    }

    // compose 
    function flattenFnArrays (fns) {
        fns = Array.isArray(fns) ? fns : [fns];
        return (props) => fns.reduce((p, fn) => {
            p.then(() => fn(props
            ));
        }, Promise.resolve())
    }
    async function handleLoadPromise (app) {

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

    async function handleUnmount (app) {
        if (app.status !== MOUNTED) {
            return app
        }
        app.status = UNMOUNTING;
        await app.unmount(app.props);
        app.status = NOT_MOUNTED;
        return app;
    }

    async function handleBootstrapApps (app) {
        if (app.status !== NOT_BOOTSTRAPPED) {
            return app;
        }
        app.status = BOOTSTRAPPING;
        await app.bootstrap(app.props);
        app.status = NOT_MOUNTED;
        return app;
    }

    async function handleMountApps (app) {
        if (app.status !== NOT_MOUNTED) {
            return app;
        }
        app.status = MOUNTING;
        await app.mount(app.props);
        app.status = MOUNTED;
        return app;
    }

    const routeEventsArray = ['hashchange', 'popstate'];
    function resetReRoute () {
        return reRoute([])
    }
    // 用ོ户ོ切ོ换ོ路ོ由ོ的ོ方ོ式ོ有ོ四ོ种ོ 利ོ用ོa标ོ签ོ的ོ锚ོ点ོ属ོ性ོ hོaོsོhོ 点ོ击ོ浏ོ览ོ器ོ的ོ前ོ进ོ或ོ者ོ后ོ退ོ按ོ钮popstateོ 利ོ用ོpushstate replacestate触ོ发ོ
    window.addEventListener('hashchange', resetReRoute);
    window.addEventListener('popstate', resetReRoute);

    /**
     * 用ོ户ོ也ོ可ོ能ོ在ོwོiོnོdོoོwོ上ོ面ོ监ོ听ོ了ོ hashchange popstate 方ོ法ོ，拦ོ截ོ用ོ户ོ的ོ方ོ法ོ， 在ོ切ོ换ོ完ོ框ོ架ོ内ོ部ོ的ོ重ོ置ོ路ོ由ོ事ོ件ོ后ོ 去ོ执ོ行ོ用ོ户ོ的ོ方ོ法ོ
     */
    const capturedUserRouteEvents = {
        hashchange: [],
        popstate: []
    };
    const originEventListener = window.addEventListener;
    const originRemoveListener = window.removeEventListener;

    window.addEventListener = function (eventname, fn) {
        let res = capturedUserRouteEvents[eventname].some(item => item == fn);
        if (routeEventsArray.indexOf(eventname) >= 0 && !res) {
            capturedUserRouteEvents[eventname].push(fn);
            return
        }
        return originEventListener.apply(this, arguments)
    };
    window.removeEventListener = function (eventname, fn) {
        if (routeEventsArray.indexOf(eventname) >= 0) {
            capturedUserRouteEvents[eventname].filter(e => e !== fn);
            return;
        }
        return originRemoveListener.apply(this, arguments);
    };
    function patchUpDatedStates (event, originEventName) {
        return function () {
            const urlOld = window.location.href;
            event.apply(this, arguments);
            const newUrl = window.location.href;
            if (urlOld !== newUrl) {
                resetReRoute(new PopStateEvent('popstate'));
            }
        }
    }
    window.history.pushState = patchUpDatedStates(window.history.pushState);
    window.history.replaceState = patchUpDatedStates(window.history.replaceState);

    /**
     * reRoute 的ོ作ོ用ོ是ོ 加ོ载ོ应ོ用ོ
     */
    function reRoute (apps) {
        /**
         *  1： 获ོ取ོ需ོ要ོ加ོ载ོ的ོ应ོ用ོ
         *  2： 获ོ取ོ需ོ要ོ被ོ加ོ载ོ的ོ应ོ用ོ
         *  3： 获ོ取ོ需ོ要ོ被ོ卸ོ载ོ的ོ应ོ用ོ
         */

        const { appsToLoad, appsToMounted, appsToUnmounted } = handleAppsState(apps) || {};
        console.log(appsToLoad, appsToMounted, appsToUnmounted);





        if (started) {
            // 如ོ果ོ外ོ界ོ调ོ用ོ了ོsོtོaོrོtོ（） sོtོaོrོtོeོdོ = true 应ོ该ོ进ོ行ོ的ོ是ོ挂ོ载ོ应ོ用ོ的ོ操ོ作ོ
            console.log('started 挂ོ载ོ');
            return handleMountingApps()
        } else {
            // 应ོ用ོ初ོ始ོ化ོ的ོ操ོ作ོ
            console.log('register 预ོ加ོ载ོ');
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
                });
            }
            // 挂ོ载ོ之ོ前ོlོoོaོdོ过ོ的ོ应ོ用ོ
            if (appsToMounted) {
                appsToMounted.map(async (app) => {
                    app = await handleBootstrapApps(app);
                    await handleMountApps(app);
                    return;
                });
            }

        }    // 当ོ路ོ由ོ切ོ换ོ的ོ时ོ候ོ 需ོ要ོ去ོ手ོ动ོ加ོ载ོ切ོ换路ོ径ོ对ོ应ོ的ོ应ོ用ོ
    }

    let app = [];
    function registerSubApps (name, loadAppFn, activeRule, props) {
        app.push({
            name,
            loadAppFn,
            activeRule,
            props,
            status: NOT_LOADED
        });
        reRoute(app);//加ོ载ོ应ོ用ོ
    }
    function handleAppsState (apps) {
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
                        appsToLoad.push(app);
                    }
                    break;
                case NOT_BOOTSTRAPPED:
                case BOOTSTRAPPING:
                case NOT_MOUNTED:
                    if (shouldBeActivedStatus) {
                        appsToMounted.push(app);
                    }
                    break;
                case MOUNTED:
                    if (!shouldBeActivedStatus) {
                        appsToUnmounted.push(app);
                    }
                    break;

            }
        });
        return {
            appsToLoad,
            appsToMounted,
            appsToUnmounted

        }

    }

    exports.registerSubApps = registerSubApps;
    exports.start = start;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=single-spa.js.map
