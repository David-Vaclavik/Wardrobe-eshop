import { useNavigate, useRouteError } from "react-router";
import "../styles/ErrorPage.css";

export function ErrorPage() {
  const error = useRouteError() as { statusText?: string; message?: string };
  const navigate = useNavigate();

  // This renders when errorElement catches an error from its route
  if (error) {
    return (
      <div className="error-page">
        <h1>Oops! Something went wrong</h1>
        <h3>{error.statusText || error.message}</h3>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  // This renders for 404 (path: "*")
  return (
    <div className="error-page">
      <h1>404 - Page Not Found</h1>
      <h3>The page you're looking for doesn't exist.</h3>
      <button onClick={() => navigate("/")}>Go Home</button>
    </div>
  );
}
