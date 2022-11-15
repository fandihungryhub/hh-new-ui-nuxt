import { GroupLanding } from "@/types/GroupLanding";

export function belongToGroupLanding(
  branchId: string | number,
  groupLandingList: GroupLanding[]
) {
  if (Array.isArray(groupLandingList) && branchId) {
    const checkIsBelong = groupLandingList.filter((group) => {
      return group.attributes.branchId == branchId;
    });
    return checkIsBelong;
  }
  return false;
}
