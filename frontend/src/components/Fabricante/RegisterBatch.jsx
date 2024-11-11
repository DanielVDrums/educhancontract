import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, Col, Row, Container, Card } from 'react-bootstrap';

import { registerBatch } from '../../services/api';
const RegisterBatch = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await registerBatch(data);
      console.log(response.data);
      alert('Lote registrado exitosamente');
    } catch (error) {
      console.error(error);
      alert(`Error al registrar el lote: ${error.response.data.error}`);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Registrar Lote</Card.Title>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formBatchID" className="mb-3">
                  <Form.Label>ID del Lote</Form.Label>
                  <Form.Control 
                    type="text"
                    placeholder="Ingrese el ID del lote"
                    isInvalid={!!errors.batchID}
                    {...register('batchID', {
                      required: 'El ID del lote es obligatorio',
                      minLength: { value: 3, message: 'El ID del lote debe tener al menos 3 caracteres' }
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.batchID && errors.batchID.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formManufacturer" className="mb-3">
                  <Form.Label>Nombre del Fabricante</Form.Label>
                  <Form.Control 
                    type="text"
                    placeholder="Ingrese el nombre del fabricante"
                    isInvalid={!!errors.manufacturer}
                    {...register('manufacturer', {
                      required: 'El nombre del fabricante es obligatorio'
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.manufacturer && errors.manufacturer.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formProductionDate" className="mb-3">
                  <Form.Label>Fecha de Producción</Form.Label>
                  <Form.Control 
                    type="date"
                    isInvalid={!!errors.productionDate}
                    {...register('productionDate', { required: 'La fecha de producción es obligatoria' })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.productionDate && errors.productionDate.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formExpiryDate" className="mb-3">
                  <Form.Label>Fecha de Expiración</Form.Label>
                  <Form.Control 
                    type="date"
                    isInvalid={!!errors.expiryDate}
                    {...register('expiryDate', { required: 'La fecha de expiración es obligatoria' })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.expiryDate && errors.expiryDate.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formTransportCond" className="mb-3">
                  <Form.Label>Condiciones de Transporte</Form.Label>
                  <Form.Control 
                    type="text"
                    placeholder="Ingrese las condiciones de transporte"
                    isInvalid={!!errors.transportCond}
                    {...register('transportCond', { required: 'Las condiciones de transporte son obligatorias' })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.transportCond && errors.transportCond.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formLocation" className="mb-3">
                  <Form.Label>Ubicación</Form.Label>
                  <Form.Control 
                    type="text"
                    placeholder="Ingrese la ubicación"
                    isInvalid={!!errors.location}
                    {...register('location', { required: 'La ubicación es obligatoria' })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.location && errors.location.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formMedicationName" className="mb-3">
                  <Form.Label>Nombre del Medicamento</Form.Label>
                  <Form.Control 
                    type="text"
                    placeholder="Ingrese el nombre del medicamento"
                    isInvalid={!!errors.medicationName}
                    {...register('medicationName', { required: 'El nombre del medicamento es obligatorio' })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.medicationName && errors.medicationName.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formMedicationsJSON" className="mb-3">
                  <Form.Label>Lista de Medicamentos (JSON)</Form.Label>
                  <Form.Control 
                    as="textarea"
                    rows={3}
                    placeholder="Ingrese la lista de medicamentos en formato JSON"
                    isInvalid={!!errors.medicationsJSON}
                    {...register('medicationsJSON', { required: 'La lista de medicamentos es obligatoria' })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.medicationsJSON && errors.medicationsJSON.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Registrar Lote
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterBatch;
