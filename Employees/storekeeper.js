async function showAllProducts() {
    const response = await fetch("http://localhost:3000/product-list")
    const json = await response.json()

    if (json.status !== "OK") return

    const container = document.getElementById("products")
    container.innerHTML = ""

    json.products.forEach(p => {
        const div = document.createElement("div")

        div.innerHTML = `
            <h3>${p.name}</h3>
            <p>${p.desc}</p>
            <strong>Stan: ${p.stock}</strong>

            <div id="checks">
                <input type="radio" name="choice-${p.ID}" value="add" class="radio"> Dodaj
                <input type="radio" name="choice-${p.ID}" value="subtract" class="radio"> Usuń
            </div>

            <input type="number" id="quantity-${p.ID}">
            <button onclick="editStock(${p.ID})">
                Zmień ilość
            </button>

            <button onclick="remProduct(${p.ID})">
                Usuń Produkt
            </button>
        `


        container.appendChild(div)
    })
}

showAllProducts()

async function remProduct(ID) {
    await fetch(
        `http://localhost:3000/remProduct/${ID}`
    )
    showAllProducts()
}

async function editStock(ID) {
    const quantity = Number(
        document.getElementById(`quantity-${ID}`).value
    )

    const choice = document.querySelector(`input[name="choice-${ID}"]:checked`)?.value

    if (!choice || quantity <= 0) return

    await fetch(
        `http://localhost:3000/changeStock/${ID}/${choice}/${quantity}`
    )

    showAllProducts()
}


