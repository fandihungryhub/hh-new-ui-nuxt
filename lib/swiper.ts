async function loadSwiper() {
  try {
    const importSwiper = await import("swiper/vue");
    if (importSwiper) {
      const { Swiper, SwiperSlide } = importSwiper;
      return {
        main: Swiper,
        slide: SwiperSlide,
      };
    }
    return null;
  } catch (err) {
    return null;
  }
}

async function loadNavigationModule() {
  try {
    const importSwiperModule = await import("swiper");
    if (!importSwiperModule) {
      return null;
    }
    return importSwiperModule.Navigation;
  } catch (err) {
    return null;
  }
}

async function loadPaginationModule() {
  try {
    const importSwiperModule = await import("swiper");
    if (!importSwiperModule) {
      return null;
    }
    return importSwiperModule.Pagination;
  } catch (err) {
    return null;
  }
}

async function loadVirtualModule() {
  try {
    const importSwiperModule = await import("swiper");
    if (!importSwiperModule) {
      return null;
    }
    return importSwiperModule.Virtual;
  } catch (err) {
    return null;
  }
}

export {
  loadSwiper,
  loadNavigationModule,
  loadPaginationModule,
  loadVirtualModule,
};
