import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Header from "components/Headers/Header.js";
import './Insert.css'; // Importing a CSS file for styling

function Insert() {
  // State variables for managing file upload and prediction status
  const [csvFile, setCsvFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [predicting, setPredicting] = useState(false);

  // Handler for file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.type === 'text/csv') {
      setCsvFile(file);
    } else {
      alert('Пожалуйста, выберите файл CSV.'); // Show an alert if the selected file is not a CSV
    }
  };

  // Handler for triggering fraud prediction
  const handlePredict = async () => {
    try {
      setPredicting(true); // Show predict preloader
      // Make an API request for fraud prediction
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Prediction complete!');
    } catch (error) {
      console.error('An error occurred during prediction:', error);
    } finally {
      setPredicting(false);
    }
  };

  // Handler for uploading the selected CSV file
  const handleUpload = async () => {
    try {
      setUploading(true);
      // Create a FormData object and append the selected file
      const formData = new FormData();
      formData.append('file', csvFile);
      // Make an API request to upload the file
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('File uploaded successfully!');
    } catch (error) {
      console.error('An error occurred during file upload:', error);
    } finally {
      setUploading(false);
    }
  };

  // Handler for the overall process (upload + predict)
  const handleClick = async () => {
    await handleUpload();
    await handlePredict();
  };

  return (
    <>
      <Header /> {/* Render the header component */}
      <Container>
        <Row>
          <Col>
            <h2 className="insert">Загрузите файл для дальнейшей работы</h2>
            <div className="drop-zone">
              <p>Перетащите или нажмите здесь для загрузки файла CSV.</p>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
              />
            </div>
            <Button className="InsertButton" onClick={handleClick}>
              Отправить
            </Button>
            <br />
            {uploading && <p>Uploading... </p>}
            {predicting && <p>Predicting... </p>}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Insert;
