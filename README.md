# Instalar o Firebase CLI (se ainda não tiver)
Se ainda não instalou o Firebase CLI no seu computador, instale com:
```sh
npm install -g firebase-tools
```
Depois, faça login no Firebase:
```sh
firebase login
```

# Inicializar as Cloud Functions no Projeto
1.	No terminal, vá até a pasta do seu projeto (ou crie uma nova pasta para as funções):
mkdir meu-projeto-functions
cd meu-projeto-functions
2.	Inicialize as funções do Firebase:
firebase init functions
3.	Durante a configuração, responda:
o	"Which Firebase CLI features do you want to set up?" → Selecione Functions com a barra de espaço e pressione Enter.
o	Selecione seu projeto Firebase.
o	Escolha a linguagem: JavaScript ou TypeScript.
o	Deseja usar ESLint? (Opcional, escolha Sim ou Não).
o	Baixar dependências automaticamente? → Escolha Sim.
________________________________________
# Escrever e Implantar uma Função
Agora que o Cloud Functions está ativado, podemos criar e implantar uma função.
1.	Abra o arquivo index.js dentro da pasta functions e adicione um exemplo de função HTTP:
javascript
```js
const functions = require("firebase-functions");
exports.helloWorld = functions.https.onRequest((req, res) => {
    res.send("Hello from Firebase Cloud Functions!");
});
```
2.	Implante a função no Firebase:
```sh
firebase deploy --only functions
```
3.	Após o deploy, você verá um link como este:
URL (helloWorld): https://us-central1-SEU_PROJETO.cloudfunctions.net/helloWorld
o	Você pode testar acessando essa URL no navegador ou no Postman.
________________________________________
# Testando as Cloud Functions Localmente
Se quiser testar suas funções antes do deploy, use o Firebase Emulator:
1.	Instale as dependências:
```sh
cd functions
npm install
```
2.	Inicie o emulador local:
```sh
firebase emulators:start
```
3.	Agora, a função estará disponível localmente em algo como:
http://localhost:5001/SEU_PROJETO/us-central1/helloWorld
________________________________________
# Habilitar Billing para Funções de Rede (Opcional)
Se sua função precisar acessar APIs externas (como Typeform Webhook), pode ser necessário ativar o Plano Blaze no Firebase.
1.	Vá ao Firebase Console.
2.	Acesse Configurações do projeto > Faturamento.
3.	Selecione o Plano Blaze (ele tem um nível gratuito e só cobra por uso acima disso).

