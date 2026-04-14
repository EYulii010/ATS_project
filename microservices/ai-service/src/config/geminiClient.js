const {GoogleGenerativeAI} = require('@google/generative-ai');
const {GEMINI_API_KEY}= process.env
//VERIFICA SI LA API KEY ESTA EN EL ENVIROMENT FILE 
if (!process.env.GEMINI_API_KEY){
    throw new Error ('GEMINI_API_KEY environment variable is not set')

}
//INICIALIZAR CLIENTE AI CON LA LLAVE 
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
module.exports = genAI
