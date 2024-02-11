import { StyleSheet } from "@react-pdf/renderer";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  page: {
    width: "100%",
  },
});

const CguContainer = () => {
  const pdfURL = "/pdf/cgu.pdf";
  return (
    <div style={styles.container}>
      <Document
        file={pdfURL}
        loading={"En attente du document, veuillez patienter..."}
      >
        <Page size="A4" style={styles.page} pageNumber={1} />
      </Document>
    </div>
  );
};

export default CguContainer;
