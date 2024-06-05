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
export const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource
      name="employees"
      list={ListGuesser}
      edit={EditEmployee}
      show={ShowEmployee}
      create={CreateEmployee}
    />
  </Admin>
);
