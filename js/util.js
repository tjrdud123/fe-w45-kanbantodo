const URL = "http://127.0.0.1:3000"; // 하드 코딩 안하는법 알아보기

export async function getData(type, query) {
  let url = `${URL}/${type}`;
  if (query) {
    url += "?";
    for (let key in query) url += `${key}=${query[key]}&`;
  }
  const res = await fetch(url);
  const resData = await res.json();
  return resData;
}

export async function deleteData(type, id) {
  let url = `${URL}/${type}/${id}`;
  const res = await fetch(url, {
    method: "DELETE"
  });
}

export async function postData(type, data) {
  let url = `${URL}/${type}`;
  const res = await fetch(url, {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
}

export async function putData(type, data) {
  let url = `${URL}/${type}/${data.id}`;
  fetch(url, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
}
