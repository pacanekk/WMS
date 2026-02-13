async function addProduct() {
    const name = document.getElementById("name").value
    const desc = document.getElementById("desc").value
    const stock = 0


    const response = await fetch(`http://localhost:3000/addProduct/${name}/${desc}/${stock}`)
    const json = await response.json()

    if(json.status=="error") {
        document.getElementById("status").innerHTML = "Nie Dodano"
    } else {
        document.getElementById("status").innerHTML = "Dodano"
    }
}
