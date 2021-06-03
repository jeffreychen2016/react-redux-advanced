import React from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { uiActions } from "./store/ui-slice";
import { sendCartData } from "./store/cart-slice";
import * as appSetting from "./appSetting";

// to prevent sending empty data to firebase when component first mount (page refreshed)
let isInitial = true;

function App() {
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);

  // again, when use `useSelector`, it automatically subscribe the component to the data store
  // which means, every time the `cart` states change, the App component and its children
  // get re-evaluated
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  // *** IMPORTANT ***
  // we are going to send request
  // whenever the cart changes
  // that means when we click on the + button
  // it will add it to the cart
  // then this component gets re-evaluated since the `cart` state changed
  // then this useEffect add data to the firebase
  useEffect(() => {
    // -------------------------------
    // METHOD 2: use Thunk
    // -------------------------------
    if (isInitial) {
      isInitial = false;
      return;
    }

    // *** IMPORTANT ***
    // the dispatch function in react toolkit
    // not only accept object payload, but also accept action creator function
    // in this case `sendCartData` function (a function that returns action creator function)
    // the react-toolkit will execute the returning function for us
    dispatch(sendCartData(cart));
    // -------------------------------
    // METHOD 1: use useEffect directly
    // -------------------------------
    // const sendCartData = async () => {
    //   // pending
    //   dispatch(
    //     uiActions.showNotification({
    //       status: "pending",
    //       title: "Sending...",
    //       message: "Sending cart data!",
    //     })
    //   );
    //   const response = await fetch(appSetting.firebaseUrlCart, {
    //     method: "PUT",
    //     body: JSON.stringify(cart),
    //   });
    //   if (!response.ok) {
    //     // error
    //     dispatch(
    //       uiActions.showNotification({
    //         status: "error",
    //         title: "Error!",
    //         message: "Sending cart data failed!",
    //       })
    //     );
    //     throw new Error("Sending cart data failed.");
    //   }
    //   // success
    //   dispatch(
    //     uiActions.showNotification({
    //       status: "success",
    //       title: "Success!",
    //       message: "Sent cart data successfully!",
    //     })
    //   );
    // };
    // if (isInitial) {
    //   isInitial = false;
    //   return;
    // }
    // sendCartData().catch((error) => {
    //   // error
    //   dispatch(
    //     uiActions.showNotification({
    //       status: "error",
    //       title: "Error!",
    //       message: error.message,
    //     })
    //   );
    // });
    // like other react hooks
    // react-redux will garuntee thst dispatch function never change
    // but, still add it here
  }, [cart, dispatch]);

  return (
    <React.Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </React.Fragment>
  );
}

export default App;
