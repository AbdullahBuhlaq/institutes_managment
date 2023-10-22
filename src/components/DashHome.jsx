import { useEffect, useState } from "react";
import TABS from "../constants/tabs";
import requestOptions from "../constants/requestOptions";
import countriesFake from "../constants/countries";
import employeesFake from "../constants/employees";
import roleFake from "../constants/rolesFake";
import institutesFake from "../constants/institutesFake";
import AppLeft from "./general/AppLeft";
import Employees from "./admin/employees/Employees";
import Institutes from "./admin/institutes/Institutes";
import Roles from "./admin/roles/Roles";
import Statistics from "./admin/statistics/Statistics";
import EmployeesRight from "./admin/employees/EmployeesRight";
import InstitutesRight from "./admin/institutes/InstitutesRight";
import RolesRight from "./admin/roles/RolesRight";
import StatisticsRight from "./admin/statistics/StatisticsRight";
import BranchesRight from "./admin/branches/BranchRight";
import NoPage from "../pages/NoPage";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import selectOptions from "../constants/selectOptions";

function DashHome(props) {
  const navigate = useNavigate();
  const [search, setSearch] = useState({ word: "", field: "", operator: "" });
  const [institutes, setInstitutes] = useState(institutesFake);
  const [currentInstitute, setCurrentInstitute] = useState(false);
  const [currentBranch, setCurrentBranch] = useState(false);
  const [employees, setEmployees] = useState(employeesFake);
  const [currentEmployee, setCurrentEmployee] = useState(false);
  const [roles, setRoles] = useState(roleFake);
  const [currentRole, setCurrentRole] = useState(false);

  const [current, setCurrent] = useState(props.userInformation.show[0]);
  const [currentRight, setCurrentRight] = useState("statistics");
  const [loaded, setLoaded] = useState(false);
  const [rightShow, setRightShow] = useState(false);
  const [leftShow, setLeftShow] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSearch({ word: "", field: "", operator: "" });
  }, [current, currentRight]);

  useEffect(() => {
    setCurrentRight(current);
  }, [current]);

  useEffect(() => {
    const currentPath = location.pathname.split("/");
    const currentTab = currentPath[2];
    if (currentTab != current && currentTab) setCurrent(currentTab);
  }, [location]);

  async function getInstitutes() {
    const response = await fetch(`${import.meta.env.VITE_URL}/admin-site/training-center/get-all`, { ...requestOptions, headers: { ...requestOptions.headers, authorization: props.userInformation.token }, method: "GET" });
    const data = await response.json();
    if (data.success) {
      let finalInstitutes = {};
      await Promise.all(
        data.data.map(async (institute) => {
          const temp = {};
          await Promise.all(
            institute.branches.map((branch) => {
              temp[branch.id] = branch;
            })
          );
          finalInstitutes[institute.id] = { ...institute, branches: temp };
        })
      );
      setInstitutes({ ...finalInstitutes });
      console.log(finalInstitutes);
    } else {
      console.log(data.error);
      props.toast.error("عذرا, حدث خطأ في السيرفر", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
  }

  async function getEmployees() {
    const response = await fetch(`${import.meta.env.VITE_URL}/admin-site/emp/all/`, { ...requestOptions, headers: { ...requestOptions.headers, authorization: props.userInformation.token }, method: "GET" });
    const data = await response.json();
    if (data.success) {
      let finalEmployees = {};
      await Promise.all(
        data.data.map(async (employee) => {
          finalEmployees[employee.id] = { ...employee };
        })
      );
      setEmployees({ ...finalEmployees });
    } else {
      console.log(data.error);
      props.toast.error("عذرا, حدث خطأ في السيرفر", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
  }

  async function getRoles() {
    const response = await fetch(`${import.meta.env.VITE_URL}/admin-site/roles/all`, { ...requestOptions, headers: { ...requestOptions.headers, authorization: props.userInformation.token }, method: "GET" });
    const data = await response.json();
    if (data.success) {
      let finalRoles = {};
      let rolesOption = [];
      await Promise.all(
        data.data.map(async (role) => {
          let data = { id: role.id, name: role.name, ...JSON.parse(JSON.parse(role.data)) };
          finalRoles[role.id] = data;
          rolesOption = [...rolesOption, { name: role.name, value: role.name }];
        })
      );
      selectOptions.roles = rolesOption;
      setRoles({ ...finalRoles });
    } else {
      console.log(data.error);
      props.toast.error("عذرا, حدث خطأ في السيرفر", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
  }

  async function getInformation() {
    await getRoles();
    await getInstitutes();
    await getEmployees();
    setLoaded(true);
  }

  useEffect(() => {
    getInformation();
  }, []);

  async function logout() {
    let response = await fetch(`${import.meta.env.VITE_URL}/auth/logout`, { ...requestOptions, method: "put", headers: { ...requestOptions.headers, authorization: props.userInformation.token } });
    let data = await response.json();
    // let data = { success: true };
    if (data.success) {
      localStorage.removeItem("user");
      navigate("/login");
    } else {
      console.log(data.error);
      props.toast.error("عذرا, حدث خطأ في السيرفر", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
  }

  return (
    <>
      {loaded ? (
        <>
          <AppLeft logout={logout} tabs={TABS} current={current} setCurrent={setCurrent} leftShow={leftShow} setLeftShow={setLeftShow} userInformation={props.userInformation} />

          <div className={"app-main" + (current == "roles" ? " task-manager" : "")}>
            <Routes>
              {true && <Route index exact element={<Statistics toast={props.toast} rightShow={rightShow} setRightShow={setRightShow} leftShow={leftShow} setLeftShow={setLeftShow} />} />}
              {true && <Route path="statistics" exact element={<Statistics toast={props.toast} rightShow={rightShow} setRightShow={setRightShow} leftShow={leftShow} setLeftShow={setLeftShow} />} />}
              {true && (
                <Route
                  path="institutes"
                  exact
                  element={
                    <Institutes
                      setSearch={setSearch}
                      search={search}
                      toast={props.toast}
                      institutes={institutes}
                      setInstitutes={setInstitutes}
                      setCurrentBranch={setCurrentBranch}
                      countries={countriesFake}
                      roles={roles}
                      rightShow={rightShow}
                      setRightShow={setRightShow}
                      leftShow={leftShow}
                      setLeftShow={setLeftShow}
                      setCurrentInstitute={setCurrentInstitute}
                      setCurrentRight={setCurrentRight}
                      currentRight={currentRight}
                      userInformation={props.userInformation}
                    />
                  }
                />
              )}
              {true && <Route path="employees" exact element={<Employees search={search} toast={props.toast} employees={employees} setEmployees={setEmployees} userInformation={props.userInformation} roles={roles} rightShow={rightShow} setRightShow={setRightShow} leftShow={leftShow} setLeftShow={setLeftShow} setCurrentEmployee={setCurrentEmployee} />} />}
              {true && <Route path="roles" exact element={<Roles search={search} toast={props.toast} roles={roles} setRoles={setRoles} employees={employees} setEmployees={setEmployees} type={"admin-site"} rightShow={rightShow} setRightShow={setRightShow} leftShow={leftShow} setLeftShow={setLeftShow} setCurrentRole={setCurrentRole} userInformation={props.userInformation} />} />}
              <Route path="*" exact element={<NoPage />} />
            </Routes>
          </div>

          <div className={"app-right" + (rightShow ? " show" : "")}>
            {currentRight == "institutes" ? (
              <InstitutesRight search={search} setSearch={setSearch} currentInstitute={currentInstitute} setCurrentItem={setCurrentInstitute} institutes={institutes} setRightShow={setRightShow} />
            ) : currentRight == "branches" ? (
              <BranchesRight search={search} setSearch={setSearch} currentBranch={currentBranch} setCurrentItem={setCurrentBranch} currentInstitute={currentInstitute} setRightShow={setRightShow} />
            ) : currentRight == "employees" ? (
              <EmployeesRight search={search} setSearch={setSearch} currentEmployee={currentEmployee} setCurrentItem={setCurrentEmployee} employees={employees} setRightShow={setRightShow} roles={roles} />
            ) : currentRight == "roles" ? (
              <RolesRight type={"dash"} search={search} setSearch={setSearch} currentRole={currentRole} setCurrentItem={setCurrentRole} roles={roles} setRightShow={setRightShow} employees={employees} />
            ) : currentRight == "statistics" ? (
              <StatisticsRight search={search} setSearch={setSearch} setRightShow={setRightShow} />
            ) : null}
          </div>
        </>
      ) : (
        <span>loading</span>
      )}
    </>
  );
}

export default DashHome;
