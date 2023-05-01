import "./App.css";
import { useRef, useState } from "react";
// Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

function App() {
  const form = useRef();
  const [alertMsg, setAlertMsg] = useState("");
  const [validated, setValidated] = useState(false);
  const btn = useRef()

  let alert = <Alert variant={"warning"}> {alertMsg} </Alert>;

  function submitHandler(e) {
    e.preventDefault();
    btn.current.classList.add('btn_loader')
    
    if (form.current.checkValidity() === false) {
      btn.current.classList.remove('btn_loader')
      e.stopPropagation();
      setValidated(true);

    } else {
      const formData = new FormData(form.current);
      fetch(
        "https://script.google.com/macros/s/AKfycbwbZJD06dt4ml-zOUgeG39wtlbZPFh6jmowhJNqXVehP0XBcMtOMMdFlf7VrHZujoaqXA/exec",
        {
          method: "POST",
          body: formData,
        }
        )
        .then((response) => {
          document.querySelector(".flip-card-inner").style.transform = "rotateY(180deg)";
          setValidated(false);
        })
        .catch((error) => {
          setAlertMsg(error.message);
          btn.current.classList.remove('btn_loader')
        });
    }
  }

  return (
    <div className="App flip-card">
      <div className="flip-card-inner">
        {alertMsg && alert}

        <Form
          className="flip-card-front"
          ref={form}
          noValidate
          validated={validated}
        >
          {/* Email */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              required
            />
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
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
            ref={btn}
          >
            Submit
          </Button>
        </Form>

        <div className="flip-card-back">
          <h1>Thank You!</h1>
          <h3>Your submission has been sent.</h3>
        </div>

      </div>
    </div>
  );
}

export default App;
