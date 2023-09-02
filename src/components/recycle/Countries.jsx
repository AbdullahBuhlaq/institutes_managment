import { useState } from "react";
import CountryItem from "./CountryItem";
import AddCountryForm from "./AddCountryForm";
import EditCountryForm from "./EditCountryForm";

function Countries(props) {
  const [currentEdit, setCurrentEdit] = useState({});
  const [addNew, setAddNew] = useState(false);

  async function showEdit(country) {
    setCurrentEdit(props.countries[country]);
  }
  return (
    <>
      {Object.keys(props.countries).map((country, countryIndex) => {
        <CountryItem key={countryIndex} countryId={country} country={props.countries[country]} showEdit={showEdit} setAddNew={setAddNew} />;
      })}

      {addNew && <AddCountryForm countries={props.countries} setCountries={props.setCountries} />}
      {currentEdit && <EditCountryForm countries={props.countries} setCountries={props.setCountries} currentEdit={currentEdit} institutes={props.institutes} setInstitutes={props.setInstitutes} />}
    </>
  );
}

export default Countries;
