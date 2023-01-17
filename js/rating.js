///import { getGraphData } from "./query.js";
const URL = "https://fd-api-graphql.deta.dev/graphql"

window.onload = function() {
    console.log("Chargement de la page");

    let rating = parseFloat(window.localStorage.getItem("rating"));  

    document.querySelector("#rating").innerHTML = rating
    console.log(rating);

    if(rating!=null) {
        getResortByRating(rating);
    }

    else {
        window.location.href="resort.html"
    }
}

function getResortByRating(rating) {
      fetch(URL, {
      method: 'POST',
      body: JSON.stringify({
        query: ` query($ratingNote: Float) {
            ratings(where: { rating: $ratingNote }) {
              resortRating {
                name
                address
              }
            }
          }`,
        variables: {
          ratingNote: rating
        }
      }),
      headers: {
          'content-type': 'application/json'
      }
    }).then(async (data) => {
        const resorts = (await data.json())['data']['ratings'][0]['resortRating'];
        console.log(resorts);
        displayResortData(resorts)
    });
   
}


/**
 * Cette fonction charge les données d'un tableau et
 * affiche dans la page
 * @param {Array} data 
 */
function displayResortData(data) {

    const table = document.getElementById('resortByRatingsTable');
    const tbody= document.getElementById("resortByRatingsBody")

    for (const resort of data) {
        const row = document.createElement("tr");
        
        row.innerHTML = 
        `<tr>
            <td>${resort.name}</td>
            <td>${resort.address}</td>
        </tr>`
        tbody.append(row);
    }
    document.getElementById('countResort').innerHTML = data.length;
}