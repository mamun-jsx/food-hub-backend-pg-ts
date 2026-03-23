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
// =========================| Provider | =====================
const PROVIDER__API = {
  provider__Login: {
    email: "provider@gmail.com",
    password: "12345678",
  },
  POST: {
    url_FOR_Profile_create: "http://localhost:4001/api/provider/profile",
    url_for_Add_Meal: "http://localhost:4001/api/provider/meals",
    url_for_update_Meal: "http://localhost:4001/api/provider/meals/:id",
    url_for_delete_Meal: "http://localhost:4001/api/provider/meals/:id",
  },
};
// ==========================| Customer | =========================
const CUSTOMER__API = {
  provider__Login: {
    email: "provider@gmail.com",
    password: "12345678",
  },
  GET: {
    All_MEALS: "http://localhost:4001/api/meals",
    MEAL_by_ID: "http://localhost:4001/api/meals/:id",
    all_provider: "http://localhost:4001/api/providers",
    all_provider_with_Menu_By_Provider_id:
      "http://localhost:4001/api/providers/:id",
    // http://localhost:4001/api/providers/cmn32hsti0000mjzuttwt7qk7
  },
};
// ==========================| ADMIN API | ===========================
const admin___API = {
  adminLogin: {
    email: "admin@gmail.com",
    password: "12345678",
  },
  Get_All_User: {
    method: "GET",
    url: "http://localhost:4001/api/v1/users",
  },
  update_A_User_ROLE: {
    method: "PATCH",
    url: "http://localhost:4001/api/admin/users/:id",
  },
};
