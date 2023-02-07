function createTable(name, data) {
  const table = document.createElement("table");
  const caption = table.createCaption();
  const tBody = table.createTBody();
  const tHead = table.createTHead();
  const form = document.createElement("form");
  let isHeadCreated = false;
  data.forEach((el, index, arr) => {
    const row = tBody.appendChild(document.createElement("tr"));
    Object.keys(el).map((key) => {
      if (!isHeadCreated) {
        const col = document.createElement("th");
        col.innerHTML = `<th>${key}</th>`;
        tHead.appendChild(col);
        const formLabel = document.createElement("label");
        const formInput = document.createElement("input");
        formLabel.innerHTML = key;
        formInput.name = key;
        form.appendChild(formLabel);
        form.appendChild(formInput);
      }
      const tableItem = document.createElement("td");
      tableItem.innerHTML = el[key];
      row.appendChild(tableItem);
    });
    isHeadCreated = true;
    const deleteButton = document.createElement("button");
    deleteButton.addEventListener("click", async () => {
      axios.post(`/delete/${name}`, { ...el });
    });
    deleteButton.innerHTML = "X";
    caption.innerHTML = `<b>${name}</b>`;
    row.appendChild(deleteButton);
  });
  document.body.appendChild(table);
  const formButton = document.createElement("button");
  formButton.addEventListener("click", (e) => {
    e.preventDefault();
    axios.post(
      `/add/${name}`,
      Object.keys(data[0]).map((it) => {
        return { [it]: form[it].value };
      })
    );
  });
  formButton.type = "submit";
  formButton.innerHTML = "Submit";
  form.appendChild(formButton);
  document.body.appendChild(form);
  return;
}

axios.get("/patient").then((data) => {
  console.log(data.data);
  createTable("patient", data.data);
});
axios.get("/Bill").then((data) => {
  //   console.log(data.data);
  createTable("Bill", data.data);
});
axios.get("/Department").then((data) => {
  //   console.log(data.data);
  createTable("Department", data.data);
});
axios.get("/Doctor").then((data) => {
  //   console.log(data.data);
  createTable("Doctor", data.data);
});
axios.get("/given").then((data) => {
  //   console.log(data.data);
  createTable("given", data.data);
});
axios.get("/Medicine").then((data) => {
  //   console.log(data.data);
  createTable("Medicine", data.data);
});
axios.get("/Assign").then((data) => {
  //   console.log(data.data);
  createTable("Assign", data.data);
});
axios.get("/Records").then((data) => {
  //   console.log(data.data);
  createTable("Records", data.data);
});
axios.get("/room").then((data) => {
  //   console.log(data.data);
  createTable("room", data.data);
});
axios.get("/treats").then((data) => {
  //   console.log(data.data);
  createTable("treats", data.data);
});
