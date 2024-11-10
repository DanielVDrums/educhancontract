import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Bienvenido al Sistema de Gestión de Fabric</h1>
      
      <div className="row">
        <div className="col-md-6 mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Fabricante</Card.Title>
              <Card.Text>
                Registra un nuevo lote de medicamentos y gestiona los detalles de la producción.
              </Card.Text>
              <Button variant="primary" as={Link} to="/fabricante/registerBatch">
                Registrar Lote
              </Button>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-6 mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Distribuidor</Card.Title>
              <Card.Text>
                Inicia el proceso de envío y registra los eventos de transporte para un lote.
              </Card.Text>
              <Button variant="primary" as={Link} to="/distribuidor/initiateShipment" className="mb-2">
                Iniciar Envío
              </Button>
              <Button variant="secondary" as={Link} to="/distribuidor/updateEvent/:batchID" className="mb-2">
                Actualizar Evento
              </Button>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-6 mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Auditor</Card.Title>
              <Card.Text>
                Valida la autenticidad de los lotes de medicamentos.
              </Card.Text>
              <Button variant="primary" as={Link} to="/auditor/validateAuthenticity">
                Validar Autenticidad
              </Button>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-6 mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Consumidor</Card.Title>
              <Card.Text>
                Valida un medicamento específico y verifica su trazabilidad.
              </Card.Text>
              <Button variant="primary" as={Link} to="/consumidor/validateMedication">
                Validar Medicamento
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
