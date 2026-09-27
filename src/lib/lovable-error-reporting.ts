export function reportError(error: unknown) {
  if (typeof window !== "undefined") {
    console.error("Runtime error:", error);
  }
}
