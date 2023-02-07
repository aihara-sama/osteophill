import { FunctionComponent } from "react";

interface IProps {}

const Test: FunctionComponent<IProps> = () => {
  // ~~~~~ Redux state ~~~~~

  // ~~~~~ Hooks ~~~~~

  // ~~~~~ Cmp state ~~~~~

  // ~~~~~ Refs ~~~~~

  // ~~~~~ Effects ~~~~~

  // ~~~~~ Handlers ~~~~~

  return (
    <div>
      <button>Button</button>
      <select data-testid={`countries`} value={"USA"}>
        <option value={"USA"}>USA</option>
        <option value={"Japane"}>Japane</option>
        <option value={"Russia"}>Russia</option>
      </select>
    </div>
  );
};

export default Test;
