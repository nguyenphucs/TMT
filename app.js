import {
  getAppAccessToken,
} from "./utils/autherization";

App({
  onLaunch: function () {
    let that = this;
    that.authorize();
  },

  authorize() {
    return getAppAccessToken();
  },
  GlobalConfig: {
    baseId: "E3Ryby8bWawtp2sGBPQluCvLgUg",
    tableId: "tblm8TJ5h37bUCEz",
    // baseId2: "E3Ryby8bWawtp2sGBPQluCvLgUg"

  },
});
