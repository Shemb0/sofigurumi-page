import { combineReducers } from "redux";
import auth from "./auth";
import Alert from "./alert";
import Categories from "./categories";
import Products from "./products";
import Cart from "./cart";
import Payment from "./payment";
import Profile from "./profile";
import Orders from "./orders"
import Reviews from "./reviews";
import Wishlist from "./wishlist";


export default combineReducers({
 auth,
 Alert,
 Categories,
 Products,
 Cart,   
 Payment,
 Profile,
 Orders,
 Reviews,
 Wishlist,
    
})