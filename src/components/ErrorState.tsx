import { useNavigate } from "react-router";
import "../styles/ErrorState.css";

type ErrorStateProps = {
  message: string;
};

export function ErrorState({ message }: ErrorStateProps) {
  const navigate = useNavigate();

  return (
    <div className="error-state">
      <h2>Something went wrong. Please try again.</h2>
      <p>{message}</p>
      <button onClick={() => navigate(0)}>Retry</button>
    </div>
  );
}
