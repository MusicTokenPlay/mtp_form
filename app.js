const express = require('express');
const multer = require('multer');
const path = require('path');
const emailHandler = require('./email-handler');

const app = express();
const port = 3000;

// Настройка хранения файлов с использованием multer
const storage = multer.memoryStorage(); // Хранение в памяти для немедленной отправки
const upload = multer({ storage: storage });

// Обработка формы для видео
app.post('/submit-video', upload.single('videoBlob'), (req, res) => {
    const { nickname, country, phone } = req.body;
    const videoFile = req.file;

    emailHandler.sendEmailWithAttachment({
        nickname,
        country,
        phone,
        file: videoFile,
        fileType: 'video'
    });

    res.send('Видео отправлено на проверку.');
});

// Обработка формы для фото
app.post('/submit-photo', upload.single('photoBlob'), (req, res) => {
    const { nickname, country, phone } = req.body;
    const photoFile = req.file;

    emailHandler.sendEmailWithAttachment({
        nickname,
        country,
        phone,
        file: photoFile,
        fileType: 'photo'
    });

    res.send('Фотография отправлена на проверку.');
});

app.listen(port, () => {
    console.log(`Сервер работает на порту ${port}`);
});