document
  .getElementById("issueInputForm")
  .addEventListener("submit", submitIssue);

function submitIssue(e) {
  const getInputValue = (id) => document.getElementById(id).value;
  const description = getInputValue("issueDescription");
  const severity = getInputValue("issueSeverity");
  const assignedTo = getInputValue("issueAssignedTo");
  const id = Math.floor(Math.random() * 100000000) + "";
  const status = "Open";

  const issue = { id, description, severity, assignedTo, status };
  //blank thakle issue add hobe na alert dibe
  for (let key in issue) {
    if (!issue[key]) {
      alert("fields are empty");
      return;
    }
  }
  let issues = [];
  if (localStorage.getItem("issues")) {
    issues = JSON.parse(localStorage.getItem("issues"));
  }
  issues.push(issue);
  localStorage.setItem("issues", JSON.stringify(issues));

  document.getElementById("issueInputForm").reset();
  fetchIssues();
  e.preventDefault(); //The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.

  // For example, this can be useful when:

  // Clicking on a "Submit" button, prevent it from submitting a form
  // Clicking on a link, prevent the link from following the URL
}

const closeIssue = (id) => {
  // console.log("closebtn");
  const issues = JSON.parse(localStorage.getItem("issues"));
  // console.log(id, typeof id);
  const currentIssue = issues.find((issue) => issue.id == id);
  currentIssue.status = "Closed";
  localStorage.setItem("issues", JSON.stringify(issues));
  fetchIssues();
};

const deleteIssue = (id) => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  // console.log(id);
  const remainingIssues = issues.filter((issue) => issue.id != id); //(== silo jakhon takhon type saho check korte silo tai ekta =)
  localStorage.setItem("issues", JSON.stringify(remainingIssues));
  fetchIssues(); // call korasilo na
};

const fetchIssues = () => {
  // alert("Page is loaded");
  const issues = JSON.parse(localStorage.getItem("issues"));
  // console.log(issues);
  const issuesList = document.getElementById("issuesList");
  issuesList.innerHTML = "";
  // local storage e to r start e length thake na tai condion dite hobe
  if (Array.isArray(issues)) {
    for (var i = 0; i < issues.length; i++) {
      const { id, description, severity, assignedTo, status } = issues[i];
      //প্রতিবার লুপ চলাকালীন একটা করে ইস্যু এর কার্ড তৈরি হবে এবং existing ইস্যুগুলোর সাথে issueList কনটেইনারে append হয়ে যাবে।
      issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <button onclick="closeIssue(${id})" class="btn btn-warning">Close</button>
                              <button  onclick="deleteIssue(${id})" class="btn btn-danger">Delete</button>
                              </div>`; //colse  button e click korle page start e jaito  sei janno a tag and href tule dilam
    }
  }
};
