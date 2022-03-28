import { useState } from "react";

export default function useVisualMode(initMode) {
  
  const [mode, setMode] = useState(initMode);
  const [history, setHistory] = useState([initMode]);

  function transition(newMode, replace) {

    if (replace) {
      setMode(newMode);
      setHistory(prevHistory => {
        const copyHistory = [...prevHistory];
        return [...copyHistory.slice(0, -1), newMode]
      });
      return;
    }
    
    setMode(newMode)
    setHistory(prevHistory => [...prevHistory, newMode]); 
  };

  function back() {

    if (history.length === 1) return;

    setMode(history[history.length - 2]);
    const copyHistory = [...history];
    setHistory(copyHistory.slice(0, -1));
  };

  return { mode, transition, back };
}