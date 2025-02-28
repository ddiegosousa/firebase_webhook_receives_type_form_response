/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const crypto = require("crypto");

admin.initializeApp();

exports.typeformWebhook = functions.https.onRequest(async (req, res) => {
  // Verifique se o método é POST
  if (req.method !== "POST") {
    return res.status(405).send("Método não permitido");
  }

  const db = admin.firestore();
  
  try {
    // Recebe os dados do Typeform
    const typeformData = req.body;

    //TESTE012345@Tag
    // Decodifica o secret token base64
   const secretToken = "TESTE012345@Tag";
    
    //  Obtém a assinatura enviada pelo Typeform no header
    const signature = req.headers["typeform-signature"];
    if (!signature) {
      return res.status(403).send("Assinatura ausente");
    }
    /*
    //Remove o prefixo "sha256=" da assinatura
    const signatureHash = signature.replace("sha256=", "");
    
    //Obtém o corpo da requisição **exatamente como foi enviado**
    const rawBody = JSON.stringify(req.body);

    //Calcula o HMAC SHA-256 usando o secret e o body da requisição
    const computedHash = crypto
      .createHmac("sha256", secretToken)
      .update(rawBody)
      .digest("base64");

    //Compara a assinatura calculada com a recebida
    if (computedHash !== signatureHash) {
      console.error("Assinatura inválida");
      return res.status(403).send("Acesso não autorizado:" + computedHash + " - " + signatureHash);
    }
    */
    // Salva os dados na coleção "typeformResponses"
    await db.collection("typeformResponses").add({
      ...typeformData,
      receivedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log("Dados salvos com sucesso.");
    return res.status(200).send("Webhook recebido e processado!");
  } catch (error) {
    console.error("Erro ao processar webhook:", error);

    // Registra o erro no Firestore na coleção "webhookErrors"
    await db.collection("webhookErrors").add({
      errorMessage: error.message || "Erro desconhecido",
      stackTrace: error.stack || "",
      receivedData: req.body, // Salva os dados recebidos para análise
      receivedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(500).send("Erro no servidor ao processar o webhook.");
  }
});