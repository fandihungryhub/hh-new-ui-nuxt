import type { City } from "~/types/City";
import { getCities } from "~/services/common/getCities";
import alert from "~/lib/alert";
import { defineStore } from "pinia";

const useCityStore = defineStore("city", {
  state: () => {
    return {
      defaultCity: {
        id: "1",
        type: "cities",
        attributes: {
          name: "Bangkok",
          homeDescription: "",
        },
      } as City,
      selectedCityId: "1",
      cityOption: [] as City[],
    };
  },
  getters: {
    selectedCity(): City | null {
      const filter = this.cityOption.filter(
        (city) => city.id === this.selectedCityId
      );
      return filter.length ? filter[0] : null;
    },
    selectedCityName(): string {
      return this.selectedCity?.attributes.name || "";
    },
    selectedCityHomeDescription(): string {
      return this.selectedCity?.attributes.homeDescription || "";
    },
  },
  actions: {
    async fetchCity() {
      const { isSuccess, data, message } = await getCities();
      if (!isSuccess) {
        alert.error(message);
      } else if (isSuccess && data) {
        this.cityOption = data;
      }
    },
  },
});

export default useCityStore;
