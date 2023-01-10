let myLeads = [];

const inputEl = document.getElementById("input-el");
const InputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("input-btn-cancel");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("input-tab-btn");

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

// if theres an array in our localStorage then we can render it out, if theres not key in our localStorage then we have null values,
// then what do we do inthese two cases,if null meaning thers no leads,then nothing, but if we have leads then we need first set myLeads array to leadsFromLocalStorage then call the renderLeads()
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
    <li>
        <a target="_blank" href>
        ${leads[i]}
        </a>
    </li>`;
  }
  ulEl.innerHTML = listItems;
}

// when double clicked clear localStorage,myLeads and the DOM
deleteBtn.addEventListener("dblclick", function () {
  myLeads = [];
  localStorage.clear();
  render(myLeads);
});

InputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  render(myLeads);
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
});
