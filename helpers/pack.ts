function pricingTypeLabel(type: string) {
  if (type === "per_person") {
    return $t("netPerson");
  } else {
    return $t("netSet");
  }
}

export { pricingTypeLabel };
