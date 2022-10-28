async function loadSwiper() {
  try {
    const importSwiper = await import("swiper/vue");
    const importSwiperModule = await import("swiper");
    if (importSwiper && importSwiperModule) {
      const { Swiper, SwiperSlide } = importSwiper;
      const { Navigation, Pagination } = importSwiperModule;
      return {
        main: Swiper,
        slide: SwiperSlide,
        modules: {
          navigation: Navigation,
          pagination: Pagination,
        },
      };
    }
    return null;
  } catch (err) {
    return null;
  }
}

export { loadSwiper };
