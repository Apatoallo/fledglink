import { colors } from "../../configs/config";

export default {
  avatarContainer: {
    height: 150,
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginBottom: 13
  },
  avatar: {
    marginTop: 10,
    width: 100,
    height: 100,
    borderRadius: 50
  },
  input: {
    color: colors.darkBlack,
    fontSize: 16,
    paddingLeft: 0,
    marginLeft: 0
  },
  textArea: {
    color: colors.darkBlack,
    paddingLeft: 0,
    fontSize: 16,
    paddingRight: 0
  },
  pencilIcon: {
    fontSize: 40,
    borderRadius: 20,
    overflow: "hidden",
    color: colors.purple
  },
  iconContainer: {
    height: 35,
    width: 35,
    backgroundColor: colors.gallery,
    position: "absolute",
    bottom: 10,
    right: 2,
    borderRadius: 17
  }
};
