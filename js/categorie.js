///import { getGraphData } from "./query.js";
 const URL = "https://fd-api-graphql.deta.dev/graphql"

window.onload = function() {
    console.log("Chargement de la page");

    let category = window.localStorage.getItem("categorie");

    document.querySelector("#category").innerHTML = category
    console.log(category);

    if(category!=null) {
        getResortByCategory(category);
    }

    else {
        window.location.href="resort.html"
    }
}

function getResortByCategory(categorie) {
      fetch(URL, {
      method: 'POST',
      body: JSON.stringify({
        query: ` query($name : String) {
          categories(where: { name: $name }) {
            resortCategories {
              name
              address
            }
          }
        }`,
        variables: {
          name: categorie
        }
      }),
      headers: {
          'content-type': 'application/json'
      }
    }).then(async (data) => {
        const resorts = (await data.json())['data']['categories'][0]['resortCategories'];
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

    const table = document.getElementById('resortByCategoriesTable');
    const tbody= document.getElementById("resortByCategoriesBody")

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