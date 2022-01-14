function BootTemplate(car) {
    return `<td> ${car.owner} </td>
              <td> ${car.mark}</td>
              <td> ${car.number}</td>
              <td> ${car.colour}</td>
              <td> <button onclick="RemoveCar(${car.id})"> Вилучити </button> </td>`;
  }
  
  function RenderCarList(list, parent) {
    parent.innerHTML = "";
    for (let car of list) {
      let tr = document.createElement("tr");
      tr.innerHTML = BootTemplate(car);
      parent.appendChild(tr);
    }
  }
  
  async function Render() {
    try {
      let cars = await Load();
      RenderCarList(cars, document.getElementById("cars"));
    } catch (e) {
      alert(e);
    }
  }
  
  async function RemoveCar(id) {
    try {
      let removedcar = await Remove(id);
      await Render();
      alert(`Вилучено ${JSON.stringify(removedcar)}`);
    } catch (e) {
      alert(e);
    }
  }
  
  async function NewCar(event) {
    try {
      event.preventDefault();//-----------------------------------------------------
      let data = Object.fromEntries (new FormData(document.forms["newCarForm"]));
      let newCar = await Add(data);
      await Render();
      alert(`Додано ${JSON.stringify(newCar)}`);
    } catch (e) {
      alert(e);
    }
  }
  
  /*-----*/
  document.getElementById("addCar").onclick = NewCar;
  Render();
  alert("Render car list")
  console.log("Render car list")