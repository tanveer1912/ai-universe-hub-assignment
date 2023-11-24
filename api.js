const loadApi = async (dataLimit) => {
    const url = 'https://openapi.programming-hero.com/api/ai/tools'
    const res = await fetch(url)
    const data = await res.json()
    getApi(data.data.tools, dataLimit);
}
const getApi = (tools, dataLimit) => {

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    const seeMoreBtn = document.getElementById('see-more')
    if (dataLimit && tools.length > 6) {
        tools = tools.slice(0, 6)
        seeMoreBtn.classList.remove('d-none')
    }
    else {
        seeMoreBtn.classList.add('d-none')
    }

    tools.forEach(tool => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col')
        cardDiv.innerHTML = `
        <div class="card h-100 p-3">
          <img src="${tool.image ? tool.image : 'IMG_20211225_170810.jpg'}" class="card-img-top"  alt="...">
            <div class="card-body">
              <h5 class="card-title">Features</h5>
              <ol>
                 <li>${tool.features[0]}</li>
                 <li>${tool.features[1]}</li>
                 <li>${tool.features[2]}</li>
              </ol>
            </div>
            <hr>
           <div class = "d-flex justify-content-between">
              <div>
                 <h5>${tool.name}</h5>
                 <p><i class="fa-regular fa-calendar-days pe-2"></i>${tool.published_in}</p>
              </div>
                 
              <button onclick="showDetails('${tool.id}')" type="button" class="details-button"   data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <i class="fa-solid fa-arrow-right"></i>
              </button>
          
            </div>
        </div>
        `;
        cardContainer.appendChild(cardDiv)
    });
    toggleSpinner(false)
}

const showDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(url)
    const data = await res.json()
    showDetailsInModal(data.data);
}
// Show Details in Modal
const showDetailsInModal = data => {

    // Get modal div
    const price1 = document.getElementById('price1');
    const price2 = document.getElementById('price2');
    const price3 = document.getElementById('price3');

    // Set Modal Description
    const modalTitle = document.getElementById('staticBackdropLabel')
    modalTitle.innerHTML = `
    <p>${data.description}</p>
    `;

    // Show Price Instead No Cost
    if (data.pricing[0].price === '0' || data.pricing[0].price === 'No cost') {
        price1.innerHTML = `<p>${data.pricing[0].price.innerText = 'Free of Cost/'} <br> ${data.pricing[0].plan.innerText = 'Basic'}</p>`

        if (data.pricing[1].price === 'No cost') {
            price2.innerHTML = `<p>${data.pricing[1].price.innerText = 'Free of Cost/'} <br> ${data.pricing[1].plan.innerText = 'Pro'}</p>`
        }
        else {
            price2.innerHTML = `
            <p>${data.pricing[1].price} <br> ${data.pricing[1].plan}</p>
            `

            price3.innerHTML = `
    <p>${data.pricing[2].price} <br> ${data.pricing[2].plan}</p>
    `
        }


    }

    // Show Price and Plan
    else {
        price1.innerHTML = `<p>${data.pricing[0]?.price} <br> ${data.pricing[0].plan}</p>`

        price2.innerHTML = `
    <p>${data.pricing[1].price} <br> ${data.pricing[1].plan}</p>
    `
        price3.innerHTML = `
    <p>${data.pricing[2].price} <br> ${data.pricing[2].plan}</p>
    `
    }

    // Features in Modal
    document.getElementById('features').innerHTML = `
<ul>
        <li>${data.features[1].feature_name}</li>
        <li>${data.features[2].feature_name}</li>
        <li>${data.features[3].feature_name}</li>
    </ul>
`;

    // Integrations in Modal
    document.getElementById('Integrations').innerHTML = `
    <ul>
        <li>${data.integrations[0] ? data.integrations[0] : 'No Data Found'}</li>
        <li>${data.integrations[1] ? data.integrations[1] : 'No Data Found'}</li>
        <li>${data.integrations[2] ? data.integrations[2] : 'No Data Found'}</li>
    </ul>
    `
    // Image in Modal
    document.getElementById('modal-image-container').innerHTML = `
    <img class = "img-fluid" src="${data.image_link[0]}" alt="" srcset="">
    `
    // Accuracy
    const accuracyContainer = document.getElementById('accuracy')
    accuracyContainer.innerHTML = `
    <p>${data.accuracy.score ? data.accuracy.score + ' Accuracy' : ''}</p>
    `
    // Show Input Output Data in Modal
    document.getElementById('text-container').innerHTML = `
    <h4>${data.input_output_examples[0].input}</h4>
    <p>${data.input_output_examples[0].output}</p>
    `
}


// See More
document.getElementById('see-more-btn').addEventListener('click', function () {
    loadApi()

})


// Spinner
const toggleSpinner = isSpin => {
    const spinnerContainer = document.getElementById('spinner')
    if (isSpin) {
        spinnerContainer.classList.remove('d-none')
    }
    else {
        spinnerContainer.classList.add('d-none')
    }
}


loadApi(6)
toggleSpinner(true)
