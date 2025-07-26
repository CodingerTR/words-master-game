let form = document.getElementById("form");

form.addEventListener("submit", e => {
    e.preventDefault();
    words.validate(document.getElementById("username").value, document.getElementById("password").value)
})

