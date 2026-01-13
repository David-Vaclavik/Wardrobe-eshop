import { useParams } from "react-router";

export function ProductPage() {
  const { id } = useParams();

  console.log(id); // for testing purposes, to see if the id is correctly passed, will be removed later

  return (
    <>
      <h1>Product Page</h1>
    </>
  );
}
