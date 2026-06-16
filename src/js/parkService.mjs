const baseURL = "https://developer.nps.gov/api/v1/";
const apiKey = import.meta.env.VITE_API_KEY;


export async function getParkData() {
  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
    },
  };

  const response = await fetch(baseURL + "parks" + "?parkCode=cany", options);
  if (response.ok) {
    const data = await response.json();
    return data.data[0];
  } else {
    const errText = await response.text();
    throw new Error(`API Error ${response.status}: ${response.statusText}. Details: ${errText}`);
  }
}

export async function getConditionsData() {
  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
    },
  };

  try {
    const [alertsResponse, vcResponse] = await Promise.all([
      fetch(baseURL + "alerts" + "?parkCode=cany", options),
      fetch(baseURL + "visitorcenters" + "?parkCode=cany", options)]);

    const alertsData = alertsResponse.ok ? await alertsResponse.json() : { data: [] };
    const vcData = vcResponse.ok ? await vcResponse.json() : { data: [] };
    return { alertsData, vcData };
  } catch (err) {
    console.error("Error fetching data!");
    throw err;
  }
}




