import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

function FileUploader({ onDataParsed }) {
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;
    parseFile(uploadedFile);
  };

  const parseFile = (file) => {
    if (file.type === "text/plain" || file.type === "text/html") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        onDataParsed({ type: file.type, content });
      };
      reader.onerror = () => setError("Error reading file.");
      reader.readAsText(file);
    } else if (file.type === "application/pdf") {
      import("pdfjs-dist/legacy/build/pdf").then((pdfjsLib) => {
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          "//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";
        const fileReader = new FileReader();
        fileReader.onload = function () {
          const typedarray = new Uint8Array(this.result);
          pdfjsLib
            .getDocument(typedarray)
            .promise.then((pdf) => {
              let allText = "";
              let numPages = pdf.numPages;
              let count = 0;
              for (let i = 1; i <= numPages; i++) {
                pdf.getPage(i).then((page) => {
                  page.getTextContent().then((textContent) => {
                    const pageText = textContent.items
                      .map((item) => item.str)
                      .join(" ");
                    allText += pageText;
                    count++;
                    if (count === numPages) {
                      onDataParsed({ type: file.type, content: allText });
                    }
                  });
                });
              }
            })
            .catch((err) => setError(err.message));
        };
        fileReader.onerror = () => setError("Error reading PDF file.");
        fileReader.readAsArrayBuffer(file);
      });
    } else {
      setError("Unsupported file type.");
    }
  };

  return (
    <Box>
      <Button variant="contained" component="label">
        Upload File
        <input type="file" hidden onChange={handleFileChange} />
      </Button>
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
    </Box>
  );
}

export default FileUploader;
