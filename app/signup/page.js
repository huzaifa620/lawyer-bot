'use client';

import React, { useEffect, useState } from "react";
import { collection, addDoc, db } from "../firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, provider } from "../firebase";
import { useRouter } from "next/navigation";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const Index = () => {

  const [email, setEmail] = useState("");
  const [secondstep, setSecondstep] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [accounttype, setAccounttype] = useState("client");
  const [user, setUser] = useState(null);
  const [signupcond, setSignupcond] = useState("");

  const router = useRouter()
  const ContinueSignUp = (x) => {
    setSignupcond(x);
    setSecondstep(true);
  };

  const singupWithGoogle = () => {

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        window.localStorage.setItem("token", token);
        const user = result.user;
 
        console.log(user);
        setUser(user);
        Signupwithaccounttype(user);

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const SignUpusingEmail = () => {
    // e.preventDefault();
    // some fancy firebase register stuff....
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user>>>", user);
        // dispatch({
        //   type: "ADD_USER",
        //   payload: user,
        // });
        setUser(user);
        Signupwithaccounttype();
        // setSecondstep(true);
        // navigate("/", { replace: true });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorMessage.includes("email-already-in-use")) {
          // console.log("EE");
          dispatch({
            type: "ADD_MESSAGE",
            payload: errorMessage,
          });
          dispatch({
            type: "ADD_HEADING",
            payload: "Email Already In Use",
          });
          dispatch({
            type: "SHOW_NOTIFICATIONCOMPO",
          });
          dispatch({
            type: "SHOW_NOTIFICATION",
          });
        } else {
          dispatch({
            type: "ADD_MESSAGE",
            payload: errorMessage,
          });
          dispatch({
            type: "ADD_HEADING",
            payload: "Error Code: " + errorCode,
          });
          dispatch({
            type: "SHOW_NOTIFICATIONCOMPO",
          });
          dispatch({
            type: "SHOW_NOTIFICATION",
          });
        }
        setSecondstep(false);
        // console.log(errorMessage);
        // ..
      });
  };

  const Signupwithaccounttype = (user) => {
    addDoc(collection(db, "users"), {
      email: email == "" ? user.email : email,
      uid: user.uid,
      type: accounttype,
    })
      .then((res) => {
        console.log(res.id);
        router.push("/");
      })
      .catch((err) => console.log(err));
  };

return (
    <div className="w-full h-screen ">
      <img
        src="signupbackground.jpg"
        alt=""
        className="w-full h-full opacity-80"
      />
      <div className="fixed flex top-0 justify-center items-center bottom-0 left-0 right-0">
        {/* <div id="logo" className="">
          <img src="logo.svg" alt="" className="backdrop-blur-xl " />
        </div> */}
        <div className="w-1/3 h-[600px] bg-white rounded-lg flex flex-col pt-8 pb-8 pl-6 pr-6">
          <div className=" text-gray-600 font-semibold">
            Step {secondstep ? 2 : 1} of 2
          </div>
          <div className=" font-bold text-4xl mt-4 text-gray-700">
            Create an account
          </div>
          {secondstep ? (
            <>
              <div className="mt-4  text-xl text-gray-500 font-medium">
                Select the account type
              </div>
              <div className="mt-4">
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={accounttype}
                    onChange={(e) => setAccounttype(e.target.value)}
                  >
                    <FormControlLabel
                      value="client"
                      control={<Radio />}
                      label="Client"
                    />
                    <FormControlLabel
                      value="contractor"
                      control={<Radio />}
                      label="Contractor"
                    />
                    <FormControlLabel
                      value="investor"
                      control={<Radio />}
                      label="Investor"
                    />
                  </RadioGroup>
                </FormControl>
                <div
                  className="mt-4 text-center text-xl font-semibold text-gray-600 border p-2 rounded-3xl hover:bg-blue-300 cursor-pointer hover:text-white"
                  onClick={() =>
                    signupcond == "google"
                      ? singupWithGoogle()
                      : SignUpusingEmail()
                  }
                >
                  Continue
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                className=" cursor-pointer border text-xl font-semibold text-gray-700  rounded-3xl mt-4 flex justify-center items-center hover:bg-gray-300"
                onClick={() => ContinueSignUp("google")}
              >
                Continue with Google
                <img
                  src="https://auth.services.adobe.com/img/social/sml-google-logo.svg"
                  alt=""
                  className="ml-4 bg-inherit"
                />
              </div>
              <div class="inline-flex items-center justify-center w-full">
                <hr class="w-full h-px my-8 bg-gray-200 border-0 " />
                <span class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2  ">
                  or
                </span>
              </div>
              <div className="">
                <div class="relative h-10 w-full min-w-[200px]">
                  <input
                    class="peer h-full w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Email Address
                  </label>
                </div>
              </div>
              <div className=" mt-4">
                <div class="relative h-10 w-full min-w-[200px]">
                  <input
                    class="peer h-full w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                  <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Password
                  </label>
                </div>
              </div>
              <div
                className="mt-4 text-center text-xl font-semibold text-gray-600 border p-2 rounded-3xl hover:bg-blue-300 cursor-pointer hover:text-white"
                onClick={() => ContinueSignUp("email")}
              >
                Continue
              </div>
              <div class="inline-flex items-center justify-center w-full">
                <hr class="w-full h-px my-8 bg-gray-200 border-0 " />
                <span class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2  ">
                  or
                </span>
              </div>
              <div className=" text-gray-600">
                Already hava a account, then{" "}
                <span
                  className=" text-blue-400 cursor-pointer"
                  onClick={() => router.push("/signin")}
                >
                  Sign in
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;