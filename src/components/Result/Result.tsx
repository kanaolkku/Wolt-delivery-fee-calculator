import React from "react";
import "./result.css";
import { MdWarning } from "react-icons/md";
interface MyProps {
  result: number | string;
  type: string;
  visible: boolean;
}
const Result = ({ result, type, visible }: MyProps): JSX.Element | null => {
  if (visible) {
    return (
      <div className={"result-container " + type}>
        {type === "success" ? (
          <p>
            Delivery fee: <span>{result} €</span>
          </p>
        ) : (
          <React.Fragment>
            <MdWarning size={40} style={{ color: "#6e0009" }} />
            <p>Invalid input, please try again</p>
          </React.Fragment>
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default Result;
