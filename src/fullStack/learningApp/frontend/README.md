# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

#useReducer
useReducer is a hook that takes a reducer function and an initial state. It returns the current state and a dispatch function. 
The dispatch function is used to update the state. The reducer function is used to determine how the state should be updated based on the action type. 
In this case, we are using the cartReducer function to update the state of the cart. The initial state is an empty array for both products and cart. 
The reducer function takes the current state and an action object as arguments. It then returns a new state based on the action type.