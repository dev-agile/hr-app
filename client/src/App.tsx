import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import EditEmployee from './employees/editEmployees';
import ShowEmployee from './employees/showEmployees';
import CreateEmployee from './employees/createEmployees';
import CustomList from "./employees/listEmployees";
import React from "react";
export const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource
      name="employees"
      list={CustomList}
      edit={EditEmployee}
      show={ShowEmployee}
      create={CreateEmployee}
    />
  </Admin>
);
