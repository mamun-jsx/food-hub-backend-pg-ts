//! ___________________ RestApi EndPoint_________________

const LoginRegistrationAPI = {
  Registration: {
    method: "POST",
    url: "http://localhost:4001/api/auth/sign-up/email",
  },
  Login: {
    method: "POST",
    url: "http://localhost:4001/api/auth/sign-in/email", // !! DONE
  },
  LogOut: {
    method: "POST",
    url: "http://localhost:4001/api/v1/sign-out", // ! DONE
  },
};
// =========================| Provider | =====================
const PROVIDER__API = {
  provider__Login: {
    email: "provider@gmail.com",
    password: "12345678",
  },
  POST: {
    url_FOR_Profile_create: "http://localhost:4001/api/provider/profile", //DONE
    url_for_Add_Meal: "http://localhost:4001/api/provider/meals", // DONE
  },

  PUT: {
    url_for_update_Meal: "http://localhost:4001/api/provider/meals/:id", //DONE
  },
  PATCH: {
    url_for_Update_Status: "http://localhost:4001/api/provider/orders/:id", //done
  },
  DELETE: {
    url_for_delete_Meal: "http://localhost:4001/api/provider/meals/:id", //DONE
  },
};
// ==========================| Customer | =========================
const CUSTOMER__API = {
  provider__Login: {
    email: "provider@gmail.com",
    password: "12345678",
  },
  GET: {
    All_MEALS: "http://localhost:4001/api/meals", //! DONE
    MEAL_by_ID: "http://localhost:4001/api/meals/:id", //! DONE
    all_provider: "http://localhost:4001/api/providers", //! DONE
    all_provider_with_Menu_By_Provider_id: //done
      "http://localhost:4001/api/providers/:id", //!DONE
    // http://localhost:4001/api/providers/cmn32hsti0000mjzuttwt7qk7
    get_All_orders: "http://localhost:4001/api/orders", //done
    get_orders_details: "http://localhost:4001/api/orders/:id",
    get_A_Provider: "http://localhost:4001/api/get-provider/:id", //! DONE
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
    GET_ALL_USERS: "http://localhost:4001/api/admin/users", //! DONE
    Get_ALL_ORDERS: "http://localhost:4001/api/admin/orders", //! DONE
  },
  update_A_User_ROLE: {
    method: "PATCH",
    url: "http://localhost:4001/api/admin/users/:id", //! DONE
  },
};
