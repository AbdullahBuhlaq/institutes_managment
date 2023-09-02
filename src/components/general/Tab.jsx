import { NavLink } from "react-router-dom";
function Tab(props) {
  return (
    <div
      onClick={() => {
        props.setCurrent(props.tab.show);
      }}
    >
      <li className={"nav-list-item" + (props.current == props.tab.show ? " active" : "")}>
        <NavLink className="nav-list-link" to={"/home/" + props.tab.show}>
          <i className={props.tab.icon}></i>
          {props.hover ? <span>{props.tab.name}</span> : null}
        </NavLink>
      </li>
    </div>
  );
}

export default Tab;
