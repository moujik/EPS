// utils.js
export function convertToCSV(arr) {
    const array = [Object.keys(arr[0])].concat(arr);
    return array.map(it => {
      return Object.values(it).toString();
    }).join('\n');
  }
  
  export function downloadCSV(arr, filename) {
    const csvData = convertToCSV(arr);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
  