import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';
import App from './App';
import TestPage from './TestPage';
import LoginPage from './LoginPage';
import InfoPage from "./InfoPage"
import {
  createBrowserRouter,
  RouterProvider,
  redirect
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import config from "./config.json";
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

async function fetchUser(token) {
  let request = await fetch(config.endpoint + "/auth/user", {
    headers: {
      Authorization: token
    }
  })
  if (request.status == 401) return null;
  let data = await request.json()
  return data
}
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
      },
      {
        path: "info",
        loader: async () => {
          let request = await fetch(config.endpoint + "/machineInfo", { headers: { Authorization: localStorage.getItem("token") }})
          let data = await request.json();
          store.dispatch({ type: 'info/infoChanged', payload: data })
          return null
        },
        element: <InfoPage />
      }
    ]
  },
  {
    path: "/login",
    action: async () => {
      return redirect("/")
    },
    loader: async () => {
      let token = localStorage.getItem("token")
      if(token) {
        let user = await fetchUser(token)
        if (user) {
          store.dispatch({ type: 'user/userChanged', payload: user })
          return redirect("/")
        }
        else return null
      }
      else return null
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