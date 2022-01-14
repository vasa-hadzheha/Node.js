async function Load() {
    let res = await fetch("http://localhost:3000/cars");
    if (!res.ok) throw new Error(res.statusText);
    return await res.json();
  }
  
  async function Remove(id) {
    let res = await fetch(`http://localhost:3000/cars/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(res.statusText);
    return await res.json();
  }
  
  async function Add(car) {
    let res = await fetch("http://localhost:3000/cars", {
      method: "POST",
      body: JSON.stringify(car),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error(res.statusText);
    return await res.json();
  }