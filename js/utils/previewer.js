import LinkPreview from "@flyerhq/react-native-link-preview";
export default (previewer = async (message) => {
  return LinkPreview.getPreview(message, {
    imagesPropertyType: "og" // fetches only open-graph images
  })
    .then(data => {
      return data;
    })
    .catch(error => {
        return null
    });
});
