import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';

import { updateEvent } from '../../services/api';

const UpdateEvent = () => {
  const { batchID } = useParams(); // Extrae el batchID de la URL
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await updateEvent(data.batchID, data.currentLocation, data.temperature, data.humidity, data.eventTimestamp);
      alert('Event updated successfully');
      reset();
    } catch (error) {
      alert(`Error updating event: ${error.message}`);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Registrar Evento de Transporte</Card.Title>
              
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="batchID" className="mb-3">
                  <Form.Label>ID del Lote</Form.Label>
                  <Form.Control 
                    type="text"
                    value={batchID}
                    {...register('batchID')}
                  />
                </Form.Group>

                <Form.Group controlId="carrier" className="mb-3">
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

                <Form.Group controlId="currentLocation" className="mb-3">
                  <Form.Label>Ubicación Actual</Form.Label>
                  <Form.Control 
                    type="text"
                    placeholder="Ingrese la ubicación actual del lote"
                    isInvalid={!!errors.currentLocation}
                    {...register('currentLocation', {
                      required: 'La ubicación actual es obligatoria'
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.currentLocation && errors.currentLocation.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="temperature" className="mb-3">
                  <Form.Label>Temperatura (°C)</Form.Label>
                  <Form.Control 
                    type="number"
                    step="0.1"
                    placeholder="Ingrese la temperatura actual"
                    isInvalid={!!errors.temperature}
                    {...register('temperature', {
                      required: 'La temperatura es obligatoria',
                      valueAsNumber: true,
                      min: { value: -50, message: 'La temperatura mínima es -50°C' },
                      max: { value: 50, message: 'La temperatura máxima es 50°C' }
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.temperature && errors.temperature.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="humidity" className="mb-3">
                  <Form.Label>Humedad (%)</Form.Label>
                  <Form.Control 
                    type="number"
                    step="1"
                    placeholder="Ingrese la humedad actual"
                    isInvalid={!!errors.humidity}
                    {...register('humidity', {
                      required: 'La humedad es obligatoria',
                      valueAsNumber: true,
                      min: { value: 0, message: 'La humedad mínima es 0%' },
                      max: { value: 100, message: 'La humedad máxima es 100%' }
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.humidity && errors.humidity.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="eventTimestamp" className="mb-3">
                  <Form.Label>Fecha y Hora del Evento</Form.Label>
                  <Form.Control 
                    type="datetime-local"
                    isInvalid={!!errors.eventTimestamp}
                    {...register('eventTimestamp', { required: 'La fecha y hora del evento son obligatorias' })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.eventTimestamp && errors.eventTimestamp.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="description" className="mb-3">
                  <Form.Label>Descripción del Evento</Form.Label>
                  <Form.Control 
                    type="text"
                    placeholder="Ingrese una breve descripción del evento"
                    isInvalid={!!errors.description}
                    {...register('description', {
                      required: 'La descripción del evento es obligatoria'
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description && errors.description.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Registrar Evento
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateEvent;
