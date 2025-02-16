 
export const formatFileSize = size => {
  const units = ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const threshold = 1024;
  let index;

  size = Number(size) * threshold;
  index = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(threshold));

  return `${(size / Math.pow(threshold, index)).toFixed(2) * 1} ${
    units[index]
  }`;
};
