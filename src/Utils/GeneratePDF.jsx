import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const GeneratePDF = async (elementToPrintId) => {
  const element = document.getElementById(elementToPrintId);
  if (!element) {
    throw new Error(`Element with id ${elementToPrintId} not found`);
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
  });

  const data = canvas.toDataURL("image/png");

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: [285.75, 357.19],
  });

  pdf.addImage(data, "PNG", 0, 0, 285.75, 357.19);
  pdf.save(`car_${new Date().toISOString()}.pdf`);
};
