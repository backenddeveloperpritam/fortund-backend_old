const admin = require("../config/notificationConfig");
module.exports.sendNotification = async function(registrationToken, message_notification, notification_options) {


    await admin.messaging().sendToDevice(registrationToken, message_notification, notification_options)
        .then(response => {

            return "Notification sent successfully"

        })
        .catch(error => {
            console.log(error);
        });
}