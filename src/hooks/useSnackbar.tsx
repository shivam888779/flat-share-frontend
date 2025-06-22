import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";

type SnackbarType = "success" | "error" | "info" | "warning";

interface SnackbarMessage {
  id: number;
  type: SnackbarType;
  message: string;
}

interface SnackbarContextProps {
  success: (msg: string) => void;
  error: (msg: string) => void;
  info: (msg: string) => void;
  warning: (msg: string) => void;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined);
let messageId = 0;

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<SnackbarMessage[]>([]);

  const addMessage = useCallback((type: SnackbarType, message: string) => {
    const id = ++messageId;
    setMessages((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    }, 3000);
  }, []);

  const removeMessage = (id: number) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  const getColor = (type: SnackbarType) => {
    switch (type) {
      case "success":
        return "#4caf50";
      case "error":
        return "#f44336";
      case "info":
        return "#2196f3";
      case "warning":
        return "#ff9800";
      default:
        return "#333";
    }
  };

  return (
    <SnackbarContext.Provider
      value={{
        success: (msg) => addMessage("success", msg),
        error: (msg) => addMessage("error", msg),
        info: (msg) => addMessage("info", msg),
        warning: (msg) => addMessage("warning", msg),
      }}
    >
      {children}
      <div className="snackbar-container">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="snackbar fade-in"
            style={{ backgroundColor: getColor(msg.type) }}
          >
            <span>{msg.message}</span>
            <button className="close-btn" onClick={() => removeMessage(msg.id)}>
              ×
            </button>
          </div>
        ))}
      </div>

      <style jsx>{`
        .snackbar-container {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .snackbar {
          color: white;
          padding: 14px 20px;
          border-radius: 8px;
          min-width: 280px;
          max-width: 400px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 15px;
          animation: fadeIn 0.3s ease, fadeOut 0.5s ease 2.5s;
        }

        .close-btn {
          background: none;
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
          margin-left: 10px;
          line-height: 1;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeOut {
          to {
            opacity: 0;
            transform: translateY(-10px) scale(0.9);
          }
        }
      `}</style>
    </SnackbarContext.Provider>
  );
};

export const useGlobalSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useGlobalSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
