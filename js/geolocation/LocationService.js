import {
    PermissionsAndroid, Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { serverUrl } from '../configs/config';
import ToastComponent from '../shared/ToastComponent';

class WatcherPosition {
    constructor() {
        this.watchId = null;
        this.watching = false;
        this.lastPosition = null;
        this.permission = null;
        this.token = null;
    }

    get checkPermission() {
        return this.permission === PermissionsAndroid.RESULTS.GRANTED || this.permission;
    }

    getPermissions = async () => {
        if (Platform.OS === 'ios') {
            this.permission = await navigator.geolocation.requestAuthorization();
        } else {
            this.permission = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
        }
        return this.permission;
    }

    location = () => new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({ coords: { ...position.coords } });
            },
            (error) => {
                reject(new Error(error));
            },
        );
    });

    timer = () => setInterval(async () => {
        this.lastPosition = await this.location();
        fetch(`${serverUrl}/users/me/current-locations`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`,
            },
            body: JSON.stringify({
                currentLocation: { geoPosition: [this.lastPosition.coords.longitude, this.lastPosition.coords.latitude] },
            }),
        });
    }, 30000);

    startTimer = (token) => {
        this.token = token;
        this.watchId = this.timer();
    }

    getCurrentPosition = async (watching, token) => {
        this.watching = watching;
        this.token = token;

        if (!this.watching) {
            clearInterval(this.watchId);
            return { value: false };
        }

        if (!this.checkPermission && this.watching) {
            await this.getPermissions();
        }
        this.startTimer();
        this.lastPosition = await this.location();
        if (this.lastPosition.coords) {
            return { ...this.lastPosition, value: this.watching };
        }

        ToastComponent("Something went wrong, please check the access settings for the application's geo location");
        return { value: false };
    }
}

export default class LocationService {
    _watchPosition = new WatcherPosition();

    static _instance;

    static get instance() {
        if (!this._instance) {
            this._instance = new LocationService();
        }
        return this._instance;
    }

    startTimer(token) {
        return this._watchPosition.startTimer(token);
    }

    getCurrentPosition(watching, token) {
        return this._watchPosition.getCurrentPosition(watching, token);
    }
}
