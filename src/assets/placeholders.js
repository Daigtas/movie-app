
export const getConsistentColor = (str) => {
  let hash = 0;
  if (str.length === 0) return '#333333';
  
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  
  const r = (hash & 0xFF) % 150 + 50; // 50-199
  const g = ((hash >> 8) & 0xFF) % 150 + 50;
  const b = ((hash >> 16) & 0xFF) % 150 + 50;
  
  return `rgb(${r}, ${g}, ${b})`;
};

export const getConsistentPlaceholder = (id) => {
  const placeholderId = id ? id.toString() : Math.random().toString(36).substring(7);
  const bgColor = getConsistentColor(placeholderId);
  const text = placeholderId.substring(0, 2).toUpperCase();
  const canvas = document.createElement('canvas');
  canvas.width = 200;
  canvas.height = 300;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 60px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  return canvas.toDataURL('image/png');
};
