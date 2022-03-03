import { Share } from "react-native";
import { contentSiteUri } from "../configs/config";

export const shareContent = async (message, onSuccess, onError) => {
  try {
    const result = await Share.share({ message });

    if (result.action === Share.sharedAction) {
      if (onSuccess) {
        onSuccess();
      }
    } else if (result.action === Share.dismissedAction) {
      if (onError) {
        onError();
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const resourceShare = (resourceType, id) => {
  const message = `${contentSiteUri}/${resourceType}/${id}`;
  shareContent(message);
};
