const url = "http://localhost:8080";

async function postData(username, password) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let body = JSON.stringify({
    login: `${username}`,
    password: `${password}`,
  });

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: body,
    redirect: "follow",
  };

  return fetch("http://localhost:8080/login", requestOptions)
    .then((response) => {
      if (response.status === 500) throw Error(response.statusText);
      return response.text();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return null;
    });
}

async function fetchAllConferences() {
  fetch(url + "/conferences")
    .then((res) => res.json())
    .then((data) => {
      return ["success", data];
    })
    .catch((error) => {
      return ["error", error];
    });
}

async function fetchUserConferences() {
  fetch(url + "/conferences" + localStorage.getItem("id"))
    .then((res) => res.json())
    .then((data) => {
      return ["success", data];
    })
    .catch((error) => {
      return ["error", error];
    });
}

export { postData, fetchAllConferences, fetchUserConferences };
