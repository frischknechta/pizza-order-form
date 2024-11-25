import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { totalPrice } from "../utils/priceCalculation";

import Input from "./Input";
import Slider from "./Slider";
import RadioInput from "./RadioInput";
import pizza from "../assets/pizza.json";
import CheckboxesInput from "./CheckboxesInput";
import Button from "./Button";

function Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [pizzaSize, setPizzaSize] = useState(30);
  const [pizzaDough, setPizzaDough] = useState("Classic");
  const [pizzaBase, setPizzaBase] = useState("Classic");
  const [pizzaIngredients, setPizzaIngredients] = useState([]);

  const [status, setStatus] = useState("idle"); // idle | loading | success | failed

  const form = useRef();

  const total = totalPrice({
    pizzaSize,
    pizzaDough,
    pizzaBase,
    pizzaIngredients,
  });

  function reinitStatus() {
    setTimeout(() => {
      setStatus("idle");
    }, 10 * 1000);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");

    const orderNum = Math.floor(Math.random() * 1000);

    const templateParams = {
      order_number: orderNum,
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      street: street,
      city: city,
      post_code: postCode,
      message: message,
      pizza_size: pizzaSize,
      pizza_dough: pizzaDough,
      pizza_base: pizzaBase,
      pizza_ingredients: pizzaIngredients.join(", "),
      total: total.toFixed(2),
    };

    emailjs
      .send("service_g5uiqe1", "pizza_form", templateParams, {
        publicKey: "OHwqbevK9mbwIHobO",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          setStatus("success");
          reinitStatus();
        },
        (error) => {
          console.log("FAILED...", error.text);
          setStatus("failed");
          reinitStatus;
        },
      );
  }

  return (
    <form
      onSubmit={handleSubmit}
      ref={form}
      className="container mx-auto flex max-w-5xl flex-col gap-8 rounded-xl border-4 border-black p-8"
    >
      <fieldset className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
        <Input
          type="text"
          id="firstName"
          text="First Name"
          value={firstName}
          onChange={setFirstName}
          required
        />
        <Input
          type="text"
          id="lastName"
          text="Last Name"
          value={lastName}
          onChange={setLastName}
          required
        />
        <Input
          type="email"
          id="email"
          text="Email"
          value={email}
          onChange={setEmail}
          required
        />
        <Input
          type="phone"
          id="phone"
          text="Phone Number"
          value={phone}
          onChange={setPhone}
          required
        />
        <Input
          type="text"
          id="street"
          text="Street"
          value={street}
          onChange={setStreet}
          required
        />
        <Input
          type="text"
          id="city"
          text="City"
          value={city}
          onChange={setCity}
          required
        />
        <Input
          type="number"
          id="postCode"
          text="Post Code"
          value={postCode}
          onChange={setPostCode}
          required
          min="1000"
          max="9999"
        />
        <Input
          type="text"
          id="message"
          text="Message"
          value={message}
          onChange={setMessage}
        />
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <h2 className="text-center text-xl font-bold">Pizza Size</h2>
        <Slider
          type="range"
          id="pizzaSize"
          text="Choose the size of your pizza"
          min={20}
          max={60}
          step={10}
          value={pizzaSize}
          onChange={setPizzaSize}
        />
        <h2 className="text-center text-xl font-bold">Pizza Dough</h2>
        <RadioInput
          name="pizzaDough"
          options={pizza.dough}
          value={pizzaDough}
          setter={setPizzaDough}
        />
        <h2 className="text-center text-xl font-bold">Pizza Base</h2>
        <RadioInput
          name="pizzaBase"
          options={pizza.base}
          value={pizzaBase}
          setter={setPizzaBase}
        />

        <h2 className="text-center text-xl font-bold">Pizza Ingredients</h2>
        <CheckboxesInput
          name="pizzaIngredients"
          options={pizza.ingredients}
          value={pizzaIngredients}
          setter={setPizzaIngredients}
        />
      </fieldset>
      <p className="text-center text-lg font-bold">{`Your total is ${total.toFixed(2)} CHF`}</p>
      <Button text="Ready to order?" status={status} />
      {status === "success" && (
        <p className="text-center text-green-400">
          Your order has been placed! You will receive an email confirmation in
          a few minutes.
        </p>
      )}
      {status === "failed" && (
        <p className="text-center text-red-400">
          Something went wrong, please try again.
        </p>
      )}
    </form>
  );
}

export default Form;
