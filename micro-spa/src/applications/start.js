import { reRoute } from "./reroute";
/**
 * 挂ོ载ོ应ོ用ོ
 */

export let started = false;
export function start () {
    started = true
    reRoute();
}