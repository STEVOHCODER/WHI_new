import LoginForm from "./login-form";

export const dynamic = "force-dynamic";

// Server-rendered so the form (and any error) is in the initial HTML: a click
// that lands before React hydrates must still do something useful.
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return <LoginForm initialError={error ? "Invalid credentials. Please try again." : ""} />;
}
