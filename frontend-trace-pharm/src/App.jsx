import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CustomNavbar from './components/common/Navbar';
import Home from './components/Home';
import RegisterBatch from './components/Fabricante/RegisterBatch';
import InitiateShipment from './components/Distribuidor/InitiateShipment';
import UpdateEvent from './components/Distribuidor/UpdateEvent';
import ValidateAuthenticity from './components/Auditor/ValidateAuthenticity';
import ValidateMedication from './components/Consumidor/ValidateMedication';

function App() {
  return (
    <>
      <CustomNavbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fabricante/registerBatch" element={<RegisterBatch />} />
          <Route path="/distribuidor/initiateShipment" element={<InitiateShipment />} />
          <Route path="/distribuidor/updateEvent/:batchID" element={<UpdateEvent />} /> {/* Ruta para UpdateEvent */}
          <Route path="/auditor/validateAuthenticity/:batchID" element={<ValidateAuthenticity />} />
          <Route path="/consumidor/validateMedication/:medicationID" element={<ValidateMedication />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
