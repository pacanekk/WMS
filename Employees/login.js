async function log() {
    const login = document.getElementById("login").value
    const pass = document.getElementById("pass").value

    const response = await fetch(`http://localhost:3000/log/${login}/${pass}`)
    const json = await response.json()

    if(json.status=="OK") {
        localStorage.setItem("status", JSON.stringify(json))
        window.location.reload()
    } else {
        document.getElementById("status").innerHTML = "notOK"
    }
    window.location.reload()
}

function lCheck() {
    const status = JSON.parse(localStorage.getItem("status"))
    console.log(status)
    const location = window.location.hrefp

    if (status?.status == "OK") {
        window.location.href = "main.html"
    }
}

lCheck()