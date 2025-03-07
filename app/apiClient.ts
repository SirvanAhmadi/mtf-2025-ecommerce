export const BASE_URL_API = "http://localhost:3000/api"; 

export async function fetchWithRetry(
    url: string,
    options: RequestInit = {},
    retries = 3,
    delay = 300
): Promise<Response> {
    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response;
        } catch (error) {
            if (attempt === retries - 1) {
                throw error;
            }
            // Exponential backoff before retrying
            await new Promise((resolve) =>
                setTimeout(resolve, delay * Math.pow(2, attempt))
            );
        }
    }
    throw new Error("Unreachable code");
}