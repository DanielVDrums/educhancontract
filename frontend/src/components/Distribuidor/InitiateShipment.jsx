import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, Col, Row, Container, Card } from 'react-bootstrap';

import { initiateShipment } from '../../services/api';

const InitiateShipment = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();


  const onSubmit = async (data) => {
    try {
      await initiateShipment({ batchID: data.batchID, carrier: data.carrier});
      alert('Shipment initiated successfully');
      reset();
    } catch (error) {
      alert(`Error initiating shipment: ${error.message}`);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Iniciar Envío</Card.Title>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formBatchID" className="mb-3">
                  <Form.Label>ID del Lote</Form.Label>
                  <Form.Control 
                    type="text"
                    placeholder="Ingrese el ID del lote"
                    isInvalid={!!errors.batchID}
                    {...register('batchID', {
                      required: 'El ID del lote es obligatorio',
                      minLength: { value: 3, message: 'El ID debe tener al menos 3 caracteres' }
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.batchID && errors.batchID.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formCarrier" className="mb-3">
                  <Form.Label>Transportista</Form.Label>
                  <Form.Control 
                    type="text"
                    placeholder="Ingrese el nombre del transportista"
                    isInvalid={!!errors.carrier}
                    {...register('carrier', {
                      required: 'El nombre del transportista es obligatorio'
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.carrier && errors.carrier.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formDestination" className="mb-3">
                  <Form.Label>Destino</Form.Label>
                  <Form.Control 
                    type="text"
                    placeholder="Ingrese el destino del envío"
                    isInvalid={!!errors.destination}
                    {...register('destination', {
                      required: 'El destino es obligatorio'
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.destination && errors.destination.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Iniciar Envío
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default InitiateShipment;
