const baseURL = "https://developer.nps.gov/api/v1/";
const apiKey = import.meta.env.VITE_API_KEY;


export async function getParkData() {
  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
    },
  };

  let data = {};
  try {
    const response = await fetch(baseURL + "parks" + "?parkCode=acad", options);
    if (response.ok) {
      data = await response.json();
    } else {
      const errText = await response.text();
      throw new Error(`API Error ${response.status}: ${response.statusText}. Details: ${errText}`);
    }
    return data.data[0];
  } catch (err) {
    throw err;
  }
}
