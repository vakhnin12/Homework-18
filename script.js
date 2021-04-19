let page = 1

fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        throw new Error(res.statusText);
    })
    .then(data => {
        createChangeList(data)
        renderPosts(data);
    })
    .catch(error => console.error("CATCH ERROR", error));


function renderPosts(data) {
    const container = document.createElement("div")
    const list = document.createElement("ul");
    list.className = "list"

    for (const index in data.results) {
        const li = document.createElement("li");
        li.innerText = data.results[index].name;
        list.appendChild(li)
    }
    container.appendChild(list);

    document.body.appendChild(container);
}

function changePosts(data) {
    const list = document.querySelector(".list");
    if (list.hasChildNodes()) {
        const children = list.childNodes;

        for (i = 0; i < children.length; i++) {
            children[i].innerText = data.results[i].name;
            if (children.length > data.results.length) {
                for (j = 0; j < children.length - data.results.length; j++)
                    list.removeChild(children[j + data.results.length])
            } else if (children.length < data.results.length) {
                for (j = 0; j < data.results.length - children.length; j++) {
                    const li = document.createElement("li");
                    list.appendChild(li)
                }
            }
        }
    }
}

function createButton(text, classes, id) {
    const button = document.createElement("button");

    button.type = "button";
    button.className = classes;
    button.innerText = text;
    button.id = id

    return button;
};

function createChangeList(data) {
    const container = document.createElement("div")

    container.innerText = "Choose Page"
    container.className = "buttons-list"
    const list = document.createElement("ul");
    list.className = "lists"
    list.hidden = true

    container.onclick = function () {
        list.hidden = !list.hidden;
    }



    for (i = 0; i < data.info.pages; i++) {
        const listElement = document.createElement("li");
        listElement.className = "button-container"
        const button = createButton(`Page #${i + 1}`, "button", i + 1)

        button.addEventListener("click", function () {
            const page = button.id
            fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    throw new Error(res.statusText);
                })
                .then(data => {
                    changePosts(data)
                })
                .catch(error => console.error("CATCH ERROR", error));
        })

        list.appendChild(listElement);
        listElement.appendChild(button)
    }
    container.appendChild(list)
    document.body.appendChild(container)
}
