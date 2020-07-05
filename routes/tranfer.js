import fs from 'fs';
import { clientModel } from '../models/client.js'
import mongoose from 'mongoose';
const collectionData = [{ "agencia": 10, "conta": 1001, "name": "Maria Roberta Fernandes", "balance": 587 },
{ "agencia": 10, "conta": 1002, "name": "Gustavo Falcao Oliveira", "balance": 396 },
{ "agencia": 10, "conta": 1003, "name": "Fernando Carlos Silva", "balance": 500 },
{ "agencia": 10, "conta": 1004, "name": "Aline Batista Bernardes", "balance": 321 },
{ "agencia": 10, "conta": 1005, "name": "Ivo Jose da Costa", "balance": 987 },
{ "agencia": 10, "conta": 1006, "name": "Carlos Eduardo Lino", "balance": 3 },
{ "agencia": 10, "conta": 1007, "name": "Henrique Santos Ferreira", "balance": 505 },
{ "agencia": 10, "conta": 1008, "name": "Priscila Alves da Cunha", "balance": 1 },
{ "agencia": 10, "conta": 1009, "name": "Luis Eduardo Nunes", "balance": 658 },
{ "agencia": 10, "conta": 1010, "name": "Silvana Souto Costa", "balance": 1023 },
{ "agencia": 10, "conta": 1011, "name": "Julia Maria Alves", "balance": 985 },
{ "agencia": 10, "conta": 1012, "name": "Bernardo Almeida Alves", "balance": 842 },
{ "agencia": 10, "conta": 1013, "name": "Lucas Andrade Barbosa", "balance": 753 },
{ "agencia": 10, "conta": 1014, "name": "Fernanda Barbosa Ferreira", "balance": 951 },
{ "agencia": 10, "conta": 1015, "name": "Caroline Aparecida da Cunha", "balance": 126 },
{ "agencia": 10, "conta": 1016, "name": "Ivo Barros", "balance": 324 },
{ "agencia": 10, "conta": 1017, "name": "Augusto Batista", "balance": 326 },
{ "agencia": 10, "conta": 1018, "name": "Vania Borges Moreira", "balance": 634 },
{ "agencia": 10, "conta": 1019, "name": "Valdete Macedo Souto", "balance": 426 },
{ "agencia": 10, "conta": 1020, "name": "Jose Luis Borges", "balance": 153 },
{ "agencia": 10, "conta": 1021, "name": "Marcelo Campos", "balance": 854 },
{ "agencia": 10, "conta": 1022, "name": "Pedro Augusto Cardoso", "balance": 651 },
{ "agencia": 10, "conta": 1023, "name": "Brena Martinho Carvalho ", "balance": 358 },
{ "agencia": 10, "conta": 1024, "name": "Pedro Castro", "balance": 1985 },
{ "agencia": 10, "conta": 1025, "name": "Camila Santini Costa", "balance": 1874 },
{ "agencia": 10, "conta": 1026, "name": "Alessandra Albergaria Dias", "balance": 1254 },
{ "agencia": 10, "conta": 1027, "name": "Giovanna Silva Dias", "balance": 9852 },
{ "agencia": 10, "conta": 1028, "name": "Maria Fernanda Gomes", "balance": 45 },
{ "agencia": 10, "conta": 1029, "name": "Maria Luiza Nunes", "balance": 658 },
{ "agencia": 10, "conta": 1030, "name": "Luiza Duarte", "balance": 452 },
{ "agencia": 25, "conta": 3001, "name": "Roberta Nunes", "balance": 458 },
{ "agencia": 25, "conta": 3002, "name": "Roberta Miranda", "balance": 985 },
{ "agencia": 25, "conta": 3003, "name": "Guilherme Zanin Freitas", "balance": 3265 },
{ "agencia": 25, "conta": 3004, "name": "Guilherme Ferreira Silva", "balance": 2154 },
{ "agencia": 25, "conta": 3005, "name": "Mario Augusto Fernandes", "balance": 456 },
{ "agencia": 25, "conta": 3006, "name": "Luis Eduardo Ferreira", "balance": 981 },
{ "agencia": 25, "conta": 3007, "name": "Claudia Ferreira Garcia", "balance": 854 },
{ "agencia": 25, "conta": 3008, "name": "Wagner Silva e Silva", "balance": 568 },
{ "agencia": 25, "conta": 3009, "name": "Daniel Henrique Gomes", "balance": 548 },
{ "agencia": 25, "conta": 3010, "name": "Lucas Cavalcanti Gonçalves", "balance": 474 },
{ "agencia": 25, "conta": 3011, "name": "Thiago Oliveira Lima", "balance": 658 },
{ "agencia": 25, "conta": 3012, "name": "Rogeiro Olveira Lopes", "balance": 125 },
{ "agencia": 25, "conta": 3013, "name": "Carlos Moniz Machado", "balance": 365 },
{ "agencia": 25, "conta": 3014, "name": "Rafael Henrique Marques", "balance": 489 },
{ "agencia": 25, "conta": 3015, "name": "Maira Imai Marques", "balance": 965 },
{ "agencia": 25, "conta": 3016, "name": "Lucas Portugal Vieira", "balance": 236 },
{ "agencia": 25, "conta": 3017, "name": "Gustavo Teixeira", "balance": 452 },
{ "agencia": 25, "conta": 3018, "name": "Cristina Souza", "balance": 986 },
{ "agencia": 25, "conta": 3019, "name": "Ana Marta Soares", "balance": 698 },
{ "agencia": 25, "conta": 3020, "name": "Ana Maria Santos", "balance": 965 },
{ "agencia": 25, "conta": 3021, "name": "Alberto Santana", "balance": 452 },
{ "agencia": 25, "conta": 3022, "name": "Felipe Ribeiro", "balance": 365 },
{ "agencia": 25, "conta": 3023, "name": "Henrique Bernardo Rocha", "balance": 265 },
{ "agencia": 25, "conta": 3024, "name": "Breno Reis", "balance": 241 },
{ "agencia": 25, "conta": 3025, "name": "Eduardo Olvieira", "balance": 852 },
{ "agencia": 25, "conta": 3026, "name": "Luis Eduardo Ramos", "balance": 562 },
{ "agencia": 25, "conta": 3027, "name": "Marcia Pereira", "balance": 65 },
{ "agencia": 25, "conta": 3028, "name": "Gabriel Gomes Nascimento", "balance": 325 },
{ "agencia": 25, "conta": 3029, "name": "Victor Moura", "balance": 965 },
{ "agencia": 25, "conta": 3030, "name": "Ana Maria Silva", "balance": 5 },
{ "agencia": 47, "conta": 2201, "name": "Jorge Ivan Jimenez", "balance": 36 },
{ "agencia": 47, "conta": 2202, "name": "Pedro Luis Fragoso", "balance": 45 },
{ "agencia": 47, "conta": 2203, "name": "Gesiane Leticia Alves", "balance": 98 },
{ "agencia": 47, "conta": 2204, "name": "Glaucio de Souza", "balance": 1 },
{ "agencia": 47, "conta": 2205, "name": "Richard Greeson", "balance": 189 },
{ "agencia": 47, "conta": 2206, "name": "Roberto Lopes Ramos", "balance": 120 },
{ "agencia": 47, "conta": 2207, "name": "Frederico Saito Rocha Costa", "balance": 110 },
{ "agencia": 47, "conta": 2208, "name": "Garin da Silva", "balance": 658 },
{ "agencia": 47, "conta": 2209, "name": "Franciele dos Santos Saraiva", "balance": 521 },
{ "agencia": 47, "conta": 2210, "name": "Carlos Henrique Soares", "balance": 136 },
{ "agencia": 47, "conta": 2211, "name": "Wellington Oliveira Filho", "balance": 215 },
{ "agencia": 47, "conta": 2212, "name": "Gabriela da Rosa Bulla", "balance": 425 },
{ "agencia": 47, "conta": 2213, "name": "Paola Silva Boff", "balance": 452 },
{ "agencia": 47, "conta": 2214, "name": "Bruna Caroline Silva de Castro", "balance": 658 },
{ "agencia": 47, "conta": 2215, "name": "Michele Cigolini Pulsy", "balance": 452 },
{ "agencia": 47, "conta": 2216, "name": "Eduardo Renan do Nascimento", "balance": 235 },
{ "agencia": 47, "conta": 2217, "name": "Julie Martin", "balance": 456 },
{ "agencia": 47, "conta": 2218, "name": "Ricardo Antonio Garcia", "balance": 987 },
{ "agencia": 47, "conta": 2219, "name": "Belisa Maria de Aguiar", "balance": 265 },
{ "agencia": 47, "conta": 2220, "name": "Ariana Pereira", "balance": 125 },
{ "agencia": 47, "conta": 2221, "name": "Guilherme Geraldo Aguiar", "balance": 3265 },
{ "agencia": 47, "conta": 2222, "name": "Eduardo Renan do Nascimento", "balance": 111 },
{ "agencia": 47, "conta": 2223, "name": "Gabriela Camila Silva de Lima", "balance": 214 },
{ "agencia": 47, "conta": 2224, "name": "Ana Carolina de Melo Santos", "balance": 421 },
{ "agencia": 47, "conta": 2225, "name": "Ana Katia dos Santos Dourado", "balance": 652 },
{ "agencia": 47, "conta": 2226, "name": "Mauricio Jose da Silva", "balance": 326 },
{ "agencia": 47, "conta": 2227, "name": "Ana Paula Sena Silva", "balance": 325 },
{ "agencia": 47, "conta": 2228, "name": "Maria Eduarda de Jesus Santos", "balance": 253 },
{ "agencia": 47, "conta": 2229, "name": "Angela Cardozo da Silva", "balance": 523 },
{ "agencia": 47, "conta": 2230, "name": "Ariadne Fernanda de Freitas", "balance": 587 },
{ "agencia": 33, "conta": 9101, "name": "Denner Saborido de Oliveira", "balance": 584 },
{ "agencia": 33, "conta": 9102, "name": "Bruno Alvares", "balance": 654 },
{ "agencia": 33, "conta": 9103, "name": "Marcelo Santos da Silva", "balance": 256 },
{ "agencia": 33, "conta": 9104, "name": "Utai Oliveira", "balance": 125 },
{ "agencia": 33, "conta": 9105, "name": "Priscila Milagres Godinho", "balance": 145 },
{ "agencia": 33, "conta": 9106, "name": "Paulo Dias Macedo Neto", "balance": 941 },
{ "agencia": 33, "conta": 9107, "name": "Flavio Luis Moreira Pereira", "balance": 854 },
{ "agencia": 33, "conta": 9108, "name": "Arthur Marcos Calazans Belo", "balance": 456 },
{ "agencia": 33, "conta": 9109, "name": "Ana Carolina de Melo Santos", "balance": 874 },
{ "agencia": 33, "conta": 9110, "name": "Ricardo Camacho", "balance": 325 },
{ "agencia": 33, "conta": 9111, "name": "Thiago Menezes", "balance": 65 },
{ "agencia": 33, "conta": 9112, "name": "Luis Fernando Toscani", "balance": 45 },
{ "agencia": 33, "conta": 9113, "name": "Ingrid Martinez Martins", "balance": 22 },
{ "agencia": 33, "conta": 9114, "name": "Itamir Carvalho Junior", "balance": 42 },
{ "agencia": 33, "conta": 9115, "name": "Gabriela Correa Alves", "balance": 125 },
{ "agencia": 33, "conta": 9116, "name": "Vander Lucio Siqueira", "balance": 965 },
{ "agencia": 33, "conta": 9117, "name": "Taisa Viturino da Silva", "balance": 745 },
{ "agencia": 33, "conta": 9118, "name": "Norberto Gustavo da Costa", "balance": 895 },
{ "agencia": 33, "conta": 9119, "name": "Vanessa do Carmo Martins", "balance": 311 },
{ "agencia": 33, "conta": 9120, "name": "Rosa Maria Sandoval", "balance": 985 },
{ "agencia": 33, "conta": 9121, "name": "Brunno Leonardo Melo de Oliveira", "balance": 568 },
{ "agencia": 33, "conta": 9122, "name": "Raissa de Almeida Lima", "balance": 875 },
{ "agencia": 33, "conta": 9123, "name": "Glaucio de Souza", "balance": 2354 },
{ "agencia": 33, "conta": 9124, "name": "Julio Cezar Santos", "balance": 56 },
{ "agencia": 33, "conta": 9125, "name": "Danilo de Souza", "balance": 98 },
{ "agencia": 33, "conta": 9126, "name": "Diego Luiz Siqueira Teixeira", "balance": 89 },
{ "agencia": 33, "conta": 9127, "name": "Ariana de Cesare Pereira", "balance": 126 },
{ "agencia": 33, "conta": 9128, "name": "Eduardo Renan Ferreira", "balance": 658 },
{ "agencia": 33, "conta": 9129, "name": "Nivaldo Soares do Santos", "balance": 754 },
{ "agencia": 33, "conta": 9130, "name": "Moises Castillo", "balance": 857 }];


// async function transferAllData() {
//   let bankClients = [];
//   try {
//     fs.readFile('./src/accounts.json', 'utf8', (err, data) => {
//       if (!err) {
//         const json = JSON.parse(data);
//         bankClients = json;
//       }
//     });
//     bankClients.forEach(cliente => {
//       const client = new clientModel(cliente);
//       client.save();
//     });
//   } catch (error) {
//     console.log("erro ao transferir os arquivos para a array")
//   }
// };

async function transferAllData() {
  if (mongoose.Collection.countDocuments > 0) {
    console.log("Dados já inseridos!");
  } else {
    await collectionData.forEach(account => {
      const client = new clientModel(account);
      client.save();
    });
  }
};

export { transferAllData };