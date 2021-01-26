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

export async function deleteData(type, query) {

}

export async function postData(type, data) {
  
}

export async function putData(type, data) {

}
