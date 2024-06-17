import React from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

function Notification(status, text) {
  //   const createNotification = (type) => {
  return () => {
    switch (status) {
      case "info":
        NotificationManager.info(text.body);
        break;
      case "success":
        NotificationManager.success(text.body, text.title);
        break;
      case "warning":
        NotificationManager.warning(text.body, text.title, 3000);
        break;
      case "error":
        NotificationManager.error(text.body, text.title, 3000);
        break;
    }
  };
}

//   return (
//     <div>
//       Notification
//       <button onClick={createNotification("info")}>Info</button>
//       <button onClick={createNotification("success")}>Success</button>
//       <button onClick={createNotification("warning")}>Warning</button>
//       <button onClick={createNotification("error")}>Error</button>
//       <NotificationContainer />
//     </div>
//   );
// }

export default Notification;
