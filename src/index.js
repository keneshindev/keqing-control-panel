import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import TestPage from './TestPage';
import LoginPage from './LoginPage';
import {
  createBrowserRouter,
  RouterProvider,
  redirect
} from "react-router-dom";
import { Provider} from "react-redux";
import store from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      let state = store.getState()
      if (state.user == null) return redirect("/login")
      else return null
    },
    element: <App />,
    children: [
      {
        path: "test",
        element: <TestPage />
      }
    ]
  },
  {
    path: "/login",
    action: async () => {
      return redirect("/")
    },
    element: <LoginPage />
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);