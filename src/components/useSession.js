import { useState, useEffect } from "react";

const useSessionId = () => {
  const [sessionId, setSessionId] = useState(() => {
    // Retrieve the session ID from localStorage when the hook is first used
    return localStorage.getItem("sessionId") || null;
  });

  useEffect(() => {
    // Update localStorage whenever the sessionId state changes
    if (sessionId) {
      localStorage.setItem("sessionId", sessionId);
    } else {
      localStorage.removeItem("sessionId");
    }
  }, [sessionId]);

  return [sessionId, setSessionId];
};

export default useSessionId;
