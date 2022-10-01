const  amqplib = require('amqplib');
const Product = require('../models/Product');
let connection = null;
let channel = null;

const amqpConnect = async()=> {
    try {
      
      const amqpServer = 'amqp://localhost:5672';
      connection = await amqplib.connect(amqpServer);
      channel = await connection.createChannel();
        
      await channel.consume('commande', async(data) => { 
        await setQtyAfterSell(JSON.parse(Buffer.from(data.content)))       
        channel.ack(data);
        return true;
      });
    } catch (error) {
      console.log(error)
    }
}

const setQtyAfterSell = async (products)=>{
  for (const key in products) {
      const currentItem = products[key];
      const product = await Product.find({_id: currentItem._id});
      const newStock = product[0].stock - currentItem.quantite;
      if(product){
        const updatedProduct = await Product.updateOne({_id: currentItem._id}, {stock: newStock});
      }
  }
}

module.exports = amqpConnect;