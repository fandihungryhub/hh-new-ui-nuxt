async function loadSwiper() {
  try {
    await import("swiper/css");
    await import("swiper/css/navigation");
    await import("swiper/css/pagination");
    await import("~/assets/css/swiper.scss");
    const importSwiper = await import("swiper/vue");
    const importSwiperModule = await import("swiper");
    if (importSwiper && importSwiperModule) {
      const { Swiper, SwiperSlide } = importSwiper;
      const { Navigation, Pagination, Virtual } = importSwiperModule;
      return {
        main: Swiper,
        slide: SwiperSlide,
        modules: {
          navigation: Navigation,
          pagination: Pagination,
          virtual: Virtual,
        },
      };
    }
    return null;
  } catch (err) {
    return null;
  }
}

export { loadSwiper };
