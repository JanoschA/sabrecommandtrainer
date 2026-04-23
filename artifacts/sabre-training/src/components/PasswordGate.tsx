import { useState } from "react";

const PASSWORD = "fechten";
const STORAGE_KEY = "sabre_training_auth";

function isAuthenticated(): boolean {
  return localStorage.getItem(STORAGE_KEY) === "true";
}

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(isAuthenticated);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  if (authenticated) {
    return <>{children}</>;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim().toLowerCase() === PASSWORD) {
      localStorage.setItem(STORAGE_KEY, "true");
      setAuthenticated(true);
    } else {
      setError(true);
      setInput("");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0f172a",
        color: "#f1f5f9",
        fontFamily: "sans-serif",
        padding: "1rem",
      }}
    >
      <div
        style={{
          background: "#1e293b",
          borderRadius: "1rem",
          padding: "2.5rem 2rem",
          maxWidth: "360px",
          width: "100%",
          boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: "2.5rem" }}>&#9876;</div>
        <h1
          style={{
            margin: 0,
            fontSize: "1.5rem",
            fontWeight: 700,
            letterSpacing: "0.02em",
            textAlign: "center",
          }}
        >
          Säbelfecht Training
        </h1>
        <p style={{ margin: 0, color: "#94a3b8", textAlign: "center", fontSize: "0.95rem" }}>
          Bitte gib das Passwort ein, um die App zu öffnen.
        </p>
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          <input
            type="password"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(false);
            }}
            placeholder="Passwort"
            autoFocus
            style={{
              width: "100%",
              padding: "0.65rem 1rem",
              borderRadius: "0.5rem",
              border: error ? "2px solid #ef4444" : "2px solid #334155",
              background: "#0f172a",
              color: "#f1f5f9",
              fontSize: "1rem",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          {error && (
            <p style={{ margin: 0, color: "#ef4444", fontSize: "0.875rem", textAlign: "center" }}>
              Falsches Passwort. Bitte versuche es erneut.
            </p>
          )}
          <button
            type="submit"
            style={{
              padding: "0.65rem 1rem",
              borderRadius: "0.5rem",
              border: "none",
              background: "#2563eb",
              color: "#fff",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            Einloggen
          </button>
        </form>
      </div>
    </div>
  );
}
