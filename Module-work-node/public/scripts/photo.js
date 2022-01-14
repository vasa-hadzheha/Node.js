async function Load(id) {
    let res = await fetch(`http://localhost:3000/photo/${id}`);
    if (res.status == 200) {
        return await res.json();
    }
    return null;
}

async function Show() {
    const id = document.getElementById("num_photo").value;
    const photo = await Load(id);
    if (photo) {
        let k = new Date(photo.published);
    let date = `${k.getDate()}-${("0" + (k.getMonth() + 1)).slice(-2)}-${k.getFullYear()}`
    console.log(k.getDate())
    console.log(("0" + (k.getMonth() + 1)).slice(-2))
    console.log(k.getFullYear())
    console.log(date)

        document.getElementById("photoimg").src = photo.url;
        document.getElementById("phototitle").innerText = photo.title;
        document.getElementById("photolikes").innerText = `Likes:${photo.likes}`;
        document.getElementById("author").innerText = `Автор: ${photo.author}`;
        document.getElementById("descrtiption").innerText = `Опис: ${photo.description}`;
        document.getElementById("hashtags").innerText = `Hashtags: ${photo.hashtags}`;
        document.getElementById("date").innerText = `Опубліковано: ${date}`;

    } else alert("Not Found");
}