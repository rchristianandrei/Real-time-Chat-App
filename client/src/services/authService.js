export async function login(username, password) {
  const data = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });

  const json = await data.json();

  console.log(data.status());

  sessionStorage.setItem("user", res);
}
