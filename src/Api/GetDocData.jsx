import React, { useState, useEffect } from "react";
import axios from "axios";

const GetDocumentData = () => {
  const [document, setDocument] = useState(null);
  const documentId = "1UCf4eoDuAtJhntBrAOmCJPrTwAycCLuy2zEtOGGMdfs";
  const API_KEY = "AIzaSyDNbzHBrC-jBg_IztH4DzP39BsrQAC7ve0";

  useEffect(() => {
    const fetchData = async () => {
        const url = `https://www.googleapis.com/drive/v3/files/${documentId}/export?mimeType=text/plain&key=${API_KEY}`;

      try {
        const response = await axios.get(url);
        setDocument(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [documentId]);

  if (!document) {
    return <div>Loading...</div>;
  }

  return (
    <div className="div8">
      <p>{document}</p>
    </div>
  );
};

export default GetDocumentData;
