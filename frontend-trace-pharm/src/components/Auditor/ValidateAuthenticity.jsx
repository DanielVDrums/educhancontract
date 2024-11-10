import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Button,
  Alert,
  Form,
} from "react-bootstrap";

import { validateAuthenticity } from "../../services/api";

const ValidateAuthenticity = () => {
  const { batchID: urlBatchID } = useParams(); // Extrae el batchID de la URL
  const [batchID, setBatchID] = useState(urlBatchID || ""); // Estado para el batchID
  const [batchData, setBatchData] = useState(null);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBatchData = async () => {
      try {
        const response = await validateAuthenticity({ batchID });
      
        if (!response.status === 200) throw new Error("No se pudo recuperar los datos del lote");
  
        setBatchData(response.data);
        setEvents(response.data.events);
      } catch (err) {
        setError(err.message);
      }
    };

    if (batchID) {
      fetchBatchData();
    }
  }, [batchID]);

  const handleBatchIDChange = (e) => {
    setBatchID(e.target.value);
  };

  const handleValidate = async () => {
    try {
      const response = await validateAuthenticity({ batchID });
      
      if (!response.status === 200) throw new Error("No se pudo recuperar los datos del lote");

      setBatchData(response.data);
      setEvents(response.data.events);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">
                Validar Autenticidad del Lote
              </Card.Title>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form.Group controlId="batchID">
                <Form.Label>ID del Lote</Form.Label>
                <Form.Control
                  type="text"
                  value={batchID}
                  onChange={handleBatchIDChange}
                  placeholder="Ingrese el ID del lote"
                />
              </Form.Group>

              <Button
                variant="primary"
                className="w-100 mt-3"
                onClick={handleValidate}
              >
                Validar Autenticidad
              </Button>

              {batchData && (
                <>
                  <ListGroup className="mb-3 mt-4">
                    <ListGroup.Item>
                      <strong>ID del Lote:</strong> {batchData.ID}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Fabricante:</strong> {batchData.Manufacturer}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Nombre del Medicamento:</strong> {batchData.MedicationName}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Fecha de Producción:</strong> {batchData.ProductionDate}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Fecha de Expiración:</strong> {batchData.ExpiryDate}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Propietario Actual:</strong> {batchData.CurrentOwner}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Ubicación:</strong> {batchData.Location}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Condiciones de Transporte:</strong> {batchData.TransportCond}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Estado:</strong> {batchData.Status}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Medicamentos:</strong> {batchData.Medications.join(", ")}
                    </ListGroup.Item>
                  </ListGroup>

                  <Card.Title className="mt-4">Eventos del Lote</Card.Title>
                  {events.length > 0 ? (
                    <ListGroup>
                      {events.map((event, index) => (
                        <ListGroup.Item key={index}>
                          <strong>Timestamp:</strong> {event.timestamp}<br />
                          <strong>Ubicación:</strong> {event.location}<br />
                          <strong>Temperatura:</strong> {event.temperature} °C<br />
                          <strong>Humedad:</strong> {event.humidity} %<br />
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <Alert variant="info">
                      No hay eventos asociados a este lote.
                    </Alert>
                  )}
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ValidateAuthenticity;
