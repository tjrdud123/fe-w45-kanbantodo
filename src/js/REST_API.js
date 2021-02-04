const URL = JSON_SERVER_URL;

export async function getData(type, query) {
  let url = `${URL}/${type}`;
  if (query) {
    url += "?";
    for (let key in query) url += `${key}=${query[key]}&`;
  }
  try {
    const res = await fetch(url);
    const resData = await res.json();
    if (res.status !== 200) throw new Error("error");

    return resData;
  } catch (err) {
    console.error(err);
  }
}

export async function deleteData(type, id) {
  let url = `${URL}/${type}/${id}`;
  try {
    const res = await fetch(url, {
      method: "DELETE",
    });
    if (res.status !== 200) throw new Error("error");
  } catch (err) {
    console.error(err);
  }
}

export async function postData(type, data) {
  let url = `${URL}/${type}`;
  try {
    const res = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status !== 201) throw new Error("error");
  } catch (err) {
    console.error(err);
  }
}

export async function putData(type, data) {
  let url = `${URL}/${type}/${data.id}`;
  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status !== 200) throw new Error("error");
  } catch (err) {
    console.error(err);
  }
}

export async function patch(type, data) {
  let url = `${URL}/${type}/${data.id}`;
  try {
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status !== 200) throw new Error("error");
  } catch (err) {
    console.error(err);
  }
}
