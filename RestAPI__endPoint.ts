//! ___________________ RestApi EndPoint_________________

const LoginRegistrationAPI = {
  Registration: {
    method: "POST",
    url: "http://localhost:4001/api/v1/sign-up/email",
  },
  Login: {
    method: "POST",
    url: "http://localhost:4001/api/v1/sign-in/email",
  },
};

const admin___API = {
  adminLogin: {
    email: "admin@gmail.com",
    password: "12345678",
  },
  Get_All_User: {
    method: "GET",
    url: "http://localhost:4001/api/v1/users",
  },
};
