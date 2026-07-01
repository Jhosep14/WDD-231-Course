const baseURL = "https://developer.nps.gov/api/v1/";
const apiKey = import.meta.env.VITE_API_KEY;
const parkCode = "caha";
async function getJson(endpoint) {
  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
    },
  };

  const response = await fetch(baseURL + endpoint, options);
  if (response.ok) {
    return await response.json();
  } else {
    const errText = await response.text();
    throw new Error(`API Error ${response.status}: ${response.statusText}. Details: ${errText}`);
  }
}

export async function getParkData() {
  const data = await getJson(`parks?parkCode=${parkCode}`);
  return data.data[0];
}

export async function getConditionsData() {
  try {
    const [alertsData, vcData] = await Promise.all([
      getJson(`alerts?parkCode=${parkCode}`),
      getJson(`visitorcenters?parkCode=${parkCode}`)
    ]);

    return { alertsData, vcData };
  } catch (err) {
    console.error("Error fetching data!");
    throw err;
  }
}

export async function getVisitorCentersData(id) {
  const data = await getJson(`visitorcenters?id=${id}`);
  return data.data;
}
