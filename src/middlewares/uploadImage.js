const multer = require('multer');

// / /images é o caminho/end-point da API onde as imagens estarão disponíveis
// path.join(__dirname, '..', 'uploads') é o caminho da pasta onde o multer deve salvar suas imagens ao realizar o upload -> REQ10!
// a pasta `uploads` está em `./src/uploads` e não deve ser renomeada ou removida (assim como o arquivo `ratinho.jpg`)

// EX COURSE
// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, 'uploads');
//   },
//   filename: (req, file, callback) => {
//     callback(null, file.originalname);
//   }});

const storage = multer.diskStorage({
  destination: 'src/uploads/',
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

module.exports = upload;