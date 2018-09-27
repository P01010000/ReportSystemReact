const R = 6371e3;

const haversine = (lat1, lon1, lat2, lon2) => {
  if(lat1 == null || lon1 == null || lat2 == null || lon2 == null) return Number.POSITIVE_INFINITY;
  var phi1 = lat1 / 180 * Math.PI;
  var phi2 = lat2 / 180 * Math.PI;
  var dLat = (lat2 - lat1) / 180 * Math.PI;
  var dLon = (lon2 - lon1) / 180 * Math.PI;
  var a = Math.sin(dLat/2)**2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon/2)**2;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R*c;
}

export default haversine;
