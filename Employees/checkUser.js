function check() {
    const status = JSON.parse(localStorage.getItem("status"))
    console.log(status)
    const location = window.location.href

    if (status?.status !== "OK") {
        window.location.href = "index.html"
    }

    if (location.includes("storekeeper.html") && (status?.perms !== "admin" && status?.perms !== "storekeeper")) {
        window.location.href = "main.html"
    }

    if (location.includes("employee.html") && (status?.perms !== "admin" && status?.perms !== "employee")) {
        window.location.href = "main.html"
    }

    if (location.includes("admin.html") && status?.perms !== "admin") {
        window.location.href = "main.html"
    }
}

check()