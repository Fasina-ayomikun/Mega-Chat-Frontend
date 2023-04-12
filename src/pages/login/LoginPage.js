import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import "./login.css";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser, setPhoneNumber } from "../../features/user/userSlice";
import { toast } from "react-toastify";
import { getFromLocalStorage } from "../../utils/localStorage";

function LoginPage() {
  const [number, setNumber] = useState("");
  const [open, setOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const recapRef = useRef();
  const verificationRef = useRef();
  const numberRef = useRef();
  const { userExist } = useSelector((s) => s.user);
  const dispatch = useDispatch();
  let user = getFromLocalStorage();
  const confirmationRef = useRef();
  const recaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      recapRef.current.id,
      auth
    );
    window.recaptchaVerifier.render();
  };
  const registerUser = (e) => {
    e.preventDefault();
    signInWithPhoneNumber(auth, number, window.recaptchaVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        confirmationRef.current = confirmationResult;
        setOpen(true);

        if (confirmationResult) {
          toast.success("OTP sent successfully");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const navigate = useNavigate();
  const verifyUser = (e) => {
    e.preventDefault();

    confirmationRef.current
      .confirm(verificationCode)
      .then((result) => {
        const user = result.user;

        if (user) {
          dispatch(setPhoneNumber(number));

          toast.success("Verification successful");
        }
        if (userExist) {
          navigate("/chats");
        } else {
          navigate("/profile");
        }
      })
      .catch((error) => {
        toast.error("Verification failed");
      });
  };
  useEffect(() => {
    recaptcha();

    if (user) {
      navigate("/chats");
    }
  }, []);
  return (
    <section className='login-section'>
      <div className='login-container'>
        <h1 className='h1-m'>Welcome to MegaChat</h1>
        {open ? (
          <form>
            <label htmlFor='code' className='label'>
              Enter your Verification Code:
            </label>
            <input
              ref={verificationRef}
              type='number'
              id='code'
              defaultValue=''
              className='input'
              onKeyUp={(e) => setVerificationCode(e.target.value)}
              placeholder='000000'
            />
            <button
              type='submit'
              className='btn'
              onClick={(e) => {
                verifyUser(e);
              }}
            >
              Done
            </button>
            <h5
              className='resend-btn'
              onClick={() => {
                setVerificationCode("123456");
                verificationRef.current.value = "123456";
              }}
            >
              Generate test otp
            </h5>
          </form>
        ) : (
          <form>
            <label htmlFor='phone-no' className='label'>
              Enter your Phone number:
            </label>
            <input
              type='text'
              ref={numberRef}
              id='phone-no'
              className='input'
              maxLength='15'
              onKeyUp={(e) => setNumber(e.target.value)}
              required
              autoComplete='off'
              placeholder='+234 2343 234 4332'
            />
            <div id='recaptcha-container' ref={recapRef}></div>
            <button
              type='submit'
              className='btn'
              onClick={(e) => {
                registerUser(e);
                dispatch(getSingleUser(number));
              }}
            >
              Done
            </button>
            <h5
              className='resend-btn'
              onClick={() => {
                setNumber("+2348169679473");
                numberRef.current.value = "+2348169679473";
              }}
            >
              Generate test number
            </h5>
          </form>
        )}
      </div>
    </section>
  );
}

export default LoginPage;
