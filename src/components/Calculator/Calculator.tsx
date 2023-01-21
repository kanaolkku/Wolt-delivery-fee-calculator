import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Input from "../Input/Input";
import "./calculator.css";
import { validateNumbers } from "../../services/validationService";
import Result from "../Result/Result";

interface MyFields {
  cartValue: string | number;
  distance: string | number;
  items: string | number;
  time: Date;
}

const Calculator = () => {
  const [fields, setFields] = useState({
    cartValue: "",
    distance: "",
    items: "",
    time: new Date(),
  });

  const [result, setResult] = useState({
    result: "0",
    type: "",
    visible: false,
  });

  const handleCartValue = (cartValue: string) => {
    setFields({ ...fields, cartValue });
  };
  const handleDistance = (distance: string) => {
    setFields({ ...fields, distance });
  };
  const handleItems = (items: string) => {
    setFields({ ...fields, items });
  };
  const handleTime = (time: Date) => {
    setFields({ ...fields, time });
  };

  const calculateDeliveryFee = (distance: number): number => {
    let deliveryFee = 2;
    //check if delivery distance is over 1000 m
    if (distance > 1000) {
      // get distance over 1000
      const distanceOver = distance - 1000;
      // check additional distance divide by 500 and round up
      deliveryFee = deliveryFee + Math.ceil(distanceOver / 500);
    }
    return deliveryFee;
  };

  const calculateItemFees = (items: number): number => {
    let extraCharge: number = 0;
    // if item amount is over 4, add 50 cent surcharge for each item
    if (items > 4) {
      extraCharge = (items - 4) * 0.5;
    }
    return extraCharge;
  };

  const checkFridayRush = (time: Date): boolean => {
    let isFriday: boolean = false;
    if (time.getDay() === 5 && time.getHours() >= 15 && time.getHours() < 19) {
      isFriday = true;
    }
    return isFriday;
  };

  const calculateAllFees = (e: any) => {
    // Validate numbers
    let { cartValue, distance, items, time }: MyFields = fields;

    if (validateNumbers([cartValue, distance, items])) {
      console.log("fields are valid");
      // parse fields
      cartValue = parseFloat(cartValue);
      distance = parseInt(distance);
      items = parseInt(items);
      let deliveryFee = 0;

      // check cart value if value >= 100€
      if (cartValue >= 100) {
        setResult({
          result: deliveryFee.toFixed(2),
          type: "success",
          visible: true,
        });
      } else {
        let surcharges: number = 0;
        //check cart value for surcharges
        console.log(cartValue);
        if (cartValue < 10) {
          surcharges = 10 - cartValue;
          cartValue = 10;
        }
        //check delivery fee based on distance
        deliveryFee = calculateDeliveryFee(distance);
        // check the item amount
        surcharges = surcharges + calculateItemFees(items);
        // add surcharges to delivery fee
        deliveryFee = deliveryFee + surcharges;
        // check if friday rush and multiply it by 1.1
        if (checkFridayRush(time)) {
          deliveryFee *= 1.1;
        }
        // check delivery fee, if fee is over 15€ make it 15€
        if (deliveryFee > 15) {
          deliveryFee = 15;
        }
        setResult({
          result: deliveryFee.toFixed(2),
          type: "success",
          visible: true,
        });
      }
    } else {
      setResult({
        result: "",
        type: "error",
        visible: true,
      });
    }
  };

  return (
    <div id="calculator">
      <h2>Delivery Fee Calculator</h2>
      <span className="watermark">by Oliver Hyryläinen</span>
      <div className="calculator-container">
        <p>Cart Value (€):</p>
        <Input
          value={fields.cartValue}
          handler={handleCartValue}
          numbervalidation={true}
          placeholder="19.99"
        />
        <p>Distance (m):</p>
        <Input
          value={fields.distance}
          handler={handleDistance}
          numbervalidation={true}
          placeholder="1200"
        />
        <p>Amount of items:</p>
        <Input
          value={fields.items}
          handler={handleItems}
          numbervalidation={true}
          placeholder="2"
        />
        <p>Delivery time:</p>
        <DatePicker
          selected={fields.time}
          onChange={(date) => date && handleTime(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={5}
          timeCaption="time"
          dateFormat="d/MM/yyyy h:mm aa"
        />
        <button className="button" onClick={calculateAllFees}>
          Calculate
        </button>
        <Result
          visible={result.visible}
          result={result.result}
          type={result.type}
        />
      </div>
    </div>
  );
};

export default Calculator;
