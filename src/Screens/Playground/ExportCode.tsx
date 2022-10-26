import React, { useEffect, useState } from "react";
import { BiExport } from "react-icons/bi";
import styled from "styled-components";

interface Export {
  exportString: string;
}

const ExportCode = styled.button`
  a {
    color: black;
    text-decoration: none;
    background: transperant;
    outline: 0;
    border: 0;
    font-size: 1.1rem;

    display: flex;
    align-items: center;
    gap: 0.75rem;

    svg {
      font-size: 1.4rem;
    }

    cursor: pointer;
  }
`;

export const SaveList: React.FC<Export> = ({ exportString }) => {
  // set up local state for generating the download link
  const [downloadLink, setDownloadLink] = useState("");

  // function for generating file and set download link
  const makeTextFile = () => {
    // This creates the file.
    // In my case, I have an array, and each item in
    // the array should be on a new line, which is why
    // I use .join('\n') here.
    const data = new Blob([exportString], { type: "text/plain" });

    // this part avoids memory leaks
    if (downloadLink !== "") window.URL.revokeObjectURL(downloadLink);

    // update the download link state
    setDownloadLink(window.URL.createObjectURL(data));
  };

  // Call the function if list changes
  useEffect(() => {
    makeTextFile();
  }, [exportString]);

  return (
    <ExportCode>
      <a
        // this attribute sets the filename
        download="file.txt"
        // link to the download URL
        href={downloadLink}
      >
        <BiExport />
        Export Code
      </a>
    </ExportCode>
  );
};

export default SaveList;
