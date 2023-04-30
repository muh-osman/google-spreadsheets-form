import "./App.css";
import { useRef } from "react";
// Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function App() {

  const formEle = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();


  function submitHandler(e) {
    e.preventDefault();


    const formData = new FormData(formEle.current);
    fetch(
      "https://script.google.com/macros/s/AKfycbwPb1u07MSBMYo4bomMIIChuZexI5mMi7gDrq6bhxTHDutUtoROKwEdht2IVXt3PPDa/exec",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    emailInput.current.value = "";
    passwordInput.current.value = "";
  }

  return (
    <div className="App">
      <Form ref={formEle} noValidate validated={false}>
        {/* Email */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            ref={emailInput}
            type="email"
            name="Email"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        {/* Password */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            ref={passwordInput}
            type="password"
            name="Password"
            placeholder="Password"
            required
          />
        </Form.Group>

        {/* Button */}
        <Button
          onClick={(e) => {
            submitHandler(e);
          }}
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;
