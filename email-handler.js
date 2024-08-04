const nodemailer = require('nodemailer');

// Настройка транспортера для отправки почты
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mtp_event@yahoo.com',
        pass: 'your-password'
    }
});

function sendEmailWithAttachment({ nickname, country, phone, file, fileType }) {
    const mailOptions = {
        from: 'mtp_event@yahoo.com',
        to: 'mtp_event@yahoo.com', // Отправка на тот же адрес
        subject: `Новое ${fileType === 'video' ? 'видео' : 'фото'} от ${nickname}`,
        text: `Пользователь ${nickname} из ${country} с номером ${phone} отправил ${fileType}.`,
        attachments: [
            {
                filename: file.originalname,
                content: file.buffer
            }
        ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(`Ошибка при отправке письма: ${error}`);
        } else {
            console.log(`Письмо успешно отправлено: ${info.response}`);
        }
    });
}

module.exports = { sendEmailWithAttachment };