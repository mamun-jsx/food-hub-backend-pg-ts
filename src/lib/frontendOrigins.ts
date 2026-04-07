/**
 * Browsers send Origin without a trailing slash. CORS / Better Auth require an exact match,
 * so strip trailing slashes and support comma-separated FRONTEND_URL values.
 */
export function parseFrontendOrigins(): string[] {
  const raw = process.env.FRONTEND_URL || "http://localhost:3000";
  return raw
    .split(",")
    .map((s) => s.trim().replace(/\/+$/, ""))
    .filter(Boolean);
}
