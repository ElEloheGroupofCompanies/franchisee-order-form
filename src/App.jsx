import React from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./routes";

const App = () => {
  return (
    <div>
      <Routes>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={route.element}
              exact
            />
          );
        })}
      </Routes>
    </div>
  );
};

export default App;