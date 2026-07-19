import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import login from "../assets/login.png";
import register from "../assets/register.png";

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center py-4">
      <div className=" text-center">
        <h1 className="fs-1 fw-bold">Online Bidding System</h1>
        <div style={{ color: "var(--text-secondary)" }} className="">
          A real-time auction platform built using Spring Boot, React JS and
          MySQL
        </div>
        <div className="mt-3 d-flex justify-content-center">
          <div className="d-flex gap-2">
            <Button
              color={"var(--blue-primary)"}
              logo={login}
              hover={"blue"}
              text={"Login"}
              onClick={() => navigate("/login")}
            />
            <Button
              color={"var(--green-primary)"}
              logo={register}
              hover={"green"}
              text={"Register"}
              onClick={() => navigate("/register")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
