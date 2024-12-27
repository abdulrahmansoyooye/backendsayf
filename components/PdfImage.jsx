import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

export async function extractFirstImageFromPDF(pdfFile) {
  try {
    // Load the PDF file
    const pdf = await pdfjsLib.getDocument(URL.createObjectURL(pdfFile)).promise;

    // Get the first page
    const page = await pdf.getPage(1);

    // Render the page to a canvas
    const viewport = page.getViewport({ scale: 1 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    await page.render(renderContext).promise;

    // Convert the canvas content to an image (data URL)
    const dataUrl = canvas.toDataURL();

    // Clean up
    canvas.remove();

    return dataUrl; // Return the image data URL
  } catch (error) {
    console.error('Error extracting image from PDF:', error);
    return null; // Return null if no image could be extracted
  }
}
