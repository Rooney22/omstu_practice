import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from "components/Headers/Header.js";
function Insert() {
  const [csvFile, setCsvFile] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file.type === 'text/csv') {
      setCsvFile(file);
    } else {
      alert('Пожалуйста, выберите файл CSV.');
    }
  };

  return (
    <>
    <Header />
    <Container>
      <Row>
        <Col>
          <div
            className="drop-zone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            Перетащите сюда файл CSV
          </div>
          {csvFile && (
            <p>Выбран файл: {csvFile.name}</p>
          )}
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Insert;