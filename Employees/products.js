async function showAllProducts() {
    console.log("showAllProducts start")

    const response = await fetch("http://localhost:3000/product-list")
    const json = await response.json()

    console.log("product-list response:", json)

    if (json.status !== "OK") return

    const container = document.getElementById("products")

    json.products.forEach(p => {
        const div = document.createElement("div")
        div.className = "product"

        div.innerHTML = `
            <h3>${p.name}</h3>
            <p>${p.desc}</p>
            <strong>Stan magazynowy: ${p.stock}</strong>
        `

        container.appendChild(div)
    })
}

showAllProducts()
