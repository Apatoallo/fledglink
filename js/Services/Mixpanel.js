import Mixpanel from "react-native-mixpanel";

import { mixpanelToken } from "../configs/config";

class MixpanelManager {
  constructor() {
    this.mixpanel = callback =>
      Mixpanel.sharedInstanceWithToken(mixpanelToken)
        .then(() => callback())
        .catch(error => console.log("Failed to initialize Mixpanel: ", error));
  }

  /*
    Send and event name with no properties
        event: string
     */
  track = async event => {
    this.mixpanel(() => Mixpanel.track(event));
  };

  /*
    Track event with properties
        event: string
        properties: Object
     */
  trackWithProperties = async (event, properties) => {
    this.mixpanel(() => Mixpanel.trackWithProperties(event, properties));
  };

  /*
    Get the last distinct id set with identify or, if identify hasn't been
    called, the default mixpanel id for this device, e.g getDistinctId(function(id){})
        id: Function
     */
  getDistinctId = async callback => {
    this.mixpanel(() => Mixpanel.getDistinctId(callback));
  };

  /*
    Identify, i.e. associate to an existing mixpanel profile:
    to call when a user logs in and is already registered in Mixpanel
    with this unique id
     */
  identify = async userId => {
    this.mixpanel(() => Mixpanel.identify(userId));
  };

  /*
    Set People properties (warning: if no mixpanel profile has been assigned
    to the current user when this method is called, it will automatically
    create a new mixpanel profile and the user will no longer be anonymous in Mixpanel)
     */
  set = async properties => {
    this.mixpanel(() => Mixpanel.set(properties));
  };

  /*
    increment property
        propertyName: string
        by: Number
     */
  increment = async (propertyName, by) => {
    this.mixpanel(() => Mixpanel.increment(propertyName, by));
  };

  /*
    Register super properties
        properties: Object
     */
  registerSuperProperties = async properties => {
    this.mixpanel(() => Mixpanel.registerSuperProperties(properties));
  };

  /*
    Register super properties Once
     */
  registerSuperPropertiesOnce = async properties => {
    this.mixpanel(() => Mixpanel.registerSuperPropertiesOnce(properties));
  };

  /*
    Register iOS push device token with Mixpanel
  */
  addPushDeviceToken = async token => {
    this.mixpanel(() => Mixpanel.addPushDeviceToken(token));
  };

  /*
    Register Android push device token with Mixpanel
  */
  setPushRegistrationId = async token => {
    this.mixpanel(() => Mixpanel.setPushRegistrationId(token));
  };
}

export default new MixpanelManager();
