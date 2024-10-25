import { Document, Page } from 'react-pdf'; // Install react-pdf using npm

function PdfViewer({ pdfUrl, onClose }) {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex justify-center items-center">
      <button onClick={onClose} className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded">Close</button>
      <div className="w-full h-full p-4">
        <Document file={pdfUrl}>
          <Page pageNumber={1} /> {/* You can change this based on the specific page number */}
        </Document>
      </div>
    </div>
  );
}
