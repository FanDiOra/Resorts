///import { getGraphData } from "./query.js";
const URL = "https://fd-api-graphql.deta.dev/graphql"

window.onload = function() {
    console.log("Chargement de la page");

    let ville = window.localStorage.getItem("ville");

    console.log(ville);

    if(ville!=null) {
        document.querySelector("#ville").innerHTML = ville;
        getAttractionByPlace(ville);
    }

    else {
        window.location.href="attraction.html"
    }
}

function getAttractionByPlace(ville) {
      fetch(URL, {
      method: 'POST',
      body: JSON.stringify({
        query: ` query($name: String) {
            places(where: { name: $name }) {
               attractions{
                name
              }
            }
          }`,
        variables: {
          name: ville
        }
      }),
      headers: {
          'content-type': 'application/json'
      }
    }).then(async (data) => {
        const attractions = (await data.json())['data']['places'][0]['attractions'];
        console.log(attractions);
        displayResortData(attractions)
    });
   
}


/**
 * Cette fonction charge les données d'un tableau et
 * affiche dans la page
 * @param {Array} data 
 */
function displayResortData(data) {

    const table = document.getElementById('attractionsTable');
    const tbody= document.getElementById("attractionsBody")

    for (const attraction of data) {
        const row = document.createElement("tr");
        
        row.innerHTML = 
        `<tr>
            <td>${attraction.name}</td>
        </tr>`
        tbody.append(row);
    }
    document.getElementById('countAttraction').innerHTML = data.length;
}