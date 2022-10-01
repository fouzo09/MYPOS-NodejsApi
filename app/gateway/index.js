const app = require('./src/app');
const gatewayConfig = require('./shared/utils/gateway.config');
const PORT = gatewayConfig.port;

app.listen(PORT);
