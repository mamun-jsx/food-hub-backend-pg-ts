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
  },

  PUT: {
    url_for_update_Meal: "http://localhost:4001/api/provider/meals/:id",
  },
  PATCH: {
    url_for_Update_Status: "http://localhost:4001/api/provider/orders/:id", //order id
  },
  DELETE: {
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
    get_All_orders: "http://localhost:4001/api/orders",
    get_orders_details: "http://localhost:4001/api/orders/:id",
  },

  POST: {
    PLACE_ORDER: "http://localhost:4001/api/orders",
    // take form data as req.body { userId, status, totalPrice, address } = req.body;
    POST_REview: "http://localhost:4001/api/reviews",
    //const { userId, mealId, rating, comment } = req.body;
  },
};
// ==========================| ADMIN API | ===========================
const admin___API = {
  adminLogin: {
    email: "admin@gmail.com",
    password: "12345678",
  },
  ADMIN_GET: {
    method: "GET",
    GET_ALL_USERS: "http://localhost:4001/api/v1/users",
    Get_ALL_ORDERS: "http://localhost:4001/api/admin/orders",
  },
  update_A_User_ROLE: {
    method: "PATCH",
    url: "http://localhost:4001/api/admin/users/:id",
  },
};
