export const findLocations = opportunity => {
  return opportunity && opportunity.locations && opportunity.locationIds
    ? opportunity.locations.filter(location =>
        opportunity.locationIds.includes(
          location.id || location.corporationLocationId
        )
      )
    : [];
};
