import React, { useState, useContext ,useEffect} from "react";
import axios from "axios";
import defaultThumbnail from "../../images/image.png";
import API from "../../services/Api";
import { AuthContext } from "../../contexts/AuthContext";
import ChooseCard from "../../components/ChooseCard"; // Adjust the import path as necessary

function ShortsUpload() {
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");
  const [categories, setCategories] = useState([]);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(API.getCategories);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchLanguages = async () => {
      try {
        const response = await axios.get(API.languages);
        setLanguages(response.data);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };

    fetchCategories();
    fetchLanguages();
  }, [token]);

  const handleVideoUpload = (file) => {
    const url = URL.createObjectURL(file);
    setVideo(url);

    const videoElement = document.createElement("video");
    videoElement.src = url;
    videoElement.onloadedmetadata = () => {
      setVideoDuration(videoElement.duration);
      if (videoElement.duration <= 60) {
        setVideo(file); // Set the video file to be used in upload
      } else {
        alert("Video exceeds the maximum allowed duration of 60 seconds.");
      }
    };
  };

  const handleThumbnailUpload = (file) => {
    setThumbnail(file); // Store the file object instead of URL
  };

  const uploadVideo = () => {
    if (!video) {
      alert("Please select a video to upload.");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category_name", category); // Ensure this matches the backend's expected field name
    formData.append("language", language);
    formData.append("duration", videoDuration);
    formData.append("thumbnail", thumbnail);
    formData.append("file", video);
  
    axios
      .post("http://localhost:3001/addShorts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Success:", response.data);
        alert("Upload Successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Upload failed: " + error.message);
      });
  };
  

  return (
    <div>
      <h2>Upload Shorts</h2>

      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Language:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          required
        >
          <option value="">Select a language</option>
          {languages.map((lang) => (
            <option key={lang.id} value={lang.language_name}>
              {lang.language_name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
        <div>
          <label>Upload Thumbnail</label>
          <ChooseCard
            placeholder="Click to select thumbnail"
            onFileSelect={handleThumbnailUpload}
            acceptedTypes={["image/jpeg", "image/png", "image/gif"]}
          />
        </div>

        <div>
          <label>Upload Video</label>
          <ChooseCard
            placeholder="Click to select video"
            onFileSelect={handleVideoUpload}
            acceptedTypes={["video/mp4", "video/mov", "video/avi"]}
          />
        </div>
      </div>


      {videoDuration <= 60 && video && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={uploadVideo} // Call uploadVideo directly
            style={{
              backgroundColor: "#007BFF",
              marginTop: "10px",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              borderRadius: "5px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007BFF")}
          >
            Upload Video
          </button>
        </div>
      )}
    </div>
  );
}
export default  ShortsUpload