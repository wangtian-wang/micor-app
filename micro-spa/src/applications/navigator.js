import { reRoute } from './reroute';
export const routeEventsArray = ['hashchange', 'popstate'];
function resetReRoute () {
    return reRoute([], arguments)
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
}
const originEventListener = window.addEventListener;
const originRemoveListener = window.removeEventListener;

window.addEventListener = function (eventname, fn) {
    let res = capturedUserRouteEvents[eventname].some(item => item == fn)
    if (routeEventsArray.indexOf(eventname) >= 0 && !res) {
        capturedUserRouteEvents[eventname].push(fn);
        return
    }
    return originEventListener.apply(this, arguments)
}
window.removeEventListener = function (eventname, fn) {
    if (routeEventsArray.indexOf(eventname) >= 0) {
        capturedUserRouteEvents[eventname].filter(e => e !== fn);
        return;
    }
    return originRemoveListener.apply(this, arguments);
}
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
window.history.pushState = patchUpDatedStates(window.history.pushState, 'pushState');
window.history.replaceState = patchUpDatedStates(window.history.replaceState, 'replaceState');