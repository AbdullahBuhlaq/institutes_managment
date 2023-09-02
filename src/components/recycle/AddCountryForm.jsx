import { useState } from "react";
import Joi from "joi";
import Input from "../Input";
import validateForm from "../../functions/validateForm";
import handleSave from "../../functions/handleSave";
import requestOptions from "../../constants/requestOptions";
import messages from "../../constants/messages";

function AddCountryForm(props) {
  const [duringAdd, setDuringAdd] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [country, setCountry] = useState({
    name: "",
  });
  const [countryErrors, setCountryErrors] = useState({});
  const countryScema = {
    name: Joi.string().required().trim().messages(messages).label("اسم المدينة"),
  };
  const joiCountry = Joi.object(countryScema);

  async function addCountry(event) {
    const isValid = await validateForm(event, joiCountry, country, setCountryErrors);
    if (isValid) {
      let newData = country;
      setErrorMessage("");
      const infoRequestOptions = {
        ...requestOptions,
        body: JSON.stringify({
          ...country,
        }),
      };
      setDuringAdd(true);
      const response = await fetch("/admin-site/country/create", infoRequestOptions);
      const data = await response.json();
      if (data.success) {
        props.setCountries({ ...props.countries, [data.id]: newData });
      } else {
        console.log(data.error);
        setErrorMessage("عذرا, حدث خطأ في السيرفر");
      }
      setDuringAdd(false);
    } else {
      setErrorMessage("Form is Not Correct");
    }
  }

  return (
    <>
      {errorMessage ? <div>Form is Not Correct</div> : null}
      <div className="addinstitute">
        <Input label={""} type={"text"} name={"name"} onChange={handleSave} state={country} setState={setCountry} errors={countryErrors} setErrors={setCountryErrors} schema={countryScema} />
        <button
          disabled={duringAdd}
          onClick={async (event) => {
            const isValid = await validateForm(event, joiCountry, country, setCountryErrors);
            await addCountry(event);
          }}
        ></button>
      </div>
    </>
  );
}

export default AddCountryForm;
