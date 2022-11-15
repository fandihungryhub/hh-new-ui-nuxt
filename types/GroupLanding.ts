export interface GroupLanding {
  id: string;
  type: string;
  attributes: {
    title: string;
    description: string;
    footerDescription: null;
    slug: string;
    compactRestaurant: boolean;
    totalRestaurants: number;
    groupTagId: null;
    branchId: null;
    tagId: number;
    sortBy: null;
    mobilePhotos: string[];
    desktopPhotos: string[];
    logo: string;
  };
}
