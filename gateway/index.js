const app = require('./src/app');
const gatewayConfig = require('./src/utils/gateway.config');
const PORT = gatewayConfig.port;

app.listen(PORT);
