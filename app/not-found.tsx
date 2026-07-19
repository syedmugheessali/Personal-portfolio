import Link from "next/link";

export default function NotFound() {
  return (
    <main className="error-page">
      <p className="eyebrow">404 / Route not found</p>
      <h1>This page is outside the blueprint.</h1>
      <p>The address may have changed. Return to the portfolio to continue exploring Syed’s work and experience.</p>
      <Link className="button button-primary" href="/">Return home</Link>
    </main>
  );
}
