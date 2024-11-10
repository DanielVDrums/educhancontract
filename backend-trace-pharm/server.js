const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
//cors
app.use(cors());


const fabricanteRoutes = require('./routes/fabricanteRoutes');
const distribuidorRoutes = require('./routes/distribuidorRoutes');
const auditorRoutes = require('./routes/auditorRoutes');
const consumidorRoutes = require('./routes/consumidorRoutes');

app.use('/fabricante', fabricanteRoutes);
app.use('/distribuidor', distribuidorRoutes);
app.use('/auditor', auditorRoutes);
app.use('/consumidor', consumidorRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
