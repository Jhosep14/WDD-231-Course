fetch("https://developer.nps.gov/api/v1/visitorcenters?parkCode=acad", {
  headers: { "X-Api-Key": "BrDauMFYYhtPqgrSpFH9oEEkt5w3qGTigacy5tC8" }
})
.then(res => res.json())
.then(data => {
  data.data.forEach(c => {
    console.log(c.name, c.images ? c.images.length : 0);
  });
});
