const R = 6371e3;

export const haversine = (lat1, lon1, lat2, lon2) => {
  if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) return Number.POSITIVE_INFINITY;
  const phi1 = lat1 * (Math.PI / 180);
  const phi2 = lat2 * (Math.PI / 180);
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    (Math.sin(dLat / 2) ** 2) +
    (Math.cos(phi1) * Math.cos(phi2) * (Math.sin(dLon / 2) ** 2));
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

export const nearestDestination = async (destinations) => {
  const { latitude, longitude } = chayns.getGeoLocation();
  const distances = destinations.map(d => ({ ...d, distance: haversine(latitude, longitude, d.latitude, d.longitude) }));
  const nearest = distances.reduce((p, e) => (p && p.distance <= e.distance ? p : e), null);
  return nearest || {};
};
