export default {

  login: (user) => {
    return fetch("https://dating-app-clone.herokuapp.com/user/login", {
      method: "post",
      credentials: 'include',
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return res.json().then((data) => data);
    });
  },
  register: (user) => {
    return fetch("https://dating-app-clone.herokuapp.com/user/register", {
      method: "post",
      credentials: 'include',
      body: JSON.stringify(user),
      redirect: 'follow',
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },
  logout: () => {
    return fetch("https://dating-app-clone.herokuapp.com/user/logout", {
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => data);
  },
  isAuthenticated: () => {
    console.log('인증시도')
    // 리액트가 꺼져도 인증 세션이 사라지지않도록
    return fetch(
      "https://dating-app-clone.herokuapp.com/user/authenticated", {
        credentials: 'include',
      }
    ).then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else return { isAuthenticated: false, user: { username: "", role: "" } };
    });
  },
};
