const pages = [
    {href: "main.html", title: "Strona Główna"},
    {href: "employee.html", title: "Pracownik"},
    {href: "storekeeper.html", title: "Magazynier"},
    {href: "admin.html", title: "Panel Administracyjny"}
]

const st = JSON.parse(localStorage.getItem("status"))

function menu() {
        const titl = document.createElement("h1")
        const status = JSON.parse(localStorage.getItem("status"))

        titl.innerHTML = "Warehouse Management System"
        document.getElementById("title").appendChild(titl)

        for(let i=0; i<=pages.length-1; i++) {
            if (i == 1 && (status?.perms !== "admin" && status?.perms !== "employee")) {
                continue;
            } else if(i == 2 && (status?.perms !== "admin" && status?.perms !== "storekeeper")) {
                continue;
            } else if(i == 3 && (status?.perms !== "admin")) {
                continue;
            } else {
                const a = document.createElement("a")
                a.setAttribute("href", pages[i].href)
                a.innerHTML = pages[i].title
                document.getElementById("menu_").appendChild(a)
            }

            
        }

        const p = document.createElement("p")
        p.innerHTML = `Witaj ${st?.login}`
        document.getElementById("hello").appendChild(p)
}

function logout() {
        if (st?.status == "OK") {
            const button = document.createElement("button")
            button.innerHTML = "Wyloguj"

            button.addEventListener("click", () => {
                localStorage.removeItem("status")
                window.location.reload()
            })

            document.getElementById("logout").appendChild(button)
        }
}

logout()
menu()