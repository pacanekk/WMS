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

            <button onclick="sell(${p.ID})">
                Sprzedano
            </button>
            <button onclick="returned(${p.ID})">
                Zwrócono
            </button>
        `
        container.appendChild(div)
    })
}

showAllProducts()

async function sell(ID) {
    const quantity = 1
    const choice = "subtract"

    await fetch(
        `http://localhost:3000/changeStock/${ID}/${choice}/${quantity}`
    )

    showAllProducts()
}

async function returned(ID) {
    const quantity = 1
    const choice = "add"

    await fetch(
        `http://localhost:3000/changeStock/${ID}/${choice}/${quantity}`
    )

    showAllProducts()
}