export default {
  authentication: {
    verify(savedData) {
      if (savedData === null) {
        return true;
      }

      const version = savedData.hasOwnProperty('ver') && savedData.ver || 1;

      return version === this.currentVersion;
    },
    currentVersion: 2.41,
  },
};
