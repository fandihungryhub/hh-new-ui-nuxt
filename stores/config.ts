import { defineStore } from "pinia";
import { getConfig, APIResponse } from "~/services/common/getConfig";

const useConfigStore = defineStore("config", {
  state: () => {
    return {
      availableCities: [],
      selectedCity: "Bangkok",
      backendConfig: {} as APIResponse["data"],
    };
  },
  actions: {
    async getConfig() {
      const { data, isSuccess } = await getConfig();
      if (isSuccess && data) {
        this.backendConfig = data.data;
      }
    },
  },
});

export default useConfigStore;
