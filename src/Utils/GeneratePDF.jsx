import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const GeneratePDF = async (elementToPrintId) => {
  const element = document.getElementById(elementToPrintId);
  if (!element) {
    throw new Error(`Element with id "${elementToPrintId}" not found.`);
  }

  // Wait briefly to ensure rendering is complete
  await new Promise((resolve) => setTimeout(resolve, 100));

  const { offsetWidth, offsetHeight } = element;
  if (offsetWidth === 0 || offsetHeight === 0) {
    throw new Error("The target element has zero width or height. Cannot generate PDF.");
  }

  // Capture the element as canvas
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
  });

  // Convert canvas to image
  const imageData = canvas.toDataURL("image/png");

  if (!imageData || !imageData.startsWith("data:image/png")) {
    throw new Error("Failed to generate a valid PNG image from the canvas.");
  }

  // Optional: Preview the image in a new tab for debugging
  // window.open(imageData, '_blank');

  // Define PDF size (adjust as needed)
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: [285.75, 357.19], // Customize to your content size
  });

  pdf.addImage(imageData, "PNG", 0, 0, 285.75, 357.19);

  // Return downloadable blob URL
  const blob = pdf.output("blob");
  return URL.createObjectURL(blob);
};
