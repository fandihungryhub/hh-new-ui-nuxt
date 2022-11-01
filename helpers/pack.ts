function pricingTypeLabel(type: string) {
  if (type === "per_person") {
    return "netPerson";
  } else {
    return "netSet";
  }
}

export { pricingTypeLabel };
