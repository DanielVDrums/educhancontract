import React from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Form, Col, Row, Container, Card } from 'react-bootstrap';

const ValidateMedication = () => {
  const { medicationID } = useParams();  // Extrae el ID del medicamento desde la URL
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      medicationID: medicationID || ''  // Establece el valor por defecto del formulario con el ID recibido
    }
  });

  const onSubmit = async (data) => {
    try {
      const response = await validateMedication(data);
      console.log(response.data);
      alert('Medicamento validado exitosamente');
    } catch (error) {
      console.error(error);
      alert(`Error al validar el medicamento: ${error.message}`);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Validar Medicamento</Card.Title>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formMedicationID" className="mb-3">
                  <Form.Label>ID del Medicamento</Form.Label>
                  <Form.Control 
                    type="text"
                    placeholder="Ingrese el ID del medicamento"
                    isInvalid={!!errors.medicationID}
                    {...register('medicationID', {
                      required: 'El ID del medicamento es obligatorio',
                      minLength: { value: 3, message: 'El ID debe tener al menos 3 caracteres' }
                    })}
                    defaultValue={medicationID} // Asigna el valor del parámetro al campo del formulario
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.medicationID && errors.medicationID.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Validar Medicamento
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ValidateMedication;
