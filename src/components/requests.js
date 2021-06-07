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

  return fetch("/login", requestOptions)
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

async function markPanel(scorePanel, id) {
  let authorization = "Bearer " + localStorage.getItem("token");
  let myHeaders = new Headers();
  myHeaders.append("authorization", authorization);
  myHeaders.append("Content-Type", "application/json");
  let body = JSON.stringify({
    score: scorePanel,
  });
  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: body,
    redirect: "follow",
  };
  fetch("/panels/" + id, requestOptions)
    .then((res) => res.json())
    .then((data) => {
      return ["success", data];
    })
    .catch((error) => {
      return ["error", error];
    });
}

async function changeAccData(data, value, confirm) {
  let authorization = "Bearer " + localStorage.getItem("token");
  let myHeaders = new Headers();
  myHeaders.append("authorization", authorization);
  myHeaders.append("Content-Type", "application/json");
  let raw;
  switch (data) {
    case "mail":
      raw = JSON.stringify({
        login: `${localStorage.getItem("user")}`,
        newMail: `${value}`,
      });
      break;
    case "password":
      raw = JSON.stringify({
        login: `${localStorage.getItem("user")}`,
        newPassword: `${value}`,
      });
      break;
    case "login":
      raw = JSON.stringify({
        login: `${localStorage.getItem("user")}`,
        newLogin: `${value}`,
      });
      break;
    case "name":
      raw = JSON.stringify({
        login: `${localStorage.getItem("user")}`,
        newName: `${value}`,
      });
      break;
    case "surname":
      raw = JSON.stringify({
        login: `${localStorage.getItem("user")}`,
        newSurname: `${value}`,
      });
      break;
    default:
      raw = JSON.stringify({
        login: `${localStorage.getItem("user")}`,
        newSurname: `${value}`,
      });
  }

  let requestOptions = {
    method: "POST",
    body: raw,
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`/accounts/${data}`, requestOptions)
    .then((res) => {
      if (res.status === 200 || res.status === 201) {
        if (data === "login") localStorage.setItem("user", value);
        confirm();
      } else {
        throw Error(res.statusText);
      }
    })
    .catch((error) => console.log(error));
}

export { postData, changeAccData, markPanel };
