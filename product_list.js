
// API Endpoint URL with API token
var url = 'https://www.apiexample.com?apiKey=example-api-key';

// Send GET request to API
fetch(url, {
  method: "GET",
  mode: "cors"
})
.catch(() => {
  console.error("Could not reach server");
})
.then((res) => {
  var table = document.getElementById("productList");

  // JSON must be fetched by the response as a promise
  res.json().then((json) => {

    // Loop through products and attach desired data to DOM
    json["products"].forEach((product) => {

      // Create new row for this product
      var tr = document.createElement("tr");

      // Add product name to row
      var nameTd = document.createElement("td");
      var nameNode = document.createTextNode(product["name"]);
      nameTd.appendChild(nameNode);
      tr.appendChild(nameTd);

      // Add thumbnailImage to row if available. Use image, message as fallbacks
      var img = document.createElement("img");
      var imgTd = document.createElement("td");

      if (product["thumbnailImage"]) {
        img.src = product["thumbnailImage"];
        imgTd.appendChild(img);
      } else if (product["image"]) {
        img.src = product["thumbnailImage"];
        imgTd.appendChild(img);
      } else {
        var node = document.createTextNode("No Image Available");
        imgTd.appendChild(node);
      }

      tr.appendChild(imgTd);

      // Add regularPrice to row
      if (product["regularPrice"]) {
        var priceTd = document.createElement("td");
        var priceNode = document.createTextNode("$" + product["regularPrice"]);
        priceTd.appendChild(priceNode);
        tr.appendChild(priceTd);
      }

      // Add shortDescription to row
      if (product["shortDescription"]) {
        var descTd = document.createElement("td");
        var descNode = document.createTextNode(product["shortDescription"]);
        descTd.appendChild(descNode);
        tr.appendChild(descTd);
      }

      // Add row to table
      table.appendChild(tr);
    });
  });
  // Finally, add table to body
  document.body.appendChild(table);
});
