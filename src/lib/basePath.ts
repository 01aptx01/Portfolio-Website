/**
 * Resolves static asset paths with Next.js basePath support for GitHub Pages deployment.
 */
export const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  (process.env.GITHUB_ACTIONS === "true" ? "/Portfolio-Website" : "");

export function getAssetPath(path: string): string {
  if (!path) return "";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:")
  ) {
    return path;
  }
  // Prevent duplicate basePath prefix if already applied
  if (basePath && path.startsWith(basePath)) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}
