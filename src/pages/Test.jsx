// import React, { useState } from "react";

import { useEffect, useRef, useState } from "react";

// import Joi from "joi";

// function Test(props) {
//   const [customer, setCustomer] = useState({
//     nameCountry: "",
//     nameCenter: "",
//     countClass: "",
//     fromHour: 0,
//     toHour: "",
//   });

//   const [errors, setErrors] = useState({});

//   const schema = {
//     nameCountry: Joi.string().required().min(2).max(50).trim(),
//     nameCenter: Joi.string().required().min(2).max(150).trim(),
//     countClass: Joi.number().required().min(1),
//     fromHour: Joi.number().required().min(0).max(23),
//     toHour: Joi.number().required().min(0).max(23).greater(Joi.ref("fromHour")),
//   };
//   const joiSchema = Joi.object(schema);

//   const validateForm = (event) => {
//     event.preventDefault();
//     const result = joiSchema.validate(customer, { abortEarly: false });
//     const { error } = result;
//     if (!error) {
//       return null;
//     } else {
//       const errorData = {};
//       for (let item of error.details) {
//         const name = item.path[0];
//         const message = item.message;
//         errorData[name] = message;
//       }
//       setErrors(errorData);
//       return errorData;
//     }
//   };

//   const validateProperty = (event) => {
//     const { name, value } = event.target;
//     const obj = { [name]: value };
//     const subSchema = Joi.object({ [name]: schema[name] });
//     const result = subSchema.validate(obj);
//     const { error } = result;
//     return error ? error.details[0].message : null;
//   };

//   const handleSave = (event) => {
//     const { name, value } = event.target;
//     const errorMessage = validateProperty(event);
//     if (errorMessage) {
//       errors[name] = errorMessage;
//     } else {
//       delete errors[name];
//     }
//     customer[name] = value;
//     setCustomer({ ...customer });
//     setErrors({ ...errors });
//   };

//   return (
//     <div>
//       <h3>Add Customer</h3>

//       <hr />

//       <form className="ui form">
//         <div className="form-group">
//           <label>First Name</label>

//           <input type="text" name="nameCountry" className="form-control" value={customer.nameCountry} onChange={handleSave} />
//         </div>

//         {errors.nameCountry && <div className="alert alert-danger">{errors.nameCountry}</div>}

//         <div className="form-group">
//           <label>Last Name</label>

//           <input type="text" name="nameCenter" className="form-control" value={customer.nameCenter} onChange={handleSave} />
//         </div>

//         {errors.nameCenter && <div className="alert alert-danger">{errors.nameCenter}</div>}

//         <div className="form-group">
//           <label>fromHour</label>

//           <input type="number" name="fromHour" className="form-control" value={customer.fromHour} onChange={handleSave} />
//         </div>

//         {errors.fromHour && <div className="alert alert-danger">{errors.fromHour}</div>}

//         <div className="btn">
//           <button type="submit" onClick={validateForm} className="btn btn-success">
//             Add customer
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Test;

// import { useState } from "react";
// import Joi from "joi";
// import Input from "../components/Input";
// import validateForm from "../functions/validateForm";
// import handleSave from "../functions/handleSave";
// import requestOptions from "../constants/requestOptions";
// import GENDER from "../constants/gender";

// function Test(props) {
//   const [duringAdd, setDuringAdd] = useState(false);
//   const [addDirector, setAddDirector] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const countries = {
//     1: {
//       name: "homs",
//       id: 1,
//     },
//     2: {
//       name: "hama",
//       id: 2,
//     },
//   };

//   const [institute, setInstitute] = useState({
//     typeTraining: "",
//     nameCountry: "",
//     nameCenter: "",
//     countClass: "",
//     fromHour: "",
//     toHour: "",
//   });
//   const [instituteErrors, setInstituteErrors] = useState({});
//   const instituteSchema = {
//     typeTraining: Joi.string().required().min(2).max(50).trim(),
//     nameCountry: Joi.string().required().min(2).max(30).trim(),
//     nameCenter: Joi.string().required().min(2).max(150).trim(),
//     countClass: Joi.number().required().min(1),
//     fromHour: Joi.number().required().min(0).max(23),
//     toHour: Joi.number().required().min(0).max(23).greater(Joi.ref("fromHour")),
//   };
//   const joiInstitute = Joi.object(instituteSchema);

//   const [director, setDirector] = useState({
//     name: "",
//     gender: null,
//     email: "",
//     phoneNumber: "",
//     username: "",
//     password: "",
//   });
//   const [directorErrors, setDirectorErrors] = useState({});
//   const directorSchema = {
//     name: Joi.string().required().min(2).max(50).trim(),
//     gender: Joi.boolean().required(),
//     email: Joi.string()
//       .trim()
//       .pattern(/[a-zA-Z0-9]+[a-zA-Z0-9\_\.]*(@gmail\.com)$/)
//       .allow(null),
//     phoneNumber: Joi.string()
//       .trim()
//       .required()
//       .pattern(/^(09)(\d{8})$/),
//     username: Joi.string()
//       .trim()
//       .pattern(/^[A-Za-z]+[a-zA-Z0-9\_\.]*$/)
//       .min(3)
//       .max(30)
//       .required(),
//     password: Joi.string().required().min(8).max(50),
//   };
//   const joiDirector = Joi.object(directorSchema);

//   async function addInstitute(event) {
//     const isValid = (await validateForm(event, joiInstitute, institute, setInstituteErrors)) && (await validateForm(event, joiDirector, director, setDirectorErrors));
//     if (isValid) {
//       setErrorMessage("");
//       const infoRequestOptions = {
//         ...requestOptions,
//         body: JSON.stringify({
//           ...institute,
//           ...director,
//         }),
//       };
//       setDuringAdd(true);
//       const response = await fetch("/admin-site/training_center/new-training", infoRequestOptions);
//       const data = await response.json();
//       if (data.result) props.setInstitutes({ ...props.institutes, [data.institute.id]: data.institute });
//       else setErrorMessage(data.error);
//       setDuringAdd(false);
//     } else {
//       setErrorMessage("Form is Not Correct");
//     }
//   }

//   return (
//     <>
//       {addDirector ? (
//         <>
//           {errorMessage ? <div>{errorMessage}</div> : null}
//           <div className="adddirector">
//             <Input label={""} type={"text"} name={"name"} onChange={handleSave} state={director} setState={setDirector} errors={directorErrors} setErrors={setDirectorErrors} schema={directorSchema} />
//             <Input label={""} type={"text"} name={"username"} onChange={handleSave} state={director} setState={setDirector} errors={directorErrors} setErrors={setDirectorErrors} schema={directorSchema} />
//             <Input label={""} type={"email"} name={"email"} onChange={handleSave} state={director} setState={setDirector} errors={directorErrors} setErrors={setDirectorErrors} schema={directorSchema} />
//             <Input label={""} type={"tel"} name={"phoneNumber"} onChange={handleSave} state={director} setState={setDirector} errors={directorErrors} setErrors={setDirectorErrors} schema={directorSchema} />
//             <Input label={""} type={"password"} name={"password"} onChange={handleSave} state={director} setState={setDirector} errors={directorErrors} setErrors={setDirectorErrors} schema={directorSchema} />
//             {GENDER.map((genderItem, index) => {
//               return (
//                 <div key={index}>
//                   <label htmlFor="">{genderItem.name}</label>
//                   <input
//                     type="radio"
//                     value={genderItem.value}
//                     name="gender"
//                     checked={genderItem.value == (director.gender == "true")}
//                     onChange={(event) => {
//                       handleSave(event, director, setDirector, directorErrors, setDirectorErrors, directorSchema);
//                     }}
//                   />
//                 </div>
//               );
//             })}
//             <button
//               onClick={async (event) => {
//                 const isValid = await validateForm(event, joiDirector, director, setDirectorErrors);
//                 isValid && (await addInstitute(event));
//               }}
//             ></button>
//           </div>
//         </>
//       ) : (
//         <>
//           {errorMessage ? <div>Form is Not Correct</div> : null}
//           <div className="addinstitute">
//             <Input label={""} type={"text"} name={"typeTraining"} onChange={handleSave} state={institute} setState={setInstitute} errors={instituteErrors} setErrors={setInstituteErrors} schema={instituteSchema} />
//             <Input label={""} type={"text"} name={"nameCenter"} onChange={handleSave} state={institute} setState={setInstitute} errors={instituteErrors} setErrors={setInstituteErrors} schema={instituteSchema} />
//             <Input label={""} type={"number"} name={"countClass"} onChange={handleSave} state={institute} setState={setInstitute} errors={instituteErrors} setErrors={setInstituteErrors} schema={instituteSchema} />
//             <Input label={""} type={"number"} name={"fromHour"} onChange={handleSave} state={institute} setState={setInstitute} errors={instituteErrors} setErrors={setInstituteErrors} schema={instituteSchema} />
//             <Input label={""} type={"number"} name={"toHour"} onChange={handleSave} state={institute} setState={setInstitute} errors={instituteErrors} setErrors={setInstituteErrors} schema={instituteSchema} />
//             <select
//               name="nameCountry"
//               onChange={async (event) => {
//                 await handleSave(event, institute, setInstitute, instituteErrors, setInstituteErrors, instituteSchema);
//               }}
//             >
//               {Object.keys(countries).map((countryItem, countryIndex) => {
//                 return (
//                   <option key={countryIndex} value={countries[countryItem].name}>
//                     {countries[countryItem].name}
//                   </option>
//                 );
//               })}
//             </select>{" "}
//             <button
//               onClick={async (event) => {
//                 const isValid = await validateForm(event, joiInstitute, institute, setInstituteErrors);
//                 setAddDirector(isValid);
//               }}
//             ></button>
//           </div>
//         </>
//       )}
//     </>
//   );
// }

// export default Test;

// import { ChangeEvent, useState } from "react";

// function Test() {
//   const [file, setFile] = useState();

//   const handleFileChange = (e) => {
//     if (e.target.files) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleUploadClick = () => {
//     if (!file) {
//       return;
//     }

//     let data = new FormData();
//     data.append("file", file);
//     data.append("hi", JSON.stringify({ hello: "sldfk" }));

//     // 👇 Uploading the file using the fetch API to the server
//     fetch("https://httpbin.org/post", {
//       method: "POST",
//       body: data,
//       // 👇 Set headers manually for single file upload
//       headers: {
//         // "content-type": "multipart/form-data",
//         // "content-length": `${file.size}`, // 👈 Headers need to be a string
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => console.log(data))
//       .catch((err) => console.error(err));
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />

//       <div>{file && `${file.name} - ${file.type}`}</div>

//       <button onClick={handleUploadClick}>Upload</button>
//     </div>
//   );
// }

// export default Test;
// import { motion, AnimatePresence } from "framer-motion";
// import { useState } from "react";
// function Test() {
//   const container = {
//     hidden: {
//       opacity: 0,
//     },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration: 1,
//       },
//     },
//   };

//   const item = {
//     hidden: { opacity: 0, transition: { duration: 1 } },
//   };
//   const [a, setA] = useState(true);
//   return (
//     <>
//       <AnimatePresence>
//         {a ? <motion.div key={"hello1"} className="child" animate={container.visible} initial={container.hidden} exit={item.hidden}></motion.div> : null}
//         <motion.div key={"hello2"} className="child" animate={container.visible} initial={container.hidden} exit={item.hidden}></motion.div>
//         <motion.div key={"hello3"} className="child" animate={container.visible} initial={container.hidden} exit={item.hidden}></motion.div>
//         <motion.div key={"hello4"} className="child" animate={container.visible} initial={container.hidden} exit={item.hidden}></motion.div>
//       </AnimatePresence>
//       <button
//         onClick={() => {
//           setA(!a);
//         }}
//       >
//         a
//       </button>
//     </>
//   );
// }

// export default Test;

// function Test() {
//   const [copy, setCopy] = useState(false);
//   return (
//     <>
//       <div
//         className="copy"
//         onContextMenu={(event) => {
//           event.preventDefault();
//           setCopy(true);
//         }}
//       >
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam dolore, officiis odio eligendi illum quisquam ullam dolores quis. Dolores aliquid quo vel animi, adipisci aut similique ipsa aliquam sunt perferendis.
//       </div>

//       {copy ? (
//         <div
//           className="button"
//           onMouseDown={async (event) => {
//             event.preventDefault();
//             if (window.getSelection) {
//               await navigator.clipboard.writeText(window.getSelection().toString());
//               alert("copy is done");
//             }
//             setCopy(false);
//           }}
//           style={{ backgroundColor: "red", width: "max-content", marginRight: "40px", height: "max-content", cursor: "pointer" }}
//         >
//           click here to copy
//         </div>
//       ) : null}
//     </>
//     // <>
//     //   <input type="text" placeholder="hello" style={{ height: "max-content"}} />
//     // </>
//   );
// }

// export default Test;
// import axios from "axios";
// function Test(props) {
//   const [image, setImage] = useState("");
//   const [text, setText] = useState({vlaue: '', two: 'hello'});
//   const myForm = useRef();

//   return (
//     <>
//       <input
//         type="file"
//         onChange={(e) => {
//           setImage(e.target.files[0]);
//         }}
//         name={"image"}
//       />
//       <input
//         type="text"
//         name="hi"
//         id=""
//         value={text.value}
//         onChange={(e) => {
//           setText({...text, value: e.target.value});
//         }}
//       />
//       <button
//         onClick={async () => {
//           console.log("hllo");

//           const formData = new FormData();
//           formData.append("image", image);
//           formData.append("value", text.value);
//           formData.append("im", text.two);

//           axios
//             .post("http://localhost:3001/hello", formData, {
//               headers: {
//                 "Content-Type": "multipart/form-data",
//               },
//             })
//             .then((res) => {
//               console.log(res);
//             })
//             .catch((error) => {
//               console.log(error);
//             });
//         }}
//       >
//         clickme
//       </button>
//     </>
//   );
// }

// export default Test;

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Test(props) {
//   return (
//     <>
//       <button
//         onClick={() => {
//           toast("heloosdf");
//         }}
//       >
//         clik
//       </button>
//       <ToastContainer />
//     </>
//   );
// }

// export default Test;

// function Test(props) {

//   return (
//     <>

// <svg width="128px" height="127px" viewbox="0 0 128 127" version="1.1" class="icon hidden">
//       <title>icons</title>
//       <desc>Created with Sketch.</desc>
//       <defs>
//         <g id="icons">
//           <symbol id="sushi">
//             <path id="Shape" d="M64,0 C28.654,0 0,28.431876 0,63.5048682 C0,98.575876 28.654,127.007752 64,127.007752 C99.346,127.007752 128,98.575876 128,63.5048682 C128,28.431876 99.346,0 64,0 L64,0 Z" fill="#2E3339"></path>
//             <path id="Shape" d="M122.898,65.5727132 C123.164,63.3848062 121.79,61.420155 119.829,61.1889612 L117.706,60.935938 C118.318,60.4100465 118.807,59.6896744 119.047,58.8194729 C119.611,56.7754419 118.639,54.7294264 116.868,54.1152248 C117.59,53.523845 118.078,52.724093 118.195,51.843969 C119.325,51.4113488 120.273,50.3992558 120.644,49.0507907 C121.232,46.9253953 120.165,44.7811473 118.259,44.264186 L117.179,43.9704806 L116.34,38.2342946 C116.116,36.7012713 114.806,35.5750698 113.183,35.320062 C113.207,35.2019845 113.245,35.0898605 113.258,34.967814 C113.525,32.779907 112.15,30.8152558 110.189,30.5830698 L107.952,30.316155 C107.98,30.2536434 108.019,30.1980775 108.048,30.1335814 C108.895,28.0955039 108.1,25.8381395 106.274,25.0939535 L101.409,23.1094574 L100.632,17.788031 C100.349,15.848186 98.335,14.5374264 96.138,14.8529612 C95.794,14.9025736 95.474,14.999814 95.167,15.1178915 C94.55,13.6235659 93.159,12.6223876 91.614,12.7454264 L86.354,13.1591938 L85.081,10.3858605 C84.265,8.60179845 81.961,7.90127132 79.94,8.81314729 C78.93,9.26858915 78.182,10.0415504 77.788,10.9226667 C77.484,8.99968992 75.484,7.70381395 73.3,8.01835659 C72.489,8.13444961 71.77,8.45891473 71.196,8.91634109 C70.794,7.10350388 68.871,5.89990698 66.759,6.20353488 C66.401,6.25513178 66.067,6.35931783 65.747,6.48632558 C64.945,5.35218605 63.433,4.69829457 61.814,4.93048062 C60.163,5.16762791 58.876,6.25810853 58.458,7.60756589 C57.222,6.85742636 55.499,6.90604651 54.1,7.86257364 C53.298,8.41128682 52.753,9.16837209 52.471,9.97903876 C51.769,8.6027907 50.108,7.75937984 48.307,8.01736434 C46.109,8.33289922 44.555,10.1616124 44.84,12.1004651 L44.919,12.6412403 L42.444,10.9951008 C40.804,9.90362791 38.474,10.5069147 37.237,12.3376124 C36.313,13.7049302 36.263,15.371907 36.979,16.5814574 L35.453,16.1666977 C33.549,15.6477519 31.532,16.9535504 30.945,19.0789457 C30.755,19.7685581 30.754,20.4542016 30.883,21.0912248 L27.824,20.8550698 C25.856,20.7022636 24.123,22.3622946 23.951,24.5591318 C23.901,25.2011163 24.002,25.8103566 24.202,26.3660155 C22.647,26.2380155 21.057,27.2133953 20.347,28.8764031 C19.336,28.6303256 18.183,28.7751938 17.16,29.3884031 C15.259,30.5275039 14.544,32.8116589 15.567,34.4875659 L16.688,36.3271938 L14.637,35.4907287 C12.811,34.7445581 10.648,35.7953488 9.803,37.8334264 C8.958,39.8715039 9.752,42.1288682 11.578,42.8730543 L11.911,43.0089922 C11.471,43.3116279 11.072,43.6995969 10.749,44.1778605 C9.512,46.0085581 9.838,48.3770543 11.479,49.4665426 L12.959,50.4508527 L8.337,51.9382326 C6.459,52.5405271 5.495,54.7314109 6.179,56.8270388 C6.347,57.3430078 6.602,57.8034109 6.915,58.1993178 C5.311,58.492031 4.017,59.9704806 3.87,61.8507907 C3.697,64.0476279 5.153,65.9537364 7.121,66.1055504 L7.987,66.1700465 C7.763,66.3883411 7.551,66.6215194 7.37,66.8933953 C6.15,68.7151628 6.474,71.0568682 8.086,72.1513178 C7.392,72.599814 6.8,73.2666047 6.446,74.1209302 C5.601,76.1580155 6.395,78.4143876 8.221,79.1585736 L10.962,80.2768372 L11.331,82.8011163 C10.685,83.2476279 10.139,83.8925891 9.804,84.6992868 C8.959,86.7393488 9.753,88.9957209 11.579,89.739907 L12.394,90.0713178 L12.697,92.1431318 C12.975,94.0512248 14.926,95.3461085 17.083,95.0861395 C16.723,95.6546977 16.477,96.3244651 16.418,97.0617054 C16.245,99.2605271 17.701,101.167628 19.669,101.315473 L22.939,101.567504 C22.133,102.551814 21.836,103.991566 22.296,105.398574 C22.981,107.495194 25.058,108.708713 26.936,108.103442 L28.567,107.578543 L28.813,109.261395 C29.096,111.199256 31.107,112.514977 33.307,112.19845 C33.889,112.115101 34.42,111.92062 34.889,111.650729 C35.101,111.990078 35.349,112.31355 35.665,112.60031 C37.201,113.99045 39.401,114.090667 40.768,112.909891 C40.804,113.154977 40.857,113.402047 40.937,113.648124 C41.622,115.744744 43.699,116.957271 45.577,116.352 L46.588,116.026543 L46.609,117.08031 C46.646,119.04 48.477,120.59386 50.699,120.550202 C52.435,120.517457 53.883,119.513302 54.419,118.141023 L58.43,120.336868 C59.73,121.049302 61.335,120.772465 62.508,119.775256 C62.661,119.969736 62.83,120.159256 63.022,120.331907 C64.662,121.818295 67.07,121.850047 68.4,120.401364 L70.105,118.548837 L72.001,120.207876 C73.481,121.504744 75.873,121.214016 77.343,119.558946 C78.695,118.038822 78.779,115.903504 77.633,114.561984 L82.904,116.713178 C84.622,117.41569 86.626,116.518698 87.562,114.711814 C88.175,116.242853 89.945,117.203349 91.857,116.925519 C94.054,116.610977 95.609,114.783256 95.325,112.843411 L95.084,111.194295 C96.777,111.560434 98.616,110.541395 99.378,108.696806 C99.639,108.072682 99.727,107.432682 99.693,106.815504 C101.314,107.671814 103.458,107.051659 104.62,105.31324 C105.448,104.078884 105.553,102.608372 105.039,101.445457 L108.491,100.336124 C110.372,99.7328372 111.339,97.5449302 110.652,95.4453333 C110.472,94.8946357 110.193,94.4104186 109.851,93.9996279 L111.4,94.6336744 C113.228,95.3808372 115.392,94.3310388 116.238,92.2929612 C117.084,90.2548837 116.29,87.9965271 114.462,87.2523411 L114.117,87.1114419 L114.404,87.0171783 C115.325,86.7224806 116.019,86.0457674 116.417,85.1874729 C116.719,85.2073178 117.023,85.2023566 117.337,85.1567132 C119.534,84.8421705 121.088,83.0144496 120.805,81.0746047 L120.053,75.9357519 C120.975,75.5229767 121.776,74.740093 122.214,73.6773953 C123.018,71.7464806 122.331,69.6310078 120.7,68.7806512 C121.846,68.2230078 122.723,67.0402481 122.898,65.5727132 L122.898,65.5727132 Z" fill="#FFFFFF"></path>
//             <ellipse id="Oval" fill="#F26F6A" cx="64" cy="63.503876" rx="43" ry="42.6666667"></ellipse>
//             <ellipse id="Oval" fill="#F26F6A" cx="64" cy="63.503876" rx="43" ry="42.6666667"></ellipse>
//             <path id="Shape" d="M24.048,79.2786357 C24.578,80.5983256 25.171,81.8852713 25.825,83.1355039 C29.019,74.3987597 36.795,55.2364651 46.747,45.3616124 C57.309,34.8814884 71.73,27.7511938 80.437,24.0739225 C79.078,23.5152868 77.683,23.0271008 76.256,22.6063876 C67.288,26.6190388 54.49,33.4665426 44.624,43.2570543 C35.14,52.6705116 27.772,69.5228527 24.048,79.2786357 L24.048,79.2786357 Z" fill="#F9B6B5"></path>
//             <path id="Shape" d="M43.443,100.986047 C44.329,101.46431 45.238,101.90586 46.16,102.323597 C48.822,94.7775504 57.019,73.3568992 67.741,62.7190078 C77.595,52.9413953 92.435,46.6693953 101.929,43.3989457 C101.441,42.4950078 100.916,41.6138915 100.367,40.7506357 C90.608,44.1371783 75.791,50.5213023 65.619,60.6144496 C54.492,71.656186 46.277,92.9369302 43.443,100.986047 L43.443,100.986047 Z" fill="#F9B6B5"></path>
//             <path id="Shape" d="M106.641,58.0653643 C97.867,61.7644651 87.598,67.2515969 79.953,74.8363411 C71.881,82.8457674 65.34,96.2470698 61.274,106.075287 C62.177,106.132837 63.083,106.170543 64,106.170543 C64.174,106.170543 64.346,106.159628 64.52,106.156651 C68.528,96.6608372 74.708,84.2517829 82.076,76.9408992 C89.08,69.9911938 98.604,64.8156279 106.938,61.2246822 C106.882,60.16 106.773,59.1082171 106.641,58.0653643 L106.641,58.0653643 Z" fill="#F9B6B5"></path>
//             <path id="Shape" d="M92.113,31.235969 C82.786,34.1809612 65.273,40.8597829 53.743,52.3013953 C42.979,62.9829457 34.942,83.2406822 31.863,91.8395039 C32.61,92.6729922 33.391,93.4737364 34.201,94.2486822 C36.769,86.9268837 45.027,65.1619225 55.864,54.407938 C67.516,42.8472558 86.147,36.1833178 94.653,33.5925581 C93.841,32.771969 92.991,31.9890853 92.113,31.235969 L92.113,31.235969 Z" fill="#F9B6B5"></path>
//           </symbol>
//           <symbol id="donut">
//             <g id="Group">
//               <path id="Shape" d="M64,0 C28.654,0 0,28.431876 0,63.5048682 C0,98.575876 28.654,127.007752 64,127.007752 C99.346,127.007752 128,98.575876 128,63.5048682 C128,28.431876 99.346,0 64,0 L64,0 Z M64,87.3178295 C50.745,87.3178295 40,76.656124 40,63.503876 C40,50.3516279 50.745,39.6899225 64,39.6899225 C77.255,39.6899225 88,50.3516279 88,63.503876 C88,76.656124 77.256,87.3178295 64,87.3178295 L64,87.3178295 Z" fill="#FFCC5E"></path>
//               <path id="Shape" d="M63.999,4.74393798 C31.293,4.74393798 4.78,31.0514109 4.78,63.5048682 C4.78,95.9573333 31.293,122.265798 63.999,122.265798 C96.705,122.265798 123.219,95.9573333 123.219,63.5048682 C123.219,31.0514109 96.705,4.74393798 63.999,4.74393798 L63.999,4.74393798 Z M64,87.3178295 C50.745,87.3178295 40,76.656124 40,63.503876 C40,50.3516279 50.745,39.6899225 64,39.6899225 C77.255,39.6899225 88,50.3516279 88,63.503876 C88,76.656124 77.256,87.3178295 64,87.3178295 L64,87.3178295 Z" fill="#FFEEAD"></path>
//               <path id="Shape" d="M113.883,47.4215194 C112.133,42.0723101 111.309,36.2061395 108.043,31.7539225 C104.744,27.2570543 99.354,24.6811783 94.822,21.4077519 C90.334,18.1670698 86.217,13.8577364 80.826,12.1203101 C75.625,10.4444031 69.764,11.4743566 63.999,11.4743566 C58.235,11.4743566 52.374,10.4444031 47.173,12.1203101 C41.782,13.8567442 37.664,18.168062 33.177,21.4077519 C28.645,24.680186 23.255,27.2570543 19.956,31.7539225 C16.691,36.2061395 15.866,42.0733023 14.116,47.4225116 C12.427,52.5831938 9.563,57.7845581 9.563,63.5048682 C9.563,69.2251783 12.427,74.4265426 14.116,79.5872248 C15.866,84.9364341 16.691,90.8045891 19.956,95.2548217 C23.254,99.7516899 28.645,102.328558 33.177,105.600992 C37.664,108.841674 41.782,113.151008 47.173,114.888434 C52.374,116.563349 58.235,115.532403 63.999,115.532403 C69.764,115.532403 75.623,116.563349 80.826,114.888434 C86.217,113.151008 90.334,108.840682 94.822,105.600992 C99.353,102.328558 104.744,99.7516899 108.043,95.2548217 C111.309,90.8045891 112.133,84.9384186 113.883,79.5872248 C115.572,74.4255504 118.436,69.2251783 118.436,63.5048682 C118.436,57.7845581 115.572,52.5831938 113.883,47.4215194 L113.883,47.4215194 Z M64,87.3178295 C50.745,87.3178295 40,76.656124 40,63.503876 C40,50.3516279 50.745,39.6899225 64,39.6899225 C77.255,39.6899225 88,50.3516279 88,63.503876 C88,76.656124 77.256,87.3178295 64,87.3178295 L64,87.3178295 Z" fill="#36B8CC"></path>
//             </g>
//             <path id="Shape" d="M60.972,97.0031628 C61.757,97.7741395 61.836,98.9618605 61.146,99.6534574 L56.615,104.203907 C55.925,104.894512 54.728,104.833984 53.943,104.061023 L53.943,104.061023 C53.157,103.293023 53.08,102.102326 53.77,101.411721 L58.301,96.8632558 C58.99,96.1696744 60.187,96.232186 60.972,97.0031628 L60.972,97.0031628 L60.972,97.0031628 Z" fill="#E7558B"></path>
//             <path id="Shape" d="M106.445,65.155969 C106.369,66.2504186 105.515,67.0789457 104.535,67.0144496 L98.103,66.5709147 C97.124,66.5044341 96.392,65.5608062 96.47,64.4693333 L96.47,64.4693333 C96.543,63.3748837 97.402,62.5443721 98.379,62.611845 L104.812,63.0543876 C105.791,63.1218605 106.523,64.0615194 106.445,65.155969 L106.445,65.155969 L106.445,65.155969 Z" fill="#FFFFFF"></path>
//             <path id="Shape" d="M29.408,59.4009302 C29.466,60.4953798 28.72,61.4251163 27.739,61.4757209 L21.302,61.8150698 C20.322,61.8666667 19.479,61.0202791 19.421,59.9268217 L19.421,59.9268217 C19.361,58.8313798 20.11,57.9026357 21.09,57.852031 L27.528,57.5136744 C28.508,57.4610853 29.35,58.3064806 29.408,59.4009302 L29.408,59.4009302 L29.408,59.4009302 Z" fill="#F9B6B5"></path>
//             <path id="Shape" d="M55.318,28.3207442 C55.209,29.4112248 54.329,30.2179225 53.351,30.1206822 L46.937,29.4866357 C45.959,29.3903876 45.256,28.4288992 45.367,27.3374264 L45.367,27.3374264 C45.475,26.2469457 46.357,25.4412403 47.333,25.5384806 L53.748,26.1715349 C54.725,26.2667907 55.428,27.2292713 55.318,28.3207442 L55.318,28.3207442 L55.318,28.3207442 Z" fill="#F9B6B5"></path>
//             <path id="Shape" d="M82.23,26.7013953 C83.324,26.5446202 84.324,27.1965271 84.463,28.1609922 L85.39,34.4915349 C85.533,35.456 84.758,36.3648992 83.666,36.5216744 L83.666,36.5216744 C82.572,36.6794419 81.572,36.0255504 81.433,35.0610853 L80.506,28.7315349 C80.365,27.7670698 81.139,26.8581705 82.23,26.7013953 L82.23,26.7013953 L82.23,26.7013953 Z" fill="#FFFFFF"></path>
//             <path id="Shape" d="M98.908,83.2476279 C99.693,84.0186047 99.773,85.2063256 99.082,85.8969302 L94.551,90.4473798 C93.862,91.1389767 92.664,91.0784496 91.879,90.3054884 L91.879,90.3054884 C91.094,89.5364961 91.016,88.3477829 91.707,87.656186 L96.238,83.1077209 C96.928,82.4171163 98.123,82.4796279 98.908,83.2476279 L98.908,83.2476279 L98.908,83.2476279 Z" fill="#97CEB4"></path>
//             <path id="Shape" d="M32.437,80.2450853 C32.029,81.2611473 30.959,81.795969 30.046,81.4387597 L24.057,79.0732403 C23.144,78.7140465 22.736,77.5957829 23.144,76.5767442 L23.144,76.5767442 C23.552,75.5577054 24.623,75.0248682 25.535,75.3850543 L31.525,77.7495814 C32.437,78.1107597 32.845,79.2290233 32.437,80.2450853 L32.437,80.2450853 L32.437,80.2450853 Z" fill="#FFFFFF"></path>
//             <path id="Shape" d="M41.446,90.8452713 C42.498,91.1786667 43.11,92.1986977 42.811,93.1284341 L40.852,99.223814 C40.553,100.150574 39.458,100.632806 38.407,100.299411 L38.407,100.299411 C37.354,99.968 36.743,98.9449922 37.042,98.0162481 L39.001,91.9228527 C39.299,90.9931163 40.395,90.5108837 41.446,90.8452713 L41.446,90.8452713 L41.446,90.8452713 Z" fill="#97CEB4"></path>
//             <path id="Shape" d="M103.887,43.7452403 C103.338,44.6948217 102.201,45.0728682 101.35,44.5876589 L95.762,41.3995659 C94.91,40.9143566 94.666,39.7494574 95.217,38.799876 L95.217,38.799876 C95.768,37.8493023 96.905,37.4732403 97.756,37.9584496 L103.344,41.1465426 C104.195,41.6327442 104.438,42.7956589 103.887,43.7452403 L103.887,43.7452403 L103.887,43.7452403 Z" fill="#F9B6B5"></path>
//             <path id="Shape" d="M71.748,17.8515349 C72.533,18.6215194 72.611,19.8082481 71.922,20.5008372 L67.391,25.0502946 C66.701,25.7428837 65.504,25.6803721 64.718,24.9093953 L64.718,24.9093953 C63.932,24.1394109 63.855,22.9516899 64.545,22.260093 L69.076,17.7106357 C69.766,17.0180465 70.963,17.0805581 71.748,17.8515349 L71.748,17.8515349 L71.748,17.8515349 Z" fill="#E7558B"></path>
//             <path id="Shape" d="M31.305,33.5925581 C32.09,34.3625426 32.169,35.5492713 31.479,36.2418605 L26.948,40.7913178 C26.258,41.483907 25.061,41.4213953 24.276,40.6504186 L24.276,40.6504186 C23.49,39.8804341 23.413,38.6927132 24.103,38.0011163 L28.634,33.4516589 C29.323,32.7590698 30.52,32.8225736 31.305,33.5925581 L31.305,33.5925581 L31.305,33.5925581 Z" fill="#97CEB4"></path>
//             <path id="Shape" d="M78.441,95.5693643 C79.545,95.5634109 80.447,96.3462946 80.453,97.3226667 L80.49,103.716713 C80.496,104.691101 79.605,105.485891 78.502,105.493829 L78.502,105.493829 C77.397,105.500775 76.496,104.715907 76.492,103.739535 L76.453,97.3444961 C76.447,96.3730853 77.338,95.5782946 78.441,95.5693643 L78.441,95.5693643 L78.441,95.5693643 Z" fill="#FFCC5E"></path>
//           </symbol>
//           <symbol id="pizza">
//             <path id="Shape" d="M118.77,0 C126.589,0 130.143,5.6587907 126.666,12.5737674 L71.775,121.786543 C68.299,128.703504 62.512,128.753116 58.911,121.898667 L1.427,12.4616434 C-2.173,5.6071938 1.279,0 9.098,0 L118.77,0 L118.77,0 Z" fill="#FFCC5E"></path>
//             <path id="Shape" d="M71.773,121.790512 L124.818,16.248062 C112.967,14.9115039 112.902,12.163969 100.581,12.163969 C88.05,12.163969 88.05,16.3264496 75.521,16.3264496 C62.992,16.3264496 62.993,12.163969 50.464,12.163969 C37.937,12.163969 37.937,16.3264496 25.409,16.3264496 C13.272,16.3264496 12.605,11.2034729 1.247,12.0796279 C1.309,12.2076279 1.358,12.3316589 1.425,12.4606512 L58.911,121.900651 C62.513,128.753116 68.299,128.702512 71.773,121.790512 L71.773,121.790512 Z" fill="#FFEEAD"></path>
//             <path id="Shape" d="M74.811,65.3236589 C75.453,64.4147597 76.632,64.1309767 77.452,64.6925891 L82.832,68.3768062 C83.651,68.9354419 83.798,70.1301085 83.157,71.0409922 L83.157,71.0409922 C82.518,71.951876 81.337,72.2336744 80.516,71.6730543 L75.137,67.9888372 C74.316,67.4272248 74.173,66.2345426 74.811,65.3236589 L74.811,65.3236589 L74.811,65.3236589 Z" fill="#ABD8B1"></path>
//             <path id="Shape" d="M60.193,111.947411 C60.833,111.038512 62.014,110.754729 62.833,111.315349 L68.211,114.999566 C69.031,115.559194 69.177,116.75386 68.537,117.663752 L68.537,117.663752 C67.896,118.574636 66.715,118.856434 65.896,118.294822 L60.518,114.610605 C59.699,114.049984 59.554,112.858295 60.193,111.947411 L60.193,111.947411 L60.193,111.947411 Z" fill="#ABD8B1"></path>
//             <path id="Shape" d="M56.324,55.4230078 C55.739,54.4793798 55.95,53.2966202 56.801,52.7826357 L62.382,49.404031 C63.232,48.888062 64.397,49.2383256 64.983,50.1819535 L64.983,50.1819535 C65.569,51.1265736 65.356,52.3083411 64.504,52.8233178 L58.923,56.2019225 C58.074,56.7168992 56.91,56.3676279 56.324,55.4230078 L56.324,55.4230078 L56.324,55.4230078 Z" fill="#ABD8B1"></path>
//             <path id="Shape" d="M47.252,67.4182946 C48.342,67.6842171 49.033,68.6705116 48.796,69.6270388 L47.239,75.9049922 C47.003,76.8635039 45.927,77.4221395 44.837,77.1611783 L44.837,77.1611783 C43.747,76.8962481 43.057,75.907969 43.294,74.9514419 L44.85,68.6744806 C45.088,67.7169612 46.164,67.1573333 47.252,67.4182946 L47.252,67.4182946 L47.252,67.4182946 Z" fill="#ABD8B1"></path>
//             <g id="Group" transform="translate(54.000000, 79.379845)">
//               <ellipse id="Oval" fill="#E7558B" cx="13.371" cy="12.7821395" rx="12.693" ry="12.5340775"></ellipse>
//               <ellipse id="Oval" fill="#F9B6B5" cx="17.898" cy="6.33351938" rx="2.031" ry="2.00533333"></ellipse>
//               <ellipse id="Oval" fill="#F9B6B5" cx="4.74" cy="12.7821395" rx="2.031" ry="2.00533333"></ellipse>
//               <ellipse id="Oval" fill="#F9B6B5" cx="20.732" cy="14.7874729" rx="2.031" ry="2.00533333"></ellipse>
//               <ellipse id="Oval" fill="#F9B6B5" cx="12.906" cy="19.8707597" rx="2.031" ry="2.00533333"></ellipse>
//             </g>
//             <g id="Group" transform="translate(24.000000, 24.806202)">
//               <ellipse id="Oval" fill="#E7558B" cx="13.161" cy="12.5817054" rx="12.693" ry="12.5330853"></ellipse>
//               <ellipse id="Oval" fill="#F9B6B5" cx="11.637" cy="8.03125581" rx="2.031" ry="2.00533333"></ellipse>
//               <ellipse id="Oval" fill="#F9B6B5" cx="6.306" cy="15.7330853" rx="2.031" ry="2.00533333"></ellipse>
//               <ellipse id="Oval" fill="#F9B6B5" cx="15.699" cy="19.7437519" rx="2.031" ry="2.00533333"></ellipse>
//               <ellipse id="Oval" fill="#F9B6B5" cx="22.046" cy="12.5817054" rx="2.031" ry="2.00533333"></ellipse>
//             </g>
//             <path id="Shape" d="M109.486,27.6271628 C102.474,27.6271628 96.793,33.2383256 96.793,40.1612403 C96.793,46.1236589 101.014,51.1047442 106.664,52.3728372 L117.63,30.5523101 C115.426,28.7285581 112.586,27.6271628 109.486,27.6271628 L109.486,27.6271628 Z" fill="#E7558B"></path>
//             <ellipse id="Oval" fill="#F9B6B5" cx="111.009" cy="35.6107907" rx="2.031" ry="2.00533333"></ellipse>
//             <ellipse id="Oval" fill="#F9B6B5" cx="102.631" cy="43.3126202" rx="2.031" ry="2.00533333"></ellipse>
//             <path id="Shape" d="M75.811,24.9133643 C76.869,24.5402791 77.997,24.9867907 78.332,25.9125581 L80.541,31.9980155 C80.878,32.9257674 80.294,33.9795349 79.236,34.3536124 L79.236,34.3536124 C78.181,34.7276899 77.051,34.2791938 76.716,33.3524341 L74.506,27.267969 C74.172,26.3402171 74.756,25.2864496 75.811,24.9133643 L75.811,24.9133643 L75.811,24.9133643 Z" fill="#ABD8B1"></path>
//           </symbol>
//           <symbol id="watermelon">
//             <path id="Shape" d="M64,0 C28.654,0 0,28.431876 0,63.5048682 C0,98.575876 28.654,127.007752 64,127.007752 C99.346,127.007752 128,98.575876 128,63.5048682 C128,28.431876 99.346,0 64,0 L64,0 Z" fill="#97CEB4"></path>
//             <path id="Shape" d="M63.999,4.74393798 C31.294,4.74393798 4.78,31.0504186 4.78,63.503876 C4.78,95.9563411 31.294,122.263814 63.999,122.263814 C96.706,122.263814 123.221,95.9553488 123.221,63.503876 C123.221,31.0504186 96.706,4.74393798 63.999,4.74393798 L63.999,4.74393798 Z" fill="#FFFFFF"></path>
//             <path id="Shape" d="M64,10.8581705 C34.697,10.8581705 10.944,34.428031 10.944,63.503876 C10.944,92.5797209 34.697,116.149581 64,116.149581 C93.303,116.149581 117.057,92.5797209 117.057,63.503876 C117.057,34.428031 93.303,10.8581705 64,10.8581705 L64,10.8581705 Z" fill="#E7558B"></path>
//             <path id="Shape" d="M89.547,33.5776744 C89.305,32.508031 89.881,31.4671628 90.838,31.2528372 L97.125,29.8408682 C98.084,29.6255504 99.057,30.3171473 99.301,31.3867907 L99.301,31.3867907 C99.545,32.4554419 98.966,33.4973023 98.008,33.7116279 L91.723,35.1235969 C90.766,35.3389147 89.791,34.6463256 89.547,33.5776744 L89.547,33.5776744 L89.547,33.5776744 Z" fill="#2E3339"></path>
//             <path id="Shape" d="M28.613,92.6581085 C28.754,91.5706047 29.656,90.7877209 30.631,90.9127442 L37.024,91.7244031 C37.999,91.8484341 38.674,92.8287752 38.534,93.9162791 L38.534,93.9162791 C38.394,95.0047752 37.49,95.7856744 36.516,95.6616434 L30.122,94.8489922 C29.149,94.7259535 28.474,93.7446202 28.613,92.6581085 L28.613,92.6581085 L28.613,92.6581085 Z" fill="#2E3339"></path>
//             <path id="Shape" d="M89.65,92.7295504 C89.728,91.6351008 90.584,90.8045891 91.562,90.872062 L97.993,91.3155969 C98.972,91.3830698 99.705,92.3247132 99.629,93.416186 L99.629,93.416186 C99.553,94.5106357 98.693,95.3411473 97.715,95.2726822 L91.285,94.8291473 C90.307,94.7636589 89.574,93.8220155 89.65,92.7295504 L89.65,92.7295504 L89.65,92.7295504 Z" fill="#2E3339"></path>
//             <path id="Shape" d="M28.372,33.047814 C28.294,31.9543566 29.023,31.0107287 30.003,30.9422636 L36.432,30.487814 C37.412,30.4193488 38.269,31.2488682 38.348,32.3423256 L38.348,32.3423256 C38.427,33.4357829 37.695,34.3784186 36.717,34.4468837 L30.287,34.9013333 C29.308,34.9717829 28.451,34.1402791 28.372,33.047814 L28.372,33.047814 L28.372,33.047814 Z" fill="#2E3339"></path>
//             <path id="Shape" d="M104.096,58.9772403 C104.967,58.3025116 106.162,58.3749457 106.768,59.1429457 L110.742,64.1786047 C111.346,64.9466047 111.133,66.1154729 110.263,66.7911938 L110.263,66.7911938 C109.394,67.467907 108.197,67.3915039 107.592,66.6244961 L103.618,61.587845 C103.012,60.8218295 103.229,59.6529612 104.096,58.9772403 L104.096,58.9772403 L104.096,58.9772403 Z" fill="#2E3339"></path>
//             <path id="Shape" d="M17.228,66.3357519 C16.46,65.5469147 16.407,64.3611783 17.114,63.6834729 L21.745,59.2352248 C22.451,58.5565271 23.645,58.6458295 24.414,59.4336744 L24.414,59.4336744 C25.182,60.2205271 25.232,61.4092403 24.527,62.0859535 L19.896,66.5342016 C19.19,67.2109147 17.996,67.1216124 17.228,66.3357519 L17.228,66.3357519 L17.228,66.3357519 Z" fill="#2E3339"></path>
//             <path id="Shape" d="M67.727,102.420837 C68.461,103.237457 68.468,104.426171 67.735,105.076093 L62.934,109.341767 C62.202,109.990698 61.012,109.857736 60.275,109.039132 L60.275,109.039132 C59.538,108.223504 59.535,107.033798 60.267,106.382884 L65.069,102.118202 C65.799,101.468279 66.988,101.604217 67.727,102.420837 L67.727,102.420837 L67.727,102.420837 Z" fill="#2E3339"></path>
//             <path id="Shape" d="M63.97,15.0782016 C65.074,15.0722481 65.976,15.8551318 65.98,16.8305116 L66.019,23.2255504 C66.025,24.199938 65.133,24.9947287 64.029,25.0016744 L64.029,25.0016744 C62.925,25.0086202 62.024,24.2227597 62.019,23.2483721 L61.981,16.8533333 C61.975,15.8789457 62.866,15.0851473 63.97,15.0782016 L63.97,15.0782016 L63.97,15.0782016 Z" fill="#2E3339"></path>
//             <path id="Shape" d="M80.988,43.6162481 C81.967,43.1092093 83.131,43.3949767 83.586,44.2592248 L86.572,49.9269457 C87.027,50.7902016 86.601,51.9015194 85.623,52.4095504 L85.623,52.4095504 C84.644,52.9175814 83.48,52.6288372 83.027,51.7655814 L80.041,46.0978605 C79.586,45.2346047 80.012,44.1232868 80.988,43.6162481 L80.988,43.6162481 L80.988,43.6162481 Z" fill="#2E3339"></path>
//             <path id="Shape" d="M64.059,83.576062 C64.603,84.5315969 64.353,85.6925271 63.498,86.1727752 L57.89,89.3261395 C57.036,89.8053953 55.902,89.4233798 55.357,88.4698295 L55.357,88.4698295 C54.813,87.5162791 55.065,86.3533643 55.919,85.8731163 L61.527,82.7207442 C62.38,82.2385116 63.514,82.6244961 64.059,83.576062 L64.059,83.576062 L64.059,83.576062 Z" fill="#2E3339"></path>
//             <path id="Shape" d="M38.156,58.6974264 C38.785,57.7964651 39.948,57.5126822 40.756,58.0683411 L46.058,61.7059225 C46.866,62.2605891 47.011,63.4403721 46.383,64.3413333 L46.383,64.3413333 C45.755,65.2432868 44.59,65.524093 43.783,64.9714109 L38.482,61.3328372 C37.673,60.7791628 37.529,59.5983876 38.156,58.6974264 L38.156,58.6974264 L38.156,58.6974264 Z" fill="#2E3339"></path>
//             <path id="Shape" d="M49.898,43.2362171 C49.526,42.2042791 49.971,41.1008992 50.896,40.7724651 L56.963,38.6133333 C57.887,38.283907 58.939,38.8544496 59.312,39.8853953 L59.312,39.8853953 C59.685,40.9173333 59.237,42.0207132 58.313,42.348155 L52.246,44.5072868 C51.322,44.8377054 50.271,44.2661705 49.898,43.2362171 L49.898,43.2362171 L49.898,43.2362171 Z" fill="#2E3339"></path>
//             <path id="Shape" d="M62.275,68.5435039 C61.544,67.7219225 61.544,66.5351938 62.28,65.8872558 L67.106,61.6483721 C67.84,61.0024186 69.03,61.1443101 69.762,61.963907 L69.762,61.963907 C70.494,62.7844961 70.491,63.9742016 69.756,64.6191628 L64.932,68.8580465 C64.197,69.5049922 63.008,69.3621085 62.275,68.5435039 L62.275,68.5435039 L62.275,68.5435039 Z" fill="#2E3339"></path>
//             <path id="Shape" d="M87.291,69.8225116 C88.283,69.3412713 89.437,69.6577984 89.869,70.5339535 L92.705,76.2770853 C93.137,77.1522481 92.684,78.2516589 91.689,78.7348837 L91.689,78.7348837 C90.699,79.216124 89.543,78.8976124 89.113,78.0224496 L86.277,72.2783256 C85.846,71.404155 86.301,70.3047442 87.291,69.8225116 L87.291,69.8225116 L87.291,69.8225116 Z" fill="#2E3339"></path>
//           </symbol>
//           <symbol id="hamburger" transform="translate(1.000000, 0.992248)">
//             <path id="Shape" d="M84.43,49.6243101 L100.981,19.4887442 C90.838,10.6875039 77.568,5.34325581 63.036,5.34325581 C31.177,5.34325581 5.35,30.9690543 5.35,62.584062 C5.35,64.4782636 5.449,66.3506357 5.63,68.1972093 L54.304,65.3534264 L26.389,106.787721 C36.353,114.931101 49.119,119.822884 63.036,119.822884 C94.896,119.822884 120.724,94.1980775 120.724,62.5850543 C120.724,60.9746357 120.64,59.384062 120.508,57.8073798 L84.43,49.6243101 L84.43,49.6243101 Z" fill="#885632"></path>
//             <path id="Shape" d="M104.65,21.0455814 C105.412,20.2587287 105.292,19.1126822 104.381,18.4984806 C104.381,18.4984806 101.323,16.4316279 99.054,14.7924341 C93.818,11.011969 88.841,6.31962791 82.554,4.29345736 C76.484,2.33773643 69.706,3.16725581 62.981,3.16725581 C56.256,3.16725581 49.48,2.33872868 43.411,4.29345736 C37.121,6.32062016 32.145,11.0139535 26.91,14.7934264 C24.679,16.4048372 21.701,18.4151318 21.701,18.4151318 C20.792,19.0293333 20.67,20.1763721 21.43,20.9652093 L60.19,61.1631628 C60.951,61.952 60.949,63.239938 60.187,64.0267907 L21.433,104.034233 C20.671,104.821085 20.791,105.967132 21.7,106.581333 C21.7,106.581333 24.758,108.648186 27.03,110.28738 C32.264,114.066853 37.241,118.760186 43.531,120.785364 C49.599,122.741085 56.377,121.91355 63.103,121.91355 C69.828,121.91355 76.605,122.741085 82.674,120.785364 C88.962,118.760186 93.94,114.066853 99.174,110.285395 C101.404,108.674977 104.383,106.66369 104.383,106.66369 C105.292,106.050481 105.414,104.90245 104.654,104.113612 L65.893,63.9176434 C65.132,63.1297984 65.134,61.839876 65.897,61.0530233 L104.65,21.0455814 L104.65,21.0455814 Z" fill="#97CEB4"></path>
//             <g id="Group" transform="translate(81.000000, 21.829457)">
//               <ellipse id="Oval" fill="#E7558B" cx="20.021" cy="20.4026047" rx="19.593" ry="19.4411163"></ellipse>
//               <g id="Shape" opacity="0.6" transform="translate(4.000000, 3.968992)" fill="#F9B6B5">
//                 <path d="M16.63,14.4997209 L29.008,7.91317829 C24.889,1.7175814 16.867,-0.692589147 9.979,2.19683721 L16.63,14.4997209 L16.63,14.4997209 Z"></path>
//                 <path d="M17.98,17.0031628 L24.628,29.3070388 C30.864,25.2090543 33.281,17.2472558 30.357,10.4156279 L17.98,17.0031628 L17.98,17.0031628 Z"></path>
//                 <path d="M15.46,18.3456744 L3.034,24.9550388 C7.164,31.1665116 15.21,33.5697364 22.109,30.6505426 L15.46,18.3456744 L15.46,18.3456744 Z"></path>
//                 <path d="M14.105,15.8412403 L7.455,3.53537984 C1.189,7.62443411 -1.246,15.604093 1.684,22.4535814 L14.105,15.8412403 L14.105,15.8412403 Z"></path>
//               </g>
//             </g>
//             <path id="Shape" d="M65.828,123.209426 C64.271,124.754357 61.727,124.754357 60.171,123.209426 L1.829,65.3186977 C0.273,63.7747597 0.273,61.2484961 1.829,59.7055504 L60.171,1.81482171 C61.727,0.270883721 64.272,0.270883721 65.828,1.81482171 L124.172,59.7055504 C125.729,61.2494884 125.729,63.7757519 124.172,65.3186977 L65.828,123.209426 L65.828,123.209426 Z" fill="#FFCC5E"></path>
//             <g id="Group" transform="translate(5.000000, 62.511628)">
//               <path id="Shape" d="M10.808,2.59869767 C20.345,-2.47665116 32.222,1.07956589 37.336,10.5446202 C42.45,20.0076899 38.864,31.7906357 29.328,36.864 C19.791,41.9393488 7.914,38.3811473 2.8,28.920062 C-2.314,19.4550078 1.272,7.67404651 10.808,2.59869767 L10.808,2.59869767 Z" fill="#E7558B"></path>
//               <g id="Shape" opacity="0.6" transform="translate(4.000000, 3.968992)" fill="#F9B6B5">
//                 <path d="M16.676,13.827969 L29.054,7.24043411 C24.936,1.04483721 16.914,-1.36434109 10.025,1.52508527 L16.676,13.827969 L16.676,13.827969 Z"></path>
//                 <path d="M18.028,16.3314109 L24.677,28.6352868 C30.912,24.5382946 33.329,16.5755039 30.406,9.74387597 L18.028,16.3314109 L18.028,16.3314109 Z"></path>
//                 <path d="M15.506,17.6729302 L3.081,24.2832868 C7.211,30.4947597 15.257,32.8979845 22.156,29.9787907 L15.506,17.6729302 L15.506,17.6729302 Z"></path>
//                 <path d="M14.154,15.1704806 L7.503,2.86263566 C1.236,6.95168992 -1.2,14.9323411 1.73,21.7808372 L14.154,15.1704806 L14.154,15.1704806 Z"></path>
//               </g>
//             </g>
//             <g id="Group" transform="translate(11.000000, 10.914729)">
//               <path id="Shape" d="M52.036,0.384992248 C23.492,0.384992248 0.353,23.3446202 0.353,51.6673488 C0.353,79.9900775 23.491,102.949705 52.036,102.949705 C80.58,102.949705 103.723,79.9900775 103.723,51.6673488 C103.723,23.3446202 80.58,0.384992248 52.036,0.384992248 L52.036,0.384992248 Z" fill="#FFEEAD"></path>
//               <g id="Shape" transform="translate(11.000000, 13.891473)" fill="#FFFFFF">
//                 <path d="M82.096,38.7324031 C82.022,39.796093 81.19,40.6067597 80.235,40.5422636 L73.971,40.1086512 C73.018,40.044155 72.303,39.1273178 72.379,38.0606512 L72.379,38.0606512 C72.451,36.995969 73.286,36.1862946 74.238,36.2517829 L80.505,36.6844031 C81.458,36.7508837 82.172,37.6677209 82.096,38.7324031 L82.096,38.7324031 L82.096,38.7324031 Z"></path>
//                 <path d="M32.292,2.85072868 C32.186,3.91243411 31.329,4.69928682 30.376,4.60502326 L24.128,3.98784496 C23.175,3.89457364 22.491,2.95689922 22.598,1.89420155 L22.598,1.89420155 C22.703,0.832496124 23.562,0.047627907 24.513,0.141891473 L30.762,0.758077519 C31.713,0.850356589 32.398,1.78703876 32.292,2.85072868 L32.292,2.85072868 L32.292,2.85072868 Z"></path>
//                 <path d="M64.124,6.07851163 C65.189,5.92570543 66.163,6.56074419 66.3,7.5004031 L67.202,13.6672248 C67.341,14.6058915 66.588,15.491969 65.523,15.6447752 L65.523,15.6447752 C64.459,15.7985736 63.484,15.1615504 63.347,14.2218915 L62.445,8.05606202 C62.307,7.1164031 63.061,6.23131783 64.124,6.07851163 L64.124,6.07851163 L64.124,6.07851163 Z"></path>
//                 <path d="M74.753,56.3567132 C75.52,57.1088372 75.596,58.263814 74.923,58.9385426 L70.509,63.371907 C69.837,64.0466357 68.671,63.9851163 67.906,63.2329922 L67.906,63.2329922 C67.14,62.4828527 67.064,61.3258915 67.738,60.6531473 L72.152,56.2207752 C72.824,55.5460465 73.988,55.6085581 74.753,56.3567132 L74.753,56.3567132 L74.753,56.3567132 Z"></path>
//                 <path d="M10.002,53.4325581 C9.605,54.4228217 8.563,54.9437519 7.673,54.5954729 L1.839,52.2914729 C0.95,51.9402171 0.552,50.8517209 0.95,49.8594729 L0.95,49.8594729 C1.347,48.8672248 2.391,48.3492713 3.279,48.6985426 L9.114,51.0015504 C10.002,51.3508217 10.4,52.4403101 10.002,53.4325581 L10.002,53.4325581 L10.002,53.4325581 Z"></path>
//                 <path d="M18.779,63.755907 C19.803,64.0813643 20.4,65.0755969 20.109,65.9785426 L18.2,71.9171473 C17.909,72.820093 16.843,73.2894264 15.818,72.9669457 L15.818,72.9669457 C14.793,72.6434729 14.197,71.6472558 14.488,70.7423256 L16.396,64.8096744 C16.687,63.9007752 17.754,63.4304496 18.779,63.755907 L18.779,63.755907 L18.779,63.755907 Z"></path>
//                 <path d="M48.295,0.627100775 C49.061,1.37724031 49.137,2.53221705 48.465,3.20793798 L44.051,7.63931783 C43.378,8.31404651 42.213,8.25351938 41.448,7.5023876 L41.448,7.5023876 C40.682,6.75224806 40.607,5.59528682 41.28,4.92155039 L45.694,0.490170543 C46.365,-0.18455814 47.529,-0.12303876 48.295,0.627100775 L48.295,0.627100775 L48.295,0.627100775 Z"></path>
//                 <path d="M8.27,24.1116279 C9.035,24.8617674 9.113,26.0167442 8.439,26.6924651 L4.025,31.123845 C3.354,31.7985736 2.187,31.7380465 1.422,30.9869147 L1.422,30.9869147 C0.657,30.2367752 0.581,29.079814 1.255,28.4060775 L5.669,23.9746977 C6.34,23.299969 7.505,23.3614884 8.27,24.1116279 L8.27,24.1116279 L8.27,24.1116279 Z"></path>
//                 <path d="M45.871,65.7830698 C46.947,65.7771163 47.825,66.5411473 47.83,67.4907287 L47.867,73.7190698 C47.873,74.6686512 47.005,75.4435969 45.929,75.4495504 L45.929,75.4495504 C44.853,75.4574884 43.976,74.6894884 43.97,73.7418915 L43.933,67.5115659 C43.928,66.5619845 44.796,65.7890233 45.871,65.7830698 L45.871,65.7830698 L45.871,65.7830698 Z"></path>
//                 <path d="M27.701,32.6628217 C26.885,33.3583876 25.721,33.3395349 25.097,32.6191628 L21.008,27.888124 C20.386,27.1677519 20.544,26.0207132 21.362,25.3271318 L21.362,25.3271318 C22.176,24.6305736 23.344,24.6514109 23.966,25.3727752 L28.055,30.1028217 C28.676,30.8222016 28.519,31.9692403 27.701,32.6628217 L27.701,32.6628217 L27.701,32.6628217 Z"></path>
//                 <path d="M66.629,29.8696434 C65.887,30.6406202 64.725,30.7368682 64.032,30.0790078 L59.497,25.7686822 C58.807,25.1128062 58.85,23.9548527 59.596,23.1848682 L59.596,23.1848682 C60.338,22.4128992 61.502,22.3196279 62.192,22.9774884 L66.729,27.2868217 C67.417,27.9426977 67.375,29.0996589 66.629,29.8696434 L66.629,29.8696434 L66.629,29.8696434 Z"></path>
//                 <path d="M52.777,53.0773333 C51.779,53.4722481 50.681,53.0793178 50.328,52.1972093 L48.007,46.4084341 C47.654,45.5253333 48.178,44.4904186 49.18,44.0964961 L49.18,44.0964961 C50.177,43.7015814 51.276,44.0964961 51.628,44.9786047 L53.948,50.7693643 C54.303,51.6514729 53.779,52.6863876 52.777,53.0773333 L52.777,53.0773333 L52.777,53.0773333 Z"></path>
//                 <path d="M45.896,22.8733023 C45.822,23.9379845 44.99,24.7486512 44.035,24.684155 L37.77,24.2515349 C36.817,24.1860465 36.103,23.2692093 36.18,22.2045271 L36.18,22.2045271 C36.252,21.139845 37.087,20.328186 38.041,20.3956589 L44.307,20.8272868 C45.258,20.8927752 45.971,21.8086202 45.896,22.8733023 L45.896,22.8733023 L45.896,22.8733023 Z"></path>
//                 <path d="M33.401,49.3970853 C33.901,50.3407132 33.624,51.4629457 32.777,51.9064806 L27.217,54.8058295 C26.371,55.2473798 25.279,54.8385736 24.78,53.8929612 L24.78,53.8929612 C24.278,52.9493333 24.558,51.8251163 25.405,51.3855504 L30.964,48.4842171 C31.811,48.0426667 32.902,48.4514729 33.401,49.3970853 L33.401,49.3970853 L33.401,49.3970853 Z"></path>
//               </g>
//             </g>
//           </symbol>
//           <symbol id="kiwi">
//             <path id="Shape" d="M64,0 C28.654,0 0,28.431876 0,63.5048682 C0,98.575876 28.654,127.007752 64,127.007752 C99.346,127.007752 128,98.575876 128,63.5048682 C128,28.431876 99.346,0 64,0 L64,0 Z" fill="#875632"></path>
//             <path id="Shape" d="M63.999,4.74294574 C31.294,4.74294574 4.78,31.0514109 4.78,63.5048682 C4.78,95.9563411 31.294,122.264806 63.999,122.264806 C96.706,122.264806 123.22,95.9563411 123.22,63.5048682 C123.22,31.0514109 96.706,4.74294574 63.999,4.74294574 L63.999,4.74294574 Z" fill="#96CDB3"></path>
//             <path id="Shape" d="M64.772,10.8581705 C35.47,10.8581705 11.717,34.428031 11.717,63.503876 C11.717,92.5797209 35.47,116.149581 64.773,116.149581 C94.076,116.149581 117.83,92.5797209 117.83,63.503876 C117.83,34.428031 94.075,10.8581705 64.772,10.8581705 L64.772,10.8581705 Z" fill="#AAD7B0"></path>
//             <path id="Shape" d="M37.699,63.503876 C37.699,60.9022016 42.016,59.0099845 42.785,56.6633178 C43.581,54.2303256 41.237,50.1869147 42.722,48.1627287 C44.222,46.1177054 48.832,47.088124 50.893,45.5997519 C52.934,44.1262636 53.419,39.4676589 55.871,38.6778295 C58.236,37.9157829 61.378,41.3757519 64,41.3757519 C66.622,41.3757519 69.765,37.9157829 72.13,38.6778295 C74.581,39.4676589 75.068,44.1262636 77.108,45.5997519 C79.17,47.088124 83.779,46.1177054 85.279,48.1627287 C86.764,50.187907 84.42,54.2303256 85.216,56.6633178 C85.985,59.0099845 90.302,60.9022016 90.302,63.503876 C90.302,66.1055504 85.985,67.9967752 85.216,70.3444341 C84.42,72.7774264 86.765,76.8208372 85.279,78.8450233 C83.779,80.8910388 79.169,79.9206202 77.108,81.408 C75.067,82.8814884 74.582,87.540093 72.13,88.3299225 C69.765,89.0929612 66.621,85.632 64,85.632 C61.378,85.632 58.236,89.091969 55.871,88.3299225 C53.419,87.540093 52.933,82.8824806 50.892,81.408 C48.831,79.9196279 44.221,80.8900465 42.721,78.8450233 C41.236,76.819845 43.58,72.7764341 42.784,70.3444341 C42.017,67.9967752 37.699,66.1045581 37.699,63.503876 L37.699,63.503876 Z" fill="#FFFFFF"></path>
//             <path id="Shape" d="M89.563,95.4483101 C90.226,96.3254574 90.045,97.5697364 89.162,98.2256124 L89.162,98.2256124 C88.277,98.8834729 87.025,98.7048682 86.362,97.8277209 L82.765,93.0629457 C82.103,92.1857984 82.283,90.9415194 83.167,90.2856434 L83.167,90.2856434 C84.051,89.6277829 85.304,89.8063876 85.966,90.6835349 L89.563,95.4483101 L89.563,95.4483101 Z" fill="#2E3238"></path>
//             <path id="Shape" d="M45.063,34.4250543 C45.726,35.3022016 45.545,36.5464806 44.662,37.2023566 L44.662,37.2023566 C43.777,37.8602171 42.525,37.6816124 41.862,36.8044651 L38.265,32.0396899 C37.603,31.1625426 37.783,29.9182636 38.667,29.2623876 L38.667,29.2623876 C39.551,28.6045271 40.804,28.7831318 41.466,29.6602791 L45.063,34.4250543 L45.063,34.4250543 Z" fill="#2E3238"></path>
//             <path id="Shape" d="M86.795,37.2589147 C86.091,38.1043101 84.831,38.2223876 83.98,37.523845 L83.98,37.523845 C83.129,36.8262946 83.01,35.5740775 83.713,34.7306667 L87.537,30.1425116 C88.241,29.2981085 89.501,29.180031 90.352,29.8785736 L90.352,29.8785736 C91.203,30.576124 91.323,31.8283411 90.619,32.6717519 L86.795,37.2589147 L86.795,37.2589147 Z" fill="#2E3238"></path>
//             <path id="Shape" d="M40.586,97.0418605 C39.912,97.9100775 38.656,98.0708217 37.781,97.4020465 L37.781,97.4020465 C36.906,96.7332713 36.744,95.4870078 37.419,94.6187907 L41.081,89.9036279 C41.756,89.0354109 43.012,88.8746667 43.887,89.5434419 L43.887,89.5434419 C44.761,90.2122171 44.924,91.4584806 44.249,92.3266977 L40.586,97.0418605 L40.586,97.0418605 Z" fill="#2E3238"></path>
//             <path id="Shape" d="M31.189,51.599876 C32.25,51.9064806 32.858,53.0088682 32.549,54.0606512 L32.549,54.0606512 C32.24,55.1134264 31.13,55.7167132 30.07,55.4091163 L24.309,53.744124 C23.248,53.4365271 22.64,52.3351318 22.949,51.2833488 L22.949,51.2833488 C23.259,50.2305736 24.369,49.6262946 25.429,49.9338915 L31.189,51.599876 L31.189,51.599876 Z" fill="#2E3238"></path>
//             <path id="Shape" d="M103.425,73.4094884 C104.487,73.7111318 105.102,74.8085581 104.799,75.8633178 L104.799,75.8633178 C104.496,76.9170853 103.389,77.5273178 102.326,77.2266667 L96.556,75.5924341 C95.494,75.2917829 94.879,74.1933643 95.182,73.1395969 L95.182,73.1395969 C95.486,72.0858295 96.592,71.4746047 97.655,71.7762481 L103.425,73.4094884 L103.425,73.4094884 Z" fill="#2E3238"></path>
//             <path id="Shape" d="M102.29,49.916031 C103.349,49.6014884 104.462,50.1968372 104.78,51.2466357 L104.78,51.2466357 C105.097,52.2964341 104.497,53.4027907 103.438,53.7183256 L97.691,55.427969 C96.633,55.7435039 95.518,55.1471628 95.201,54.0983566 L95.201,54.0983566 C94.885,53.0475659 95.484,51.9412093 96.543,51.6266667 L102.29,49.916031 L102.29,49.916031 Z" fill="#2E3238"></path>
//             <path id="Shape" d="M30.048,71.784186 C31.107,71.4696434 32.22,72.0649922 32.538,73.1147907 L32.538,73.1147907 C32.855,74.1645891 32.255,75.2709457 31.196,75.5864806 L25.449,77.296124 C24.391,77.6116589 23.276,77.0153178 22.959,75.9665116 L22.959,75.9665116 C22.643,74.9157209 23.242,73.8093643 24.301,73.4948217 L30.048,71.784186 L30.048,71.784186 Z" fill="#2E3238"></path>
//             <path id="Shape" d="M66,28.7751938 C66,29.8706357 65.104,30.7596899 64,30.7596899 L64,30.7596899 C62.896,30.7596899 62,29.8706357 62,28.7751938 L62,22.8217054 C62,21.7262636 62.896,20.8372093 64,20.8372093 L64,20.8372093 C65.104,20.8372093 66,21.7262636 66,22.8217054 L66,28.7751938 L66,28.7751938 Z" fill="#2E3238"></path>
//             <path id="Shape" d="M66,104.186047 C66,105.281488 65.104,106.170543 64,106.170543 L64,106.170543 C62.896,106.170543 62,105.281488 62,104.186047 L62,98.2325581 C62,97.1371163 62.896,96.248062 64,96.248062 L64,96.248062 C65.104,96.248062 66,97.1371163 66,98.2325581 L66,104.186047 L66,104.186047 Z" fill="#2E3238"></path>
//           </symbol>
//           <symbol id="orange">
//             <path id="Shape" d="M64,0 C28.654,0 0,28.431876 0,63.5048682 C0,98.575876 28.654,127.007752 64,127.007752 C99.346,127.007752 128,98.575876 128,63.5048682 C128,28.431876 99.346,0 64,0 L64,0 Z" fill="#FFCB5E"></path>
//             <path id="Shape" d="M63.999,4.74294574 C31.294,4.74294574 4.78,31.0514109 4.78,63.5048682 C4.78,95.9563411 31.294,122.264806 63.999,122.264806 C96.706,122.264806 123.22,95.9563411 123.22,63.5048682 C123.22,31.0514109 96.706,4.74294574 63.999,4.74294574 L63.999,4.74294574 Z" fill="#FFFFFF"></path>
//             <path id="Shape" d="M64,10.8581705 C34.697,10.8581705 10.943,34.428031 10.943,63.503876 C10.943,92.5797209 34.697,116.149581 64,116.149581 C93.303,116.149581 117.057,92.5797209 117.057,63.503876 C117.057,34.428031 93.303,10.8581705 64,10.8581705 L64,10.8581705 Z" fill="#FFEDAC"></path>
//             <path id="Shape" d="M26.483,100.730047 L101.517,26.2777054" stroke="#FFFFFF" stroke-width="4"></path>
//             <path id="Shape" d="M26.483,26.2777054 L101.517,100.730047" stroke="#FFFFFF" stroke-width="4"></path>
//             <path id="Shape" d="M10.943,63.503876 L117.057,63.503876" stroke="#FFFFFF" stroke-width="4"></path>
//             <path id="Shape" d="M64,10.8581705 L64,116.149581" stroke="#FFFFFF" stroke-width="4"></path>
//             <ellipse id="Oval" fill="#FFFFFF" cx="64" cy="63.5822636" rx="12.403" ry="12.3068527"></ellipse>
//             <g id="Group">
//               <path id="Shape" d="M64,0 C28.654,0 0,28.431876 0,63.5048682 C0,98.575876 28.654,127.007752 64,127.007752 C99.346,127.007752 128,98.575876 128,63.5048682 C128,28.431876 99.346,0 64,0 L64,0 Z" fill="#F79C53"></path>
//               <path id="Shape" d="M63.999,4.74294574 C31.294,4.74294574 4.78,31.0514109 4.78,63.5048682 C4.78,95.9563411 31.294,122.264806 63.999,122.264806 C96.706,122.264806 123.22,95.9563411 123.22,63.5048682 C123.22,31.0514109 96.706,4.74294574 63.999,4.74294574 L63.999,4.74294574 Z" fill="#FFFFFF"></path>
//               <path id="Shape" d="M64,10.8581705 C34.697,10.8581705 10.943,34.428031 10.943,63.503876 C10.943,92.5797209 34.697,116.149581 64,116.149581 C93.303,116.149581 117.057,92.5797209 117.057,63.503876 C117.057,34.428031 93.303,10.8581705 64,10.8581705 L64,10.8581705 Z" fill="#FFCB5E"></path>
//               <path id="Shape" d="M26.483,100.730047 L101.517,26.2777054" stroke="#FFFFFF" stroke-width="4"></path>
//               <path id="Shape" d="M26.483,26.2777054 L101.517,100.730047" stroke="#FFFFFF" stroke-width="4"></path>
//               <path id="Shape" d="M10.943,63.503876 L117.057,63.503876" stroke="#FFFFFF" stroke-width="4"></path>
//               <path id="Shape" d="M64,10.8581705 L64,116.149581" stroke="#FFFFFF" stroke-width="4"></path>
//               <ellipse id="Oval" fill="#FFFFFF" cx="63.921" cy="63.5822636" rx="12.403" ry="12.3068527"></ellipse>
//             </g>
//             <path id="Shape" d="M30.914,75.9942946 C31.935,75.5735814 33.104,76.0538295 33.528,77.0649302 L33.528,77.0649302 C33.952,78.0780155 33.468,79.2379535 32.449,79.6596589 L26.909,81.9448062 C25.889,82.3645271 24.719,81.8852713 24.294,80.8741705 L24.294,80.8741705 C23.871,79.8610853 24.354,78.7011473 25.374,78.2804341 L30.914,75.9942946 L30.914,75.9942946 Z" fill="#FFEDAC"></path>
//             <path id="Shape" d="M101.092,47.0474419 C102.112,46.6267287 103.282,47.1059845 103.707,48.1180775 L103.707,48.1180775 C104.13,49.1301705 103.647,50.2911008 102.627,50.711814 L97.087,52.9969612 C96.066,53.4186667 94.897,52.9374264 94.473,51.9273178 L94.473,51.9273178 C94.048,50.9142326 94.533,49.7542946 95.552,49.3325891 L101.092,47.0474419 L101.092,47.0474419 Z" fill="#FFEDAC"></path>
//             <path id="Shape" d="M32.41,49.4129612 C33.431,49.8306977 33.917,50.9916279 33.496,52.0037209 L33.496,52.0037209 C33.074,53.0168062 31.905,53.4990388 30.884,53.0813023 L25.338,50.8100465 C24.317,50.3913178 23.831,49.2313798 24.252,48.2182946 L24.252,48.2182946 C24.674,47.2052093 25.843,46.7229767 26.864,47.1417054 L32.41,49.4129612 L32.41,49.4129612 Z" fill="#FFEDAC"></path>
//             <path id="Shape" d="M102.662,78.1822016 C103.683,78.6009302 104.169,79.7608682 103.748,80.7739535 L103.748,80.7739535 C103.326,81.7870388 102.157,82.2692713 101.136,81.8505426 L95.59,79.5792868 C94.569,79.1615504 94.083,78.0006202 94.504,76.9885271 L94.504,76.9885271 C94.926,75.9754419 96.095,75.4932093 97.116,75.9109457 L102.662,78.1822016 L102.662,78.1822016 Z" fill="#FFEDAC"></path>
//             <path id="Shape" d="M52.412,31.6666047 C52.836,32.6796899 52.352,33.8396279 51.333,34.2603411 L51.333,34.2603411 C50.312,34.6810543 49.143,34.2008062 48.718,33.1897054 L46.415,27.6926512 C45.992,26.6805581 46.475,25.5196279 47.494,25.0979225 L47.494,25.0979225 C48.515,24.6782016 49.684,25.1574574 50.108,26.1695504 L52.412,31.6666047 L52.412,31.6666047 Z" fill="#FFEDAC"></path>
//             <path id="Shape" d="M81.585,101.300589 C82.009,102.312682 81.526,103.473612 80.506,103.895318 L80.506,103.895318 C79.486,104.315039 78.316,103.835783 77.892,102.82369 L75.589,97.3266357 C75.164,96.3135504 75.649,95.1536124 76.667,94.7328992 L76.667,94.7328992 C77.688,94.3111938 78.857,94.7924341 79.282,95.8035349 L81.585,101.300589 L81.585,101.300589 Z" fill="#FFEDAC"></path>
//             <path id="Shape" d="M79.201,33.1510078 C78.78,34.164093 77.61,34.6463256 76.59,34.2285891 L76.59,34.2285891 C75.569,33.8098605 75.083,32.6499225 75.504,31.6368372 L77.793,26.1338295 C78.215,25.1207442 79.384,24.6385116 80.405,25.0562481 L80.405,25.0562481 C81.426,25.4749767 81.912,26.6349147 81.49,27.648 L79.201,33.1510078 L79.201,33.1510078 Z" fill="#FFEDAC"></path>
//             <path id="Shape" d="M50.207,102.858419 C49.785,103.871504 48.616,104.353736 47.595,103.936 L47.595,103.936 C46.574,103.517271 46.088,102.357333 46.51,101.344248 L48.799,95.8412403 C49.22,94.828155 50.39,94.3459225 51.41,94.7636589 L51.41,94.7636589 C52.431,95.1823876 52.917,96.3423256 52.496,97.3554109 L50.207,102.858419 L50.207,102.858419 Z" fill="#FFEDAC"></path>
//           </symbol>
//           <symbol id="cupcake">
//             <g id="Cupcake" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
//               <path id="Shape" d="M64,1.75330233 C62.247,1.75330233 60.431,-0.131968992 58.716,0.0079379845 C56.969,0.149829457 55.486,2.3059845 53.784,2.5867907 C52.06,2.87156589 49.959,1.30877519 48.282,1.72948837 C46.594,2.15516279 45.486,4.52564341 43.851,5.08427907 C42.203,5.64787597 39.868,4.4532093 38.282,5.14579845 C36.689,5.84334884 35.994,8.36365891 34.47,9.18524031 C32.943,10.0117829 30.442,9.21699225 28.991,10.1626047 C27.534,11.1111938 27.268,13.7108837 25.9,14.7725891 C24.53,15.8362791 21.93,15.4612093 20.655,16.6330543 C19.376,17.8048992 19.537,20.4125271 18.361,21.6835969 C17.185,22.9546667 14.561,23.0072558 13.493,24.3725891 C12.426,25.7349457 13.016,28.2810543 12.063,29.7297364 C11.113,31.1734574 8.532,31.6546977 7.705,33.1777984 C6.879,34.6929612 7.881,37.1071008 7.18,38.6956899 C6.484,40.2723721 4.02,41.1713488 3.454,42.8125271 C2.893,44.4408062 4.283,46.6564961 3.855,48.3413333 C3.431,50.0063256 1.15,51.2992248 0.863,53.015814 C0.582,54.7085891 2.32,56.6662946 2.177,58.4027287 C2.036,60.1113798 0,61.7595039 0,63.503876 C0,65.2492403 2.036,66.8973643 2.177,68.6070078 C2.321,70.3434419 0.582,72.2991628 0.863,73.9929302 C1.15,75.7085271 3.431,77.0024186 3.853,78.6693953 C4.281,80.3532403 2.891,82.5699225 3.453,84.1972093 C4.018,85.8393798 6.482,86.7383566 7.179,88.3150388 C7.881,89.9026357 6.878,92.3167752 7.704,93.8339225 C8.531,95.356031 11.113,95.8382636 12.063,97.2819845 C13.017,98.7296744 12.426,101.275783 13.493,102.63814 C14.562,104.002481 17.187,104.056062 18.363,105.327132 C19.539,106.598202 19.378,109.205829 20.655,110.377674 C21.93,111.548527 24.53,111.173457 25.901,112.237147 C27.268,113.29786 27.536,115.898543 28.991,116.847132 C30.442,117.792744 32.943,116.996961 34.471,117.822512 C35.994,118.645085 36.69,121.165395 38.283,121.862946 C39.867,122.554543 42.203,121.358884 43.852,121.923473 C45.486,122.481116 46.593,124.853581 48.283,125.280248 C49.958,125.699969 52.06,124.137178 53.783,124.420961 C55.485,124.701767 56.968,126.857922 58.715,127.001798 C60.43,127.141705 62.246,125.25445 63.999,125.25445 C65.752,125.25445 67.567,127.140713 69.286,127.001798 C71.031,126.857922 72.514,124.70276 74.213,124.420961 C75.936,124.137178 78.042,125.699969 79.714,125.279256 C81.409,124.853581 82.513,122.482109 84.15,121.922481 C85.799,121.359876 88.132,122.554543 89.714,121.860961 C91.312,121.164403 92.006,118.644093 93.529,117.821519 C95.061,116.995969 97.561,117.79076 99.01,116.845147 C100.461,115.89755 100.732,113.296868 102.1,112.235163 C103.47,111.171473 106.066,111.546543 107.344,110.37569 C108.623,109.203845 108.461,106.595225 109.638,105.324155 C110.811,104.053085 113.436,104.000496 114.508,102.636155 C115.57,101.273798 114.983,98.7276899 115.936,97.2790078 C116.886,95.8352868 119.464,95.3540465 120.297,93.8309457 C121.121,92.3157829 120.117,89.9006512 120.816,88.3130543 C121.515,86.7353798 123.98,85.8373953 124.549,84.1952248 C125.108,82.567938 123.715,80.3522481 124.145,78.6684031 C124.564,77.0014264 126.848,75.7085271 127.136,73.991938 C127.417,72.2991628 125.68,70.3424496 125.818,68.6060155 C125.963,66.8973643 128,65.2502326 128,63.503876 C128,61.7585116 125.963,60.1103876 125.819,58.4017364 C125.681,56.6653023 127.419,54.7075969 127.137,53.0148217 C126.849,51.2982326 124.565,50.0053333 124.146,48.3383566 C123.716,46.6535194 125.109,44.4378295 124.549,42.8095504 C123.981,41.1673798 121.518,40.2693953 120.818,38.6927132 C120.119,37.1051163 121.122,34.6889922 120.297,33.1738295 C119.464,31.6507287 116.887,31.1694884 115.937,29.7257674 C114.983,28.2780775 115.57,25.7309767 114.507,24.3696124 C113.437,23.0052713 110.812,22.9526822 109.637,21.6816124 C108.459,20.4105426 108.622,17.8019225 107.342,16.6300775 C106.064,15.4592248 103.469,15.8342946 102.098,14.7706047 C100.73,13.7088992 100.462,11.1102016 99.008,10.1606202 C97.561,9.216 95.06,10.0097984 93.528,9.18424806 C92.006,8.36266667 91.312,5.84235659 89.713,5.1448062 C88.132,4.45221705 85.799,5.64688372 84.148,5.08328682 C82.513,4.52465116 81.41,2.15317829 79.714,1.72849612 C78.042,1.30778295 75.937,2.87057364 74.214,2.5867907 C72.515,2.3059845 71.031,0.149829457 69.286,0.0079379845 C67.567,-0.13296124 65.753,1.75330233 64,1.75330233 L64,1.75330233 Z" fill="#FFCB5E"></path>
//               <path id="Shape" d="M63.999,4.74294574 C31.294,4.74294574 4.78,31.0514109 4.78,63.5048682 C4.78,95.9563411 31.294,122.264806 63.999,122.264806 C96.706,122.264806 123.22,95.9563411 123.22,63.5048682 C123.22,31.0514109 96.706,4.74294574 63.999,4.74294574 L63.999,4.74294574 Z" fill="#C87E4A"></path>
//               <path id="Shape" d="M64,10.8581705 C34.697,10.8581705 10.943,34.428031 10.943,63.503876 C10.943,92.5797209 34.697,116.149581 64,116.149581 C93.303,116.149581 117.057,92.5797209 117.057,63.503876 C117.057,34.428031 93.303,10.8581705 64,10.8581705 L64,10.8581705 Z" fill="#FFEDAC"></path>
//               <path id="Shape" d="M51.518,8.28130233 C67.816,7.76533333 87.032,9.24675969 99.471,21.5893333 C118.576,40.5462326 118.576,71.2821085 99.471,90.2390078 C84.187,105.405519 59.407,105.405519 44.121,90.2390078 C31.895,78.1077829 31.895,58.4354729 44.121,46.3052403 C53.904,36.5990698 69.763,36.5990698 79.545,46.3052403 C87.371,54.0685891 87.371,66.6592248 79.545,74.4245581 C73.286,80.636031 63.136,80.636031 56.874,74.4245581 C51.866,69.4533953 51.866,61.3973333 56.874,56.4271628 C60.882,52.4512248 67.377,52.4512248 71.384,56.4271628 C74.589,59.6083101 74.589,64.764031 71.384,67.944186 C68.821,70.4883101 64.662,70.4883101 62.099,67.944186" stroke="#C87E4A" stroke-width="4"></path>
//               <path id="Shape" d="M105.604,69.0743566 C105.528,70.167814 104.674,70.9983256 103.694,70.9328372 L97.262,70.4893023 C96.283,70.4218295 95.551,69.4791938 95.629,68.3867287 L95.629,68.3867287 C95.703,67.2932713 96.561,66.4627597 97.539,66.5302326 L103.971,66.9737674 C104.95,67.0392558 105.683,67.9818915 105.604,69.0743566 L105.604,69.0743566 L105.604,69.0743566 Z" fill="#35B7CB"></path>
//               <path id="Shape" d="M28.729,48.8582946 C28.788,49.9537364 28.041,50.8834729 27.061,50.9340775 L20.623,51.2734264 C19.643,51.324031 18.801,50.4786357 18.742,49.384186 L18.742,49.384186 C18.683,48.2887442 19.431,47.3609922 20.412,47.3103876 L26.85,46.9710388 C27.828,46.9184496 28.67,47.7658295 28.729,48.8582946 L28.729,48.8582946 L28.729,48.8582946 Z" fill="#F8B5B4"></path>
//               <path id="Shape" d="M83.111,86.4853333 C83.565,87.4825426 83.213,88.6186667 82.316,89.0205271 L76.444,91.6579225 C75.549,92.0587907 74.456,91.5755659 74.001,90.5773643 L74.001,90.5773643 C73.545,89.5781705 73.9,88.4430388 74.795,88.0411783 L80.667,85.4047752 C81.561,85.0019225 82.655,85.4861395 83.111,86.4853333 L83.111,86.4853333 L83.111,86.4853333 Z" fill="#F79C53"></path>
//               <path id="Shape" d="M83.106,24.3924341 C84.2,24.2356589 85.2,24.8885581 85.34,25.852031 L86.266,32.1835659 C86.409,33.1470388 85.635,34.055938 84.543,34.2127132 L84.543,34.2127132 C83.449,34.3714729 82.449,33.7165891 82.309,32.7531163 L81.383,26.4235659 C81.241,25.4581085 82.015,24.5492093 83.106,24.3924341 L83.106,24.3924341 L83.106,24.3924341 Z" fill="#F1706A"></path>
//               <path id="Shape" d="M68.695,20.6377674 C68.492,21.7153488 67.548,22.4466357 66.583,22.268031 L60.244,21.100155 C59.28,20.9215504 58.66,19.9035039 58.862,18.8259225 L58.862,18.8259225 C59.063,17.7493333 60.01,17.0190388 60.976,17.1976434 L67.313,18.3665116 C68.278,18.5431318 68.896,19.5611783 68.695,20.6377674 L68.695,20.6377674 L68.695,20.6377674 Z" fill="#35B7CB"></path>
//               <path id="Shape" d="M70.882,108.994481 C71.027,110.080992 70.36,111.068279 69.386,111.195287 L62.996,112.046636 C62.024,112.175628 61.115,111.39969 60.969,110.313178 L60.969,110.313178 C60.823,109.227659 61.493,108.240372 62.466,108.112372 L68.855,107.263008 C69.827,107.133023 70.734,107.908961 70.882,108.994481 L70.882,108.994481 L70.882,108.994481 Z" fill="#F8B5B4"></path>
//               <path id="Shape" d="M25.131,77.9887132 C24.723,79.0057674 23.652,79.5405891 22.74,79.1823876 L16.75,76.8178605 C15.838,76.4576744 15.43,75.3394109 15.838,74.3213643 L15.838,74.3213643 C16.246,73.3023256 17.317,72.7694884 18.229,73.1296744 L24.219,75.4942016 C25.131,75.8524031 25.539,76.9706667 25.131,77.9887132 L25.131,77.9887132 L25.131,77.9887132 Z" fill="#35B7CB"></path>
//               <path id="Shape" d="M37.495,91.7263876 C38.546,92.0597829 39.159,93.0808062 38.86,94.0095504 L36.901,100.10493 C36.602,101.03169 35.506,101.513922 34.456,101.180527 L34.456,101.180527 C33.403,100.849116 32.792,99.8261085 33.091,98.8973643 L35.05,92.803969 C35.347,91.8762171 36.442,91.3929922 37.495,91.7263876 L37.495,91.7263876 L37.495,91.7263876 Z" fill="#F79C53"></path>
//               <path id="Shape" d="M104.952,44.6273488 C104.403,45.5769302 103.266,45.9549767 102.415,45.4707597 L96.827,42.2826667 C95.975,41.7964651 95.731,40.6315659 96.282,39.6819845 L96.282,39.6819845 C96.833,38.7324031 97.97,38.3563411 98.821,38.8405581 L104.409,42.0286512 C105.261,42.5148527 105.503,43.6777674 104.952,44.6273488 L104.952,44.6273488 L104.952,44.6273488 Z" fill="#FFCB5E"></path>
//               <path id="Shape" d="M42.45,25.2854574 C43.235,26.0564341 43.315,27.2431628 42.624,27.9347597 L38.093,32.4852093 C37.404,33.1768062 36.206,33.1152868 35.421,32.3433178 L35.421,32.3433178 C34.636,31.5743256 34.558,30.3856124 35.249,29.6940155 L39.78,25.1455504 C40.47,24.4529612 41.665,24.5164651 42.45,25.2854574 L42.45,25.2854574 L42.45,25.2854574 Z" fill="#FFCB5E"></path>
//               <path id="Shape" d="M43.737,72.4450233 C44.652,71.8288372 45.839,71.9796589 46.392,72.7853643 L50.016,78.0730543 C50.57,78.8787597 50.277,80.0327442 49.365,80.6489302 L49.365,80.6489302 C48.452,81.2661085 47.264,81.1123101 46.712,80.3046202 L43.085,75.0189147 C42.533,74.2142016 42.826,73.0622016 43.737,72.4450233 L43.737,72.4450233 L43.737,72.4450233 Z" fill="#FFCB5E"></path>
//             </g>
//           </symbol>
//         </g>
//       </defs>
//     </svg>

//     <main class="flex-pos">
//       <input type="radio" name="goldenbox-controls" id="goldenbox-controls_1" class="goldenbox__carrousel__radio"/>
//       <input type="radio" name="goldenbox-controls" id="goldenbox-controls_2" class="goldenbox__carrousel__radio"/>
//       <input type="radio" name="goldenbox-controls" id="goldenbox-controls_3" class="goldenbox__carrousel__radio"/>
//       <input type="radio" name="goldenbox-controls" id="goldenbox-controls_4" class="goldenbox__carrousel__radio"/>
//       <input type="radio" name="goldenbox-controls" id="goldenbox-controls_5" class="goldenbox__carrousel__radio"/>
//       <input type="radio" name="goldenbox-controls" id="goldenbox-controls_6" class="goldenbox__carrousel__radio"/>
//       <input type="checkbox" name="goldenbox-close-control" id="goldenbox-close-control" checked="checked" class="goldenbox__carrousel__check"/>
//       <div id="goldenbox" class="shadow goldenbox flex-pos flex-pos--row">
//         <article class="goldenbox__card bg-white">
//           <header class="goldenbox__header flex-pos">
//             <h2 class="goldenbox__header--title">Diet<em>PieChart</em></h2>
//           </header>
//           <div class="goldenbox__content svg-chart">
//             <div class="svg-chart_info flex-pos">
//               <div id="svg-chart_info_marker" class="svg-chart_info_marker"></div>
//               <h3 class="svg-chart_info_icon flex-pos">
//                 <svg width="64" height="64" viewBox="0 0 128 128">
//                   <use id="active-icon" ></use>
//                 </svg>
//               </h3>
//             </div>
//             <svg id="svg-chart_pie" viewBox="0 0 180 180" class="svg-chart_pie">
//               <circle data-slice-name="donut" data-slice-line="M6 34.994l15.008-21.96L33 25l9-3 18 20 10-12v40H0V30z" aria-valuenow="30" class="stroke-donut" r="8em" cx="9em" cy="9em" fill="none" aria-valuemin="0" aria-valuemax="100" role="progressbar"></circle>
//               <circle data-slice-name="watermelon" data-slice-line="M5.108 35.606l10.538 4.757 14.11-23.976 15.308 26.85 11.207-14.34L71 22.58V78H-1l-3.424-33.002" aria-valuenow="20" class="stroke-watermelon" r="8em" cx="9em" cy="9em" fill="none" aria-valuemin="0" aria-valuemax="100" role="progressbar"></circle>
//               <circle data-slice-name="sushi" data-slice-line="M6 34.994l10.645 6.977L27.18 19.918 35 27.123l8.1-3.363 9.794 16.133 16.864-14.398L71 78H-1V29" aria-valuenow="16" class="stroke-sushi" r="8em" cx="9em" cy="9em" fill="none" aria-valuemin="0" aria-valuemax="100" role="progressbar"></circle>
//               <circle data-slice-name="orange" data-slice-line="M6.7 34.75l14.793 5.975L33.32 25l9-3 18 20 10-5.508V71h-71L-2 44.413z" aria-valuenow="14" class="stroke-orange" r="8em" cx="9em" cy="9em" fill="none" aria-valuemin="0" aria-valuemax="100" role="progressbar"></circle>
//               <circle data-slice-name="cupcake" data-slice-line="M14.83 49.277l5.07-15.525L35 19.64l16.838 20.454L64.463 14.24 71 29v49H-1V40.094" aria-valuenow="12" class="stroke-cupcake" r="8em" cx="9em" cy="9em" fill="none" aria-valuemin="0" aria-valuemax="100" role="progressbar"></circle>
//               <circle data-slice-name="kiwi" data-slice-line="M1.705 42l14.97-5.338 10.524-17.885L37.74 51.46 45.912 29l13.11 10.332L71 29v49H-1V42" aria-valuenow="8" class="stroke-kiwi" r="8em" cx="9em" cy="9em" fill="none" aria-valuemin="0" aria-valuemax="100" role="progressbar"></circle>
//             </svg>
//           </div>
//         </article>
//         <div id="goldenbox--action" class="goldenbox__card goldenbox--rotated">
//           <div class="goldenbox__carrousel">
//             <label for="goldenbox-close-control" class="goldenbox__carrousel__close">
//               <svg width="24" height="24">
//                 <line x1="6" y1="6" x2="18" y2="18" stroke-width="2" stroke-linecap="round"></line>
//                 <line x1="18" y1="6" x2="6" y2="18" stroke-width="2" stroke-linecap="round"></line>
//               </svg>
//             </label>
//             <div class="goldenbox__carrousel__container flex-pos flex-pos--row">
//               <article class="goldenbox__carrousel__container--item bg-donut">
//                 <header class="goldenbox__header flex-pos">
//                   <h2 class="goldenbox__header--title color-white">Tasty<em>Blue Donut</em></h2>
//                 </header>
//                 <div class="goldenbox__content">
//                   <ol class="goldenbox__content__list flex-pos flex-pos--row">
//                     <li class="goldenbox__content__list__item flex-pos">
//                       <div class="value">21</div>
//                       <div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="21" class="progress-bar"></div>
//                       <div class="subject">Summer</div>
//                     </li>
//                     <li class="goldenbox__content__list__item flex-pos">
//                       <div class="value">12</div>
//                       <div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="12" class="progress-bar"></div>
//                       <div class="subject">Fresh</div>
//                     </li>
//                     <li class="goldenbox__content__list__item flex-pos">
//                       <div class="value">96</div>
//                       <div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="96" class="progress-bar"></div>
//                       <div class="subject">Sweet</div>
//                     </li>
//                     <li class="goldenbox__content__list__item flex-pos">
//                       <div class="value">60</div>
//                       <div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="60" class="progress-bar"></div>
//                       <div class="subject">Siesta</div>
//                     </li>
//                   </ol>
//                 </div>
//               </article>
//               <article class="goldenbox__carrousel__container--item bg-watermelon">
//                 <header class="goldenbox__header flex-pos">
//                   <h2 class="goldenbox__header--title color-white">Tasty<em>Watermelon</em></h2>
//                 </header>
//                 <div class="goldenbox__content">
//                   <ol class="goldenbox__content__list flex-pos flex-pos--row">
//                     <li class="goldenbox__content__list__item flex-pos">
//                       <div class="value">92</div>
//                       <div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="92" class="progress-bar"></div>
//                       <div class="subject">Summer</div>
//                     </li>
//                     <li class="goldenbox__content__list__item flex-pos">
//                       <div class="value">80</div>
//                       <div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="80" class="progress-bar"></div>
//                       <div class="subject">Fresh</div>
//                     </li>
//                     <li class="goldenbox__content__list__item flex-pos">
//                       <div class="value">60</div>
//                       <div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="60" class="progress-bar"></div>
//                       <div class="subject">Sweet</div>
//                     </li>
//                     <li class="goldenbox__content__list__item flex-pos">
//                       <div class="value">76</div>
//                       <div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="76" class="progress-bar"></div>
//                       <div class="subject">Siesta</div>
//                     </li>
//                   </ol>
//                 </div>
//               </article>
//               <article class="goldenbox__carrousel__container--item bg-sushi">
//                 <header class="goldenbox__header flex-pos">
//                   <h2 class="goldenbox__header--title color-white">Tasty<em>Salmon Sushi</em></h2>
//                 </header>
//                 <div class="goldenbox__content">
//                   <ol class="goldenbox__content__list flex-pos flex-pos--row">
//                     <li class="goldenbox__content__list__item flex-pos">
//                       <div class="value">10</div>
//                       <div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="10" class="progress-bar"></div>
//                       <div class="subject">Summer</div>
//                     </li>
//                     <li class="goldenbox__content__list__item flex-pos">
//                       <div class="value">10</div>
//                       <div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="10" class="progress-bar"></div>
//                       <div class="subject">Fresh</div>
//                     </li>
//                     <li class="goldenbox__content__list__item flex-pos">
//                       <div class="value">70</div>
//                       <div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="70" class="progress-bar"></div>
//                       <div class="subject">Sweet</div>
//                     </li>
//                     <li class="goldenbox__content__list__item flex-pos">
//                       <div class="value">5</div>
//                       <div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="5" class="progress-bar"></div>
//                       <div class="subject">Siesta</div>
//                     </li>
//                   </ol>
//                 </div>
//               </article>
//               <article class="goldenbox__carrousel__container--item bg-orange">
//                 <header class="goldenbox__header flex-pos">
//                   <h2 class="goldenbox__header--title color-white">Tasty<em>Acid Orange</em></h2>
//                 </header>
//                 <div class="goldenbox__content">
//                   <ol class="goldenbox__content__list flex-pos flex-pos--row">
//                     <li class="goldenbox__content__list__item flex-pos">
//                       <div class="value">30</div>
//                       <div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="30" class="progress-bar"></div>
//                       <div class="subject">Summer</div>
//                     </li>
//                     <li class="goldenbox__content__list__item flex-pos">
//                       <div class="value">65</div>
//                       <div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="65" class="progress-bar"></div>
//                       <div class="subject">Fresh</div>
//                     </li>
//                     <li class="goldenbox__content__list__item flex-pos">
//                       <div class="value">40</div>
//                       <div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="40" class="progress-bar"></div>
//                       <div class="subject">Sweet</div>
//                     </li>
//                     <li class="goldenbox__content__list__item flex-pos">
//                       <div class="value">5</div>
//                       <div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="5" class="progress-bar"></div>
//                       <div class="subject">Siesta</div>
//                     </li>
//                   </ol>
//                 </div>
//               </article>
//               <article class="goldenbox__carrousel__container--item bg-cupcake">
//                 <header class="goldenbox__header flex-pos">
//                   <h2 class="goldenbox__header--title color-white">Tasty<em>Cream Cupcake</em></h2>
//                 </header>
//                 <div class="goldenbox__content">
//                   <ol class="goldenbox__content__list flex-pos flex-pos--row">
//                     <li class="goldenbox__content__list__item flex-pos">
//                       <div class="value">5</div>
//                       <div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="5" class="progress-bar"></div>
//                       <div class="subject">Summer</div>
//                     </li>
//                     <li class="goldenbox__content__list__item flex-pos">
//                       <div class="value">0</div>
//                       <div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" class="progress-bar"></div>
//                       <div class="subject">Fresh</div>
//                     </li>
//                     <li class="goldenbox__content__list__item flex-pos">
//                       <div class="value">100</div>
//                       <div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100" class="progress-bar"></div>
//                       <div class="subject">Sweet</div>
//                     </li>
//                     <li class="goldenbox__content__list__item flex-pos">
//                       <div class="value">90</div>
//                       <div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="90" class="progress-bar"></div>
//                       <div class="subject">Siesta</div>
//                     </li>
//                   </ol>
//                 </div>
//               </article>
//               <article class="goldenbox__carrousel__container--item bg-kiwi">
//                 <header class="goldenbox__header flex-pos">
//                   <h2 class="goldenbox__header--title color-white">Tasty<em>Half Kiwi</em></h2>
//                 </header>
//                 <div class="goldenbox__content">
//                   <ol class="goldenbox__content__list flex-pos flex-pos--row">
//                     <li class="goldenbox__content__list__item flex-pos">
//                       <div class="value">46</div>
//                       <div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="46" class="progress-bar"></div>
//                       <div class="subject">Summer</div>
//                     </li>
//                     <li class="goldenbox__content__list__item flex-pos">
//                       <div class="value">70</div>
//                       <div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="70" class="progress-bar"></div>
//                       <div class="subject">Fresh</div>
//                     </li>
//                     <li class="goldenbox__content__list__item flex-pos">
//                       <div class="value">30</div>
//                       <div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="30" class="progress-bar"></div>
//                       <div class="subject">Sweet</div>
//                     </li>
//                     <li class="goldenbox__content__list__item flex-pos">
//                       <div class="value">5</div>
//                       <div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="5" class="progress-bar"></div>
//                       <div class="subject">Siesta</div>
//                     </li>
//                   </ol>
//                 </div>
//               </article>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>

//     </>
//   );
// }

// export default Test;
// function Test(props) {
//   const [val, setVal] = useState({ date: "" });
//   const [cur, setCur] = useState(0);
//   return (
//     <>
//       <input
//         type="date"
//         value={val.date}
//         onChange={(e) => {
//           setVal({ ...val, date: e.target.value });
//           console.log(val);
//         }}
//       />
//       <i class="fa-solid fa-ellipsis"></i>{" "}
//     </>
//   );
// }

// export default Test;
// import React from "react";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Pie } from "react-chartjs-2";
// const data = {
//   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//   datasets: [
//     {
//       label: "# of Votes",
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"],
//       borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
//       borderWidth: 1,
//     },
//   ],
// };
// const options = {
//   onClick: (evt, element) => {
//     if (element.length > 0) {
//       console.log(element, element[0]);
//       // you can also get dataset of your selected element
//       console.log(data.datasets[0][element.index]);
//     }
//   },
// };

// function Test(props) {
//   return <Pie data={data} options={options} />;
// }

// export default Test;

// import React from "react";
// import { Pie, Doughnut } from "react-chartjs-2";
// import { Card } from "react-bootstrap";
// // import "./DietChart.css";

// const Test = () => {
//   const [selectedSection, setSelectedSection] = useState(0);

//   const data = {
//     labels: ["Protein", "Carbs", "Fat"],
//     datasets: [
//       {
//         data: [30, 40, 30],
//         backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
//         hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
//       },
//     ],
//   };

//   const options = {
//     onClick: (evt, element) => {
//       if (element.length > 0) {
//         console.log(element, element[0]);
//         console.log(data.datasets[0].data[element[0].index]);
//         setSelectedSection(element[0].index)
//       }
//     },
//   };

//   const handleSectionClick = (section) => {
//     setSelectedSection(section);
//   };

//   let sectionContent;

//   if (selectedSection === 0) {
//     sectionContent = (
//       <ul>
//         <li>Protein: 30%</li>
//         <li>Recommended daily protein intake: 0.8-1.2 g/kg body weight</li>
//       </ul>
//     );
//   } else if (selectedSection === 1) {
//     sectionContent = (
//       <ul>
//         <li>Carbs: 40%</li>
//         <li>Recommended daily carb intake: 45-65% of total calories</li>
//       </ul>
//     );
//   } else if (selectedSection === 2) {
//     sectionContent = (
//       <ul>
//         <li>Fat: 30%</li>
//         <li>Recommended daily fat intake: 20-35% of total calories</li>
//       </ul>
//     );
//   }

//   return (
//     <div className="d-flex justify-content-center">
//       <Doughnut data={data} options={options} />
//       <div className="card-container">
//         <Card className="mx-2" style={{ width: "18rem" }}>
//           <Card.Body>
//             <Card.Title>Nutrition Information</Card.Title>
//             <div className="section-buttons">
//               <button className={selectedSection === "protein" ? "active" : ""} onClick={() => handleSectionClick("protein")}>
//                 Protein
//               </button>
//               <button className={selectedSection === "carbs" ? "active" : ""} onClick={() => handleSectionClick("carbs")}>
//                 Carbs
//               </button>
//               <button className={selectedSection === "fat" ? "active" : ""} onClick={() => handleSectionClick("fat")}>
//                 Fat
//               </button>
//             </div>
//             <div className="section-content">{sectionContent}</div>
//           </Card.Body>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Test;

// ChartJS.register(ArcElement, Tooltip, Legend);

// export function App() {
// }

// import React from "react";

// const Test = () => {
//   return (
//     <div className="footer-wrapper">
//       <div className="footer-section-one">
//         <div className="footer-logo-container">
//           <img src={"https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg?v=47faa659a05e"} alt="" />
//         </div>
//         <div className="footer-icons">
//           <i className="fa-solid fa-swatchbook"></i>
//           <i className="fa-solid fa-swatchbook"></i>
//           <i className="fa-solid fa-swatchbook"></i>
//           <i className="fa-solid fa-swatchbook"></i>
//         </div>
//       </div>
//       <div className="footer-section-two">
//         <div className="footer-section-columns">
//           <span>Qualtiy</span>
//           <span>Help</span>
//           <span>Share</span>
//           <span>Carrers</span>
//           <span>Testimonials</span>
//           <span>Work</span>
//         </div>
//         <div className="footer-section-columns">
//           <span>244-5333-7783</span>
//           <span>hello@food.com</span>
//           <span>press@food.com</span>
//           <span>contact@food.com</span>
//         </div>
//         <div className="footer-section-columns">
//           <span>Terms & Conditions</span>
//           <span>Privacy Policy</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Test

// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";

// const Test = () => {
//   async function getDeviceToken() {
// Import the Firebase SDK and initialize the Firebase app

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//     const firebaseConfig = {
//       apiKey: "AIzaSyAUFKXQq0CU5ssPR9fvj4LKXadyZChcYTU",
//       authDomain: "rtcproject-9dbb4.firebaseapp.com",
//       projectId: "rtcproject-9dbb4",
//       storageBucket: "rtcproject-9dbb4.appspot.com",
//       messagingSenderId: "602014525356",
//       appId: "1:602014525356:web:5293b0859e32359e9a3c09",
//       measurementId: "G-LQN95X0WCR",
//     };

//     const app = initializeApp(firebaseConfig);

//     const messaging = getMessaging(app);
//     getToken(messaging, { vapidKey: "BAJJW5rchwP76J5NHq9jei1qNhAwLryOHV5UPeRe6r20rkHoSEr-3Fulv9h0E_JKOUoX-vEEf8Q6aqj-MKR1Er8" })
//       .then((token) => {
//         console.log("Device token:", token);
//         onMessage(messaging, (payload) => {
//           console.log("payload", payload);
//         });
//       })
//       .catch((error) => {
//         console.log("Error obtaining device token:", error);
//       });
//   }

//   useEffect(() => {
//     getDeviceToken();
//   }, []);
//   return <div>done</div>;
// };

function Test(props) {
  return <></>;
}

export default Test;
