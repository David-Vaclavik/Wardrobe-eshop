import { useParams } from "react-router";

export function ProductPage() {
  const { id } = useParams(); // Gets "42", "abc123", or "nike-shoes"

  console.log(id); // "42"

  return (
    <>
      <h1>Product Page</h1>
    </>
  );
}
