import searchOptions from "../../../constants/searchOptions";
import operators from "../../../constants/operators";
import selectOptions from "../../../constants/selectOptions";

function SearchForTeachers(props) {
  return (
    <>
      <div className="search-container">
        <div style={{ display: "flex" }}>
          <select
            onChange={(e) => {
              props.setSearch({ ...props.search, field: e.target.value });
            }}
            className={"search-bar"}
            style={{ margin: "5px" }}
          >
            <option value="">الحقل...</option>
            {Object.keys(searchOptions[props.page]).map((option, optionIndex) => {
              return (
                <option key={optionIndex} value={option}>
                  {searchOptions[props.page][option].name}
                </option>
              );
            })}
          </select>

          <select
            value={props.search.operator}
            onChange={(e) => {
              props.setSearch({ ...props.search, operator: e.target.value });
            }}
            className={"search-bar"}
            style={{ margin: "5px" }}
          >
            <option value="">المقارنة...</option>
            {props.search.field &&
              operators[searchOptions[props.page][props.search.field].type].map((operator, operatorIndex) => {
                return (
                  <option key={operatorIndex} value={operator.value}>
                    {operator.name}
                  </option>
                );
              })}
          </select>

          {props.search.field && searchOptions[props.page][props.search.field].type == "select" ? (
            <select
              onChange={(e) => {
                props.setSearch({ ...props.search, word: e.target.value });
              }}
              className={"search-bar"}
              style={{ marginTop: 0, margin: "5px" }}
            >
              <option value=""></option>
              {selectOptions[props.search.field].map((option, optionIndex) => {
                return (
                  <option key={optionIndex} value={option.value}>
                    {option.name}
                  </option>
                );
              })}
            </select>
          ) : props.search.field && searchOptions[props.page][props.search.field].type == "array" ? (
            <select
              onChange={(e) => {
                props.setSearch({ ...props.search, word: e.target.value });
              }}
              className={"search-bar"}
              style={{ marginTop: 0, margin: "5px" }}
            >
              <option value=""></option>
              {selectOptions[props.type == "ins" ? props.search.field + "Ins" : props.search.field].map((option, optionIndex) => {
                return (
                  <option key={optionIndex} value={option.value}>
                    {option.name}
                  </option>
                );
              })}
            </select>
          ) : (
            <input
              type={props.search.field ? searchOptions[props.page][props.search.field].type : "text"}
              value={props.search.word}
              onChange={(e) => {
                props.setSearch({ ...props.search, word: e.target.value });
              }}
              className={"search-bar"}
              placeholder="بحث..."
              style={{ marginTop: 0, margin: "5px" }}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default SearchForTeachers;
