/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import messaging, {firebase} from "@react-native-firebase/messaging";
import App from './App';
import {name as appName} from './app.json';
import PushNotification from "react-native-push-notification";
import {useRecoilState} from "recoil";
import modalState from "./src/store/modal";


PushNotification.configure({
    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
    },
    onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);
    },
    onRegistration: function (token) {
        console.log("TOKEN:", token);
    },
    onRegistrationError: function (err) {
        console.error(err.message, err);
    },

    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
});

PushNotification.requestPermissions();

const setBackgroundNotificationHandler = async () => {
    await messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('백그라운드 알림:', remoteMessage);

        // 알림을 표시하고 사용자에게 알림을 보여줄 수 있습니다.
        // 이 코드는 실제 알림 표시를 구현하기 위한 예시입니다.
        if (Platform.OS === 'android') {
            const notification = new firebase.notifications.Notification()
                .setNotificationId(remoteMessage.messageId)
                .setTitle(remoteMessage.data.title)
                .setBody(remoteMessage.data.body)
                .setData(remoteMessage.data)
                .android.setPriority(firebase.notifications.Android.Priority.High)
                .android.setChannelId('your_channel_id')
                .android.setAutoCancel(true);
            firebase.notifications().displayNotification(notification);
        }
    });
};



// 백그라운드 알림 설정 호출
setBackgroundNotificationHandler();

console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => App);
