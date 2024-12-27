export const runScript = async (): Promise<{
  uniqueID: string;
  trends: string[];
  timestamp: string;
  ipAddress: string;
}> => {
  const response = await fetch("http://localhost:5000/api/trends/run", {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return response.json();
};
