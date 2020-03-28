import * as React from "react";
import { hot } from "react-hot-loader/root";

import "./index.less";

console.log("owo");

const App = () => <div>Hello World!</div>;

export const AppWithHMR = hot(App);
