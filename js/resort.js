const URL = "https://fd-api-graphql.deta.dev/graphql";

function onClickCategorie(categorie) {
    let _categorie = categorie;
    window.localStorage.setItem('categorie' , _categorie);
    window.location.href="resort_categorie.html";
}

function onClickRating(rating) {
    let _rating = rating;
    window.localStorage.setItem('rating' , _rating);
    window.location.href="resort_rating.html";
}

window.onload = function () {
    onLoadMoreResortVisited()
}

function onLoadMoreResortVisited(){
    let graphRequest = `
    query {
        resortMoreVisited {
          name
          address
        }
      }
    `

    const response = fetch(URL, {
        method: 'POST',
        body: JSON.stringify({
        query: graphRequest
        }),
        headers: {
            'content-type': 'application/json'
        }
    }).then(async (data) => {
        const resortMoreVisited = (await data.json())['data']['resortMoreVisited'];
        console.log(resortMoreVisited);
        displayResortData(resortMoreVisited)
    });
}

/**
 * Cette fonction charge les données d'un tableau et
 * affiche dans la page
 * @param {Array} data 
 */
function displayResortData(data) {

    const resortList = document.getElementById('resortMoreVisitedList');
    let dataList = "";

    for (const resort of data) {
        dataList +=
            `<div class="col-md-4 mb-3">
            <div class="card mb-3">
                <img class="card-img-top" src="image/kumarakom.jpeg" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${resort.name}</h5>
                    <p class="card-text">${resort.address}</p>
                </div>
            </div>
        </div>`;
    }

    console.log(dataList);
    
    resortList.innerHTML = dataList;
}