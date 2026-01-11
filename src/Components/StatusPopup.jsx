import { useEffect, useState } from "react";
import "./statusPopup.css";

export default function StatusPopup({ message, status }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) return;

    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [message]);

  if (!visible) return null;

  return (
    <div className={`status-popup ${status}`}>
      {message}
    </div>
  );
}
