import React, { Component } from 'react';
import PushEmitter from '../emitter/PushEmitter';

export default class PushReceiverComponent extends Component {
    constructor(props) {
        super(props);
    }

    subscribe(tag, listener) {
        if (!tag || (typeof tag !== 'string') || !listener || (typeof listener !== 'function')) {
            throw new Error('[PushReceiverComponent]: Wrong tag or missing listener function');
        }
        let listeners = [];
        listeners[tag] = { tag, listener };
        this.setState({ listeners })
        PushManager.instance.subscribe(tag, listener);
    }

    componentWillUnmount() {
        const { listeners } = this.state;
        if (!listeners) {
            listeners.forEach(element => {
                const { tag, listener } = element;
                PushManager.instance.unsubscribe(tag, listener);
            });
        }
    }
}
