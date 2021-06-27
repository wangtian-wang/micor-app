export const NOT_LOADED = 'NOT_LOADED';
export const LOADING_SOURCE_CODE = 'LOADING_SOURCE_CODE';
export const NOT_BOOTSTRAPPED = 'NOT_BOOTSTRAPPED';
export const BOOTSTRAPPING = 'BOOTSTRAPPING';
export const NOT_MOUNTED = 'NOT_MOUNTED';
export const MOUNTING = 'MOUNTING';
export const MOUNTED = 'MOUNTED';
export const UPDATING = 'UPDATING';
export const UNMOUNTING = 'UNMOUNTING';// 解ོ除ོ挂ོ载ོ
export const UNLOADING = 'UNLOADING';//解ོ除ོ加ོ载ོ 完ོ全ོ卸ོ载ོ中ོ
export const LOAD_ERROR = 'LOAD_ERROR';
export const SKIP_BECAUSE_BROKEN = 'SKIP_BECAUSE_BROKEN';
// 当ོ前ོ的ོ应ོ用ོ是ོ否ོ应ོ该ོ被ོ激ོ活ོ
export function isActived (app) {
    return app.status === MOUNTED
}
// 初ོ始ོ化ོ应ོ用ོ的ོ状ོ态ོ
export function shouldBeActived (app) {
    return app.activeRule(window.location)
}