const formatTime = (d) => {
  let diff = Math.round((new Date() - new Date(d)) / 1000);
  if (diff < 60) return `Vor ${diff} Sekunde${diff !== 1 ? 'n' : ''}`;
  diff = Math.round(diff / 60);
  if (diff < 60) return `Vor ${diff} Minute${diff !== 1 ? 'n' : ''}`;
  diff = Math.round(diff / 60);
  if (diff < 24) return `Vor ${diff} Stunde${diff !== 1 ? 'n' : ''}`;
  diff = Math.round(diff / 24);
  return `Vor ${diff} Tag${diff !== 1 ? 'en' : ''}`;
};

export default formatTime;
