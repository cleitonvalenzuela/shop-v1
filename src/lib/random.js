import { shuffleArray } from "$lib/array";

const female_names = ["Ana","Maria","Julia","Mariana","Fernanda","Patricia","Camila","Beatriz","Larissa","Amanda","Carolina","Bruna","Gabriela","Juliana","Renata","Aline","Tatiane","Vanessa","Priscila","Monica","Paula","Isabela","Leticia","Bianca","Claudia","Cristina","Luciana","Elaine","Simone","Daniela","Natasha","Lorena","Jessica","Raquel","Flavia","Michele","Sabrina","Debora","Helena","Cintia","Rafaela","Evelyn","Milena","Yasmin","Nicole","Alice","Valeria","Esther","Manuela","Livia","Isadora","Eduarda","Laura","Heloisa","Clara","Marina","Brenda","Thais","Luana","Ariana","Renata","Elisa","Cecilia","Melissa","Iris","Carla","Veronica","Denise","Marta","Sonia","Angela","Tatiana","Lilian","Regina","Sandra","Patricia","Rosana","Silvia","Fabiana","Cristiane","Brigitte","Camille","Danielle","Emanuelle","Francine","Geovana","Hadassa","Ingrid","Janaina","Karen","Katia","Leila","Lilian","Maira","Marcela","Mirian","Nadia","Noemi","Paloma","Paola","Renata","Roberta","Samara","Sheila","Solange","Suelen","Talita","Tania","Teresa","Viviane","Yara","Zelia","Adriana","Agatha","Aisha","Alana","Alessandra","Alessia","Alina","Alison","Amelia","Anastacia","Andreia","Angelica","Antonella","Aparecida","Ariane","Aurelia","Aurora","Barbara","Berenice","Catarina","Celina","Clarice","Conceicao","Daiane","Dalila","Diana","Doroteia","Eliane","Emilia","Erica","Fatima","Filomena","Gabrielly","Gloria","Graziella","Hilda","Ivana","Jacqueline","Jamile","Joana","Josefa","Josiane","Lais","Lara","Leandra","Leonor","Leticia","Lucia","Ludmila","Magda","Maite","Malu","Marcia","Margarete","Marilene","Marlene","Matilde","Mayara","Neide","Nilda","Nina","Olga","Penelope","Petra","Rita","Rosalia","Rute","Salete","Sara","Selma","Sonia","Suely","Tamara","Tarsila","Telma","Vania","Vilma","Zuleica"];
const male_names = ["Joao","Pedro","Lucas","Mateus","Rafael","Bruno","Gabriel","Felipe","Gustavo","Daniel","Rodrigo","Marcelo","Fernando","Ricardo","Eduardo","Diego","Leandro","Vinicius","Thiago","Andre","Carlos","Leonardo","Henrique","Marcos","Vitor","Caio","Alexandre","Renato","Fabricio","Murilo","Igor","Otavio","Samuel","Nathan","Cristiano","Roberto","Antonio","Paulo","Luis","Jorge","Matheus","Wesley","Danilo","Alan","Hugo","Davi","Noah","Enzo","Raul","Tadeu","Adriano","Alberto","Aldo","Alessandro","Amaro","Anselmo","Arnaldo","Augusto","Breno","Cesar","Ciro","Claudio","Cleber","Denis","Edson","Elias","Emerson","Everaldo","Fabiano","Fabrizio","Fagner","Flavio","Francisco","Gilberto","Gilmar","Guilherme","Heitor","Israel","Ivan","Jair","Jefferson","Jonas","Jonathan","Jose","Julio","Kleber","Laercio","Lauro","Lorenzo","Manoel","Marciano","Marcio","Mario","Mauricio","Natan","Nelson","Orlando","Osvaldo","Patrick","Ramon","Reginaldo","Robson","Rogerio","Ronaldo","Sandro","Saulo","Sebastiao","Sergio","Silvio","Tales","Tarcisio","Teodoro","Valdir","Valter","Vicente","Washington","Yago","Yuri","Zeca","Afonso","Agostinho","Alfredo","Amadeu","Anibal","Armando","Artur","Baltazar","Benedito","Bernardo","Caetano","Celso","Clemente","Domingos","Eder","Edgar","Emanuel","Estevao","Evaristo","Fidel","Genaro","Gerardo","Geraldo","Heraldo","Humberto","Ismael","Jacinto","Joaquim","Juca","Leopoldo","Lidio","Lourenco","Lucio","Mauro","Moises","Norberto","Octavio","Odair","Olavo","Osmar","Pablo","Quirino","Rodolfo","Romeu","Salvador","Teobaldo","Ubirajara","Ulisses","Valerio","Vanderlei","Xavier"];
const last_names = ["Silva","Souza","Oliveira","Santos","Lima","Pereira","Costa","Ferreira","Rodrigues","Almeida","Nascimento","Carvalho","Araujo","Ribeiro","Barbosa","Cardoso","Teixeira","Moreira","Correia","Mendes","Nogueira","Freitas","Batista","Rocha","Dias","Monteiro","Castro","Campos","Moraes","Farias","Rezende","Peixoto","Pinto","Vieira","Machado","Assis","Xavier","Medeiros","Barros","Andrade","Duarte","Viana","Gomes","Lopes","Cavalcante","Borges","Marques","Franco","Siqueira","Tavares","Aguiar","Amaral","Arruda","Azevedo","Bandeira","Barreto","Bastos","Beltrao","Bittencourt","Braga","Bueno","Cabral","Caldas","Camargo","Cardim","Carneiro","Carrasco","Chaves","Coelho","Cordeiro","Coutinho","Cunha","Dantas","Diniz","Drummond","Esteves","Falcao","Figueiredo","Fonseca","Fontes","Fraga","Galvao","Garcia","Godoy","Goulart","Guimaraes","Gusmao","Haddad","Henriques","Junqueira","Lacerda","Leite","Lessa","Lobo","Macedo","Maciel","Maia","Malta","Manso","Marinho","Mattos","Meireles","Mesquita","Motta","Muniz","Neves","Novais","Paes","Pacheco","Padilha","Paiva","Paredes","Passos","Pedrosa","Peixoto","Pimentel","Portela","Prado","Queiroz","Quintana","Rangel","Reis","Resende","Rios","Saldanha","Sampaio","Santana","Sarmento","Seabra","Serra","Severino","Soares","Souto","Teodoro","Torres","Trindade","Valenca","Valente","Vasconcelos","Velasco","Velloso","Ventura","Veras","Vidal","Villela","Vilela","Ximenes","Zanetti","Zanini","Zarif"];

export const getRandomNumber = (length) => {
    if (!Number.isInteger(length) || length <= 0) return "";
  
    let result = "";
    for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10);
    }
  
    return result;
}

export const getRandomCustomer = (gender) => {
    const female_images = shuffleArray(["6df8a7db-44f5-44cf-bc69-7afc17e4ab5d.webp","549b8656-aa4e-4ea4-a669-e70b39f584e9.webp","9c65569f-385c-48ab-9396-f7d764088b88.webp","f9ba9201-66d8-48dd-b572-12c74b9433f2.webp","a0aac0d4-a01e-4464-8124-981f48ce995d.webp","2be11f02-6800-41f1-98ec-febaa7fb873f.webp","2d079f5b-9404-41a2-b09f-3e73d32f9f9c.webp","28bc1bff-53a1-4e15-a8ee-15d5053ebdd1.webp","bceb52c6-d5ad-4629-8f97-48234cbaff11.webp","80b19702-81f2-42ec-8fbd-00d9db14416d.webp","8c7578cc-fbf7-4b74-98cf-aedf6b274703.webp","d6039cc7-083e-4016-8100-d5d663d1bdb9.webp","2ada5a3e-b17e-44e0-869b-d3d6214be6da.webp","302c7c46-ad5d-46d9-8848-37d52518cd24.webp","76e40277-c7ae-4005-8fc9-a36d07f9e0dd.webp","e773688a-e479-4e5d-8b8f-0be1b838300d.webp","f7ddda70-ebc8-4f0a-a3e7-5fa39c576b63.webp","2df8185e-8aa1-4910-9a97-bbe68637e663.webp","80288197-a84e-4132-97b1-eebd2ae3e945.webp","5c46a916-2e1e-4b7b-878e-f03bfaa50714.webp","0addd820-cbeb-425e-9bce-0d850bef82cb.webp","9cf0f5b7-ad5b-43c5-9cbb-013e3cd11a72.webp","034079e9-bc2c-4ee8-8cdb-32016d24c7aa.webp","1b4ae81b-f70b-4f73-a88f-39526fe77789.webp","22f02406-29f1-4320-a1ab-5f3eb4251894.webp","145afb61-d6eb-4143-a0fb-69fa94fdd1ef.webp","45646003-44b6-4884-a261-0a8d211367e7.webp","961e6c8e-56ba-4e4d-8de4-70b1e71fc681.webp","5dbdbc9b-c397-4d40-9aea-8fd65167959f.webp"]);
    const male_images = shuffleArray(["365ff5d4-38b3-458d-b23e-5c6af7498df7.webp","7265a0b8-6c8a-4dca-8b2d-e31f084463a2.webp","4215aafc-7e3f-47a9-99b7-ae80067923d7.webp","18971638-e58c-4ede-a494-87e0b6c508c5.webp","e6549067-66d6-4f37-a4aa-8766b16bb5ff.webp","4a4f02e7-0fba-442a-94fb-f20112116d8c.webp","b46ac3ca-d19f-47bb-87e5-1bfa3515714b.webp","65e646ce-e8f0-4276-98c9-0b45babd83c0.webp","5758d5bf-87b5-4802-bfb3-cdf36ebbc6e8.webp","ae95d083-0842-44f8-92a3-8c7fedcd0c98.webp","0ccea2d4-ad8a-407d-846b-06de3ff08937.webp","2b222c28-937f-4317-a40e-30a44aedd85d.webp","42a0aa34-b83e-4106-bcb4-7cefa38dd30c.webp","30be59b0-0802-4075-b1b3-3c868eab2be3.webp","5ae85c4e-63ea-4ab8-bc8d-1833c51cab7a.webp","06d0e862-6017-40fb-a10c-5fded74e4f24.webp","1f0b6235-dcc6-465e-9feb-a73306decd56.webp","c917b179-47ad-4c30-a7be-77c3d2a6ea99.webp","3ae257c5-88af-45c1-a2cb-a2a6684826aa.webp","1bc7cced-2bda-43b3-b97d-a9801e337846.webp","7867cba0-810c-4067-a2d9-cef02ada4ae2.webp","f428a159-f006-4230-bc2d-fb0a48508170.webp","474e142a-a946-491f-902e-59fdba01f842.webp","a5739c28-aaac-4948-b57e-fd2c75518a9c.webp","eb517711-f938-4ad9-b17c-7241bf89f5d1.webp","bfd19bab-83a5-4737-a555-36c1b77d2c00.webp","2200dc7f-6d26-4f6a-9621-55417f677886.webp","33f6e9c7-7504-47a0-a012-9cd328ba6121.webp","666210c1-5a28-464a-8e9e-37d11e467881.webp","d9246ba9-e95a-405d-892b-8e0300d65b07.webp"]);

    let fullname;
    let first_name;
    let middle_name;
    let image;

    if(gender == "male"){
        first_name = male_names[Math.floor(Math.random() * male_names.length)];
        image = male_images[Math.floor(Math.random() * male_images.length)];
    }
    else{
        first_name = female_names[Math.floor(Math.random() * female_names.length)];
        image = female_images[Math.floor(Math.random() * female_images.length)];
    }

    let last_name = last_names[Math.floor(Math.random() * last_names.length)];

    if(Math.random() < 0.5){
        middle_name = last_names[Math.floor(Math.random() * last_names.length)];
    }

    if(middle_name){
        fullname = `${first_name} ${middle_name} ${last_name}`;
    }
    else{
        fullname = `${first_name} ${last_name}`
    }

    return { fullname, image };
}

export const getRandomSuggestions = () => {
    const suggestions = shuffleArray([
        { title: "Sapatos masculinos de EVA com design inovador de verão", rating: 4.7, total_sales: 2367, coupon: "Desconto de R$ 5", free_shipping: false, flash_sale: false, image: { source: "f83745b4-1324-4e94-bdf8-85d7be4bb7df.webp", }, price: { regular: 129.9, promotional : 59.90 }},
        { title: "Conjunto de pijamas femininos pijamas 2 peças", rating: 4.9, total_sales: 5473, coupon: "50% OFF ", free_shipping: false, flash_sale: true, image: { source: "833fac8e-ed89-4420-8b30-5c546e8e6bc6.webp", }, price: { regular: 99.9, promotional : 49.90 }},
        { title: "Short feminino de fitness respirável com cintura alta", rating: 4.6, total_sales: 4352, coupon: null, free_shipping: true, flash_sale: false, image: { source: "baf18e45-0e80-4232-873b-02ef4c71515c.webp", }, price: { regular: 175.90, promotional : 69.90 }},
        { title: "Suporte móvel e ajustavel para smartphone", rating: 4.8, total_sales: 1336, coupon: null, free_shipping: true, flash_sale: false, image: { source: "a37eddcc-2f2b-49a9-9785-3515d9d33acf.webp", }, price: { regular: 89.9, promotional : 39.90 }},
        { title: "Conjunto de mini chaves de fenda 25 em 1", rating: 4.9, total_sales: 7684, coupon: "Desconto de R$ 10", free_shipping: false, flash_sale: false, image: { source: "d7a587da-9d9e-4958-a6b8-759aa007300c.webp", }, price: { regular: 137.9, promotional : 57.90 }},
        { title: "Organizador de maquiagem giratório 360 graus", rating: 4.3, total_sales: 2342, coupon: null, free_shipping: false, flash_sale: true, image: { source: "9b88bf53-2a4f-4c85-99e4-47cc1941631d.webp", }, price: { regular: 94.9, promotional : 29.90 }},
        { title: "Relógio de luxo masculino à prova d'água com luz", rating: 4.5, total_sales: 1664, coupon: null, free_shipping: true, flash_sale: false, image: { source: "5d838d40-fc1e-4266-b067-474039b58701.webp", }, price: { regular: 229.9, promotional : 119.90 }},
        { title: "Iluminação LED em formato de lua", rating: 4.6, total_sales: 5643, coupon: null, free_shipping: true, flash_sale: false, image: { source: "45b3a8a0-a615-4b4c-970c-22466d46c259.webp", }, price: { regular: 142.9, promotional : 62.90 }},
        { title: "Bolsa crossbody de nylon para mulheres moda portátil casual", rating: 4.7, total_sales: 1439, coupon: "Desconto de R$ 6", free_shipping: false, flash_sale: false, image: { source: "87e597c5-be22-4a14-b39c-beb93e0a3f8f.webp", }, price: { regular: 289.9, promotional : 129.90 }},
        { title: "Triturador manual de alho e temperos", rating: 4.8, total_sales: 2345, coupon: null, free_shipping: false, flash_sale: true, image: { source: "a530d34e-c0d5-4dd1-ae9f-edd80fec38da.webp", }, price: { regular: 68.90, promotional : 24.90 }},
        { title: "Tapete de fibra em relevo antiderrapante", rating: 4.9, total_sales: 1245, coupon: "41% OFF", free_shipping: false, flash_sale: false, image: { source: "a5cd875a-1bb0-40f6-8a9e-87a184e1fe54.webp", }, price: { regular: 72.9, promotional : 42.90 }},
        { title: "Lampada LED colorida com controle remoto", rating: 4.7, total_sales: 1875, coupon: null, free_shipping: true, flash_sale: false, image: { source: "4a482039-0871-4b8f-a045-046fefd1b19e.webp", }, price: { regular: 139.9, promotional : 69.90 }},
    ]);
    return suggestions.slice(0, 8);
}

export const getRandomTimeEndDay = () => {
    const now = Date.now();
    const end_of_day = new Date().setHours(23, 59, 59, 999);
  
    const random_timestamp = now + Math.random() * (end_of_day - now);
  
    return Math.floor((random_timestamp - now) / 1000);
}