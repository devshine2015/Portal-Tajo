
export default {
  authentication: {
    verify(savedData) {
      if (savedData === null) {
        return true;
      }

      const version = Object.hasOwnProperty.call(savedData, 'ver') ? savedData.ver : 1;

      return version === this.currentVersion;
    },
    currentVersion: 2.5,
  },
};
