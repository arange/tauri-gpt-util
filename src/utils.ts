export function isRunningInTauri(): boolean {
  try {
    return window.navigator.userAgent.includes("Tauri");
  } catch (error) {
    return false;
  }
}

// Utility to check if the code is running in a browser environment
export function isRunningInBrowser(): boolean {
  try {
    return typeof window !== "undefined" && !!window.navigator.userAgent;
  } catch (error) {
    return false;
  }
}
