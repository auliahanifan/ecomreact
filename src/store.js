import createStore from "unistore";

export const store = createStore({
  cart: 0,
  category: [],
  product: [],
  cartList: [],
  cartTotalPrice: 0,
  logged_in: "",
  user_token: "",
  cartTotalProduct: 0,
  userFullName: "",
  userAddress: "",
  userPhone: "",
  userSex: "",
  username: "",
  userProvince: "",
  userCity: "",
  userDistrict: "",
  userZipCode: ""
});

export const actions = store => ({
  tambahCart: (state, baru) => {
    store.setState({ cart: baru });
  },
  setCategory: (state, baru) => {
    store.setState({ category: baru });
  },
  setProduct: (state, baru) => {
    store.setState({ product: baru });
  },
  setCartList: (state, baru) => {
    store.setState({ cartList: baru });
  },
  setCartTotalPrice: (state, baru) => {
    store.setState({ cartTotalPrice: baru });
  },
  setLoggedIn: (state, baru) => {
    store.setState({ logged_in: baru })
  },
  setUserToken: (state, baru) => {
    store.setState({ user_token: baru })
  },
  setCartTotalProduct: (state, baru) => {
    store.setState({ cartTotalProduct: baru })
  },
  setUserFullName: (state, baru) => {
    store.setState({ userFullName: baru })
  },
  setUserAddress: (state, baru) => {
    store.setState({ userAddress: baru })
  },
  setUserSex: (state, baru) => {
    store.setState({ userSex: baru })
  },
  setUserPhone: (state, baru) => {
    store.setState({ userPhone: baru })
  },
  setUsername: (state, baru) => {
    store.setState({ username: baru })
  },
  setUserProvince: (state, baru) => {
    store.setState({ userProvince: baru })
  },
  setUserCity: (state, baru) => {
    store.setState({ userCity: baru })
  },
  setUserDistrict: (state, baru) => {
    store.setState({ userDistrict: baru })
  },
  setUserZipCode: (state, baru) => {
    store.setState({ userZipCode: baru })
  }
});
