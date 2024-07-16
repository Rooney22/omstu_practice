import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from "components/Headers/Header.js";
import './Insert.css'; 
function Insert() {
  const [csvFile, setCsvFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.type == 'text/csv') {
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
          <h2 class = 'insert'>Загрузите файл для дальнейшей работы</h2>            <div
              className="drop-zone" 
            >
              <p>Перетащите или нажмите здесь для загрузки файла CSV.</p>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Insert;