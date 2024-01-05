export function BlobToSrc(blob: Blob): any {
 // Assuming you have a blob object named 'blobObj'
  const reader = new FileReader();
  reader.readAsText(blob);
  reader.onloadend = () => {
    const base64data = (reader.result)?.toString().split(',')[1];
    return  'data:image/png;base64,' + base64data;
    // Use the base64src as needed
  };

}
