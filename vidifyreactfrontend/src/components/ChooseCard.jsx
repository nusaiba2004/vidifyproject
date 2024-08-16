import React, { useState } from "react";

const ChooseCard = ({ placeholder, onFileSelect, acceptedTypes }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (acceptedTypes && !acceptedTypes.includes(file.type)) {
      alert(`Please select a valid file of type: ${acceptedTypes.join(", ")}`);
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
  };

  const renderPreview = () => {
    if (!selectedFile) return <span>{placeholder}</span>;

    if (selectedFile.type.startsWith("image/")) {
      return (
        <img
          src={URL.createObjectURL(selectedFile)}
          alt="Selected"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            borderRadius: "8px",
          }}
        />
      );
    } else if (selectedFile.type.startsWith("video/")) {
      return (
        <video
          src={URL.createObjectURL(selectedFile)}
          muted
          controls
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            borderRadius: "8px",
          }}
        />
      );
    } else {
      return <span>Unsupported file type</span>;
    }
  };

  return (
    <div
      className="chooseCard"
      onClick={() => document.getElementById(placeholder).click()}
    >
      {renderPreview()}
      <input
        id={placeholder}
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept={acceptedTypes?.join(",")}
      />
    </div>
  );
};

export default ChooseCard;
