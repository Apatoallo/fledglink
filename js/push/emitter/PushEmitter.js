import EventEmitter from 'EventEmitter';
import { DeviceEventEmitter } from 'react-native'

export const pushTypes = {
    all: 'all',
    userConnectionRequestAccepted: 'userConnectionRequestAccepted',
    userNewComment: 'userNewComment',
    userNewPostAuthorComment: 'userNewPostAuthorComment',
    userNewJob: 'userNewJob',
    userNewPostLike: 'userNewPostLike',
    userConnectionRequest: 'userConnectionRequest',
    userMention: 'userMention',
    userMentionInComment: 'userMentionInComment',
    flAnnounce: 'flAnnounce',
    // TODO: other push types
};
export default class PushEmitter extends EventEmitter {

    

    _emitterCache = new PushEmitterCache();

    static _instance;

    static get instance() {
        if (!this._instance) {
            this._instance = new PushEmitter();
        }
        return this._instance;
    }

    subscribe(tag, listener) {
        DeviceEventEmitter.addListener(tag, (message) => {
            listener(message);
        });
    }

    unsubscribe(tag, listener) {
        DeviceEventEmitter.removeListener(tag, listener);
    }

    setCounts(tag, count) {
        this._emitterCache.setCounts(tag, count);
        super.emit(pushTypes.all, {});
    }

    addNotification(tag, count) {
        this._emitterCache.addNotification(tag, count);
        super.emit(pushTypes.all, {});
    }

    removeNotification(tag, count) {
        this._emitterCache.removeNotification(tag, count);
        super.emit(pushTypes.all, {});
    }

    emit(tag, ...args) {
        this._emitterCache.cachePush(tag, ...args);
        super.emit(tag, args);
    }

    clearCache() {
        return this._emitterCache.clearNotification();
    }

    pushCount(tag) {
        return this._emitterCache.getPushCount(tag);
    }

    notificationCount(tag) {
        return this._emitterCache.getNotificationsCount(tag);
    }

    emitAll() {
        super.emit(pushTypes.all, {});
    }

    get cache() {
        return this._emitterCache;
    }
}

class PushEmitterCache {
    _cacheMap;

    constructor() {
        this._cacheMap = new Map();
        this._countNotifications = {};
    }

    setCounts(type, notificationIds) {
        this._countNotifications[pushTypes.all] = new Set([...(this._countNotifications[pushTypes.all] || []), ...notificationIds]);
        this._countNotifications[type] = new Set([...notificationIds]);
    }

    clearNotification() {
        this._countNotifications = {};
    }

    addNotification(type, notificationIds) {
        if (!Array.isArray(notificationIds)) notificationIds = [notificationIds];
        this._countNotifications[pushTypes.all] = new Set([...(this._countNotifications[pushTypes.all] || []), ...notificationIds]);
        this._countNotifications[type] = this._countNotifications[type] ? new Set([...this._countNotifications[type], ...notificationIds]) : new Set([...notificationIds]);
    }

    removeNotification(type, notificationIds) {
        if (this._countNotifications[pushTypes.all]) {
            this._countNotifications[pushTypes.all].delete(notificationIds);
        }
        if (this._countNotifications[type]) {
            this._countNotifications[type].delete(notificationIds);
        }
    }

    getNotificationsCount(tag) {
        return this._countNotifications[tag] ? this._countNotifications[tag].size : 0;
    }

    cachePush(tag, payload) {
        let payloadArr = this._cacheMap.get(tag);
        if (!payloadArr) {
            payloadArr = [];
            this._cacheMap.set(tag, payloadArr);
        }
        payloadArr.push(payload);
    }

    getPushCount(tag) {
        if (tag === pushTypes.all) {
            let count = 0;
            this._cacheMap.forEach((element) => {
                count += element.length;
            });
            return count;
        }
        return this._cacheMap.get(tag) ? this._cacheMap.get(tag).length : 0;
    }

    async _recoverCache(pushList) {
        if (pushList && pushList instanceof Array) {
            pushList.forEach((item) => {
                this.setCounts(item.type, item.notifications);
            });
            PushEmitter.instance.emitAll();
        }
    }
}
