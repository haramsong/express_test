const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    // 여기에서 데이터 처리 로직을 추가하세요

    res.send(jsonData); // 처리한 데이터를 클라이언트로 보내기
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
