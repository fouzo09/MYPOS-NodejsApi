const  amqplib = require('amqplib');
let connection = null;
let channel = null;

const amqpConnect = async()=> {
    try {
      
      const amqpServer = 'amqp://localhost:5672';
      connection = await amqplib.connect(amqpServer);
      channel = await connection.createChannel();
        
      await channel.assertQueue('commande');
      return channel;
    } catch (error) {
      console.log(error)
    }
}

module.exports = amqpConnect;