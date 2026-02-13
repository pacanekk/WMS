async function reg() {
    const name = document.getElementById("name").value
    const sname = document.getElementById("sname").value
    const login = document.getElementById("login").value
    const pass = document.getElementById("pass").value
    const perms = document.getElementById("perms").value

    const response = await fetch(`http://localhost:3000/reg/${name}/${sname}/${login}/${pass}/${perms}`)
    const json = await response.json()

    if(json.status=="error") {
        document.getElementById("status").innerHTML = "Nie Dodano"
    } else {
        document.getElementById("status").innerHTML = "Dodano"
    }
}