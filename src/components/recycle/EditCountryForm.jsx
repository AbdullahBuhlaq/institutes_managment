import { useState } from "react";
import Joi from "joi";
import Input from "./Input";
import validateForm from "../functions/validateForm";
import handleSave from "../functions/handleSave";
import requestOptions from "../constants/requestOptions";

function EditCountryForm(props) {
  const [duringAdd, setDuringAdd] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [country, setCountry] = useState({
    name: props.currentEdit.name,
  });
  const [countryErrors, setCountryErrors] = useState({});
  const countrySchema = {
    name: Joi.string().required().trim().label("اسم المدينة"),
  };
  const joiCountry = Joi.object(countrySchema);

  async function editCountry(event) {
    const isValid = await validateForm(event, joiCountry, country, setCountryErrors);
    if (isValid) {
      const newData = country;
      setErrorMessage("");
      const infoRequestOptions = {
        ...requestOptions,
        body: JSON.stringify({
          ...country,
        }),
      };
      setDuringAdd(true);
      const response = await fetch(`/admin-site/country/update/${props.currentEdit.id}`, infoRequestOptions);
      const data = await response.json();
      if (data.success) {
        props.setCountries({ ...props.countries, [props.currentEdit.id]: newData });
        Object.keys(props.institutes).map((key, index) => {
          if (props.institutes[key].nameCountry == props.currentEdit.name) props.institutes.nameCountry = newData.name;
        });
        props.setInstitutes({ ...props.institutes });
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
      <div className="addcountry">
        <Input label={""} type={"text"} name={"name"} onChange={handleSave} state={country} setState={setCountry} errors={countryErrors} setErrors={setCountryErrors} schema={countrySchema} />
        <button
          disabled={duringAdd}
          onClick={async (event) => {
            const isValid = await validateForm(event, joiCountry, country, setCountryErrors);
            isValid && (await editCountry(event));
          }}
        ></button>
      </div>
    </>
  );
}

export default EditCountryForm;
