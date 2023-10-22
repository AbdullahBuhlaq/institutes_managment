import { useEffect, useState, Fragment } from "react";
import Joi from "joi";
import validateForm from "../../../functions/validateForm";
import handleSave from "../../../functions/handleSave";
import messages from "../../../constants/messages";
import axios from "axios";
import NewInput from "../../general/NewInput";

function EditInstituteForm(props) {
  const [duringAdd, setDuringAdd] = useState(false);
  const [image, setImage] = useState(props.currentEdit.picture);
  const [changeImage, setChangeImage] = useState(false);

  useEffect(() => {
    class Uploadimage {
      filename = "";
      isCopying = false;
      isUploading = false;
      progress = 0;
      progressTimeout = null;
      state = 0;
      constructor(el) {
        this.el = document.querySelector(el);
        this.el?.addEventListener("click", this.action.bind(this));
        this.el?.querySelector("#file")?.addEventListener("change", this.fileHandle.bind(this));
      }
      action(e) {
        this[e.target?.getAttribute("data-action")]?.();
        this.stateDisplay();
      }
      cancel() {
        this.isUploading = false;
        this.progress = 0;
        this.progressTimeout = null;
        this.state = 0;
        this.stateDisplay();
        this.progressDisplay();
        this.fileReset();
      }
      async copy() {
        const copyButton = this.el?.querySelector("[data-action='copy']");

        if (!this.isCopying && copyButton) {
          // disable
          this.isCopying = true;
          copyButton.style.width = `${copyButton.offsetWidth}px`;
          copyButton.disabled = true;
          copyButton.textContent = "Copied!";
          navigator.clipboard.writeText(this.filename);
          await new Promise((res) => setTimeout(res, 1000));
          // reenable
          this.isCopying = false;
          copyButton.removeAttribute("style");
          copyButton.disabled = false;
          copyButton.textContent = "Copy Link";
        }
      }
      fail() {
        this.isUploading = false;
        this.progress = 0;
        this.progressTimeout = null;
        this.state = 2;
        this.stateDisplay();
      }
      file() {
        this.el?.querySelector("#file").click();
      }
      fileDisplay(name = "") {
        // update the name
        this.filename = name;

        const fileValue = this.el?.querySelector("[data-file]");
        if (fileValue) fileValue.textContent = this.filename;

        // show the file
        this.el?.setAttribute("data-ready", this.filename ? "true" : "false");
      }
      fileHandle(e) {
        return new Promise(() => {
          const { target } = e;
          if (target?.files.length) {
            let reader = new FileReader();
            reader.onload = (e2) => {
              this.fileDisplay(target.files[0].name);
            };
            reader.readAsDataURL(target.files[0]);
            setImage(target.files[0]);
          }
        });
      }
      fileReset() {
        const fileField = this.el?.querySelector("#file");
        if (fileField) fileField.value = null;

        this.fileDisplay();
      }
      progressDisplay() {
        const progressValue = this.el?.querySelector("[data-progress-value]");
        const progressFill = this.el?.querySelector("[data-progress-fill]");
        const progressTimes100 = Math.floor(this.progress * 100);

        if (progressValue) progressValue.textContent = `${progressTimes100}%`;
        if (progressFill) progressFill.style.transform = `translateX(${progressTimes100}%)`;
      }
      async progressLoop() {
        this.progressDisplay();

        if (this.isUploading) {
          if (this.progress === 0) {
            await new Promise((res) => setTimeout(res, 1000));
            // fail randomly
            if (!this.isUploading) {
              return;
            } else if (Utils.randomInt(0, 2) === 0) {
              this.fail();
              return;
            }
          }
          // …or continue with progress
          if (this.progress < 1) {
            this.progress += 0.01;
            this.progressTimeout = setTimeout(this.progressLoop.bind(this), 50);
          } else if (this.progress >= 1) {
            this.progressTimeout = setTimeout(() => {
              if (this.isUploading) {
                this.success();
                this.stateDisplay();
                this.progressTimeout = null;
              }
            }, 250);
          }
        }
      }
      stateDisplay() {
        this.el?.setAttribute("data-state", `${this.state}`);
      }
      success() {
        this.isUploading = false;
        this.state = 3;
        this.stateDisplay();
      }
      upload() {
        if (!this.isUploading) {
          this.isUploading = true;
          this.progress = 0;
          this.state = 1;
          this.progressLoop();
        }
      }
    }

    class Utils {
      static randomInt(min = 0, max = 2 ** 32) {
        const percent = crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;
        const relativeValue = (max - min) * percent;

        return Math.round(min + relativeValue);
      }
    }
    const upload = new Uploadimage("#upload");
  }, []);

  const [institute, setInstitute] = useState({
    // typeTraining: props.currentEdit.typeTraining == "true",
    // countBranch: props.currentEdit.countBranch,
    name: props.currentEdit.name,
    fromHour: props.currentEdit.fromHour,
    toHour: props.currentEdit.toHour,
    // countClass: props.currentEdit.countClass,
    // nameCountry: props.currentEdit.nameCountry,
  });
  useEffect(() => {
    setInstitute({
      // typeTraining: props.currentEdit.typeTraining == "true",
      // countBranch: props.currentEdit.countBranch,
      name: props.currentEdit.name,
      fromHour: props.currentEdit.fromHour,
      toHour: props.currentEdit.toHour,
      // countClass: props.currentEdit.countClass,
      // nameCountry: props.currentEdit.nameCountry,
    });
    setImage(props.currentEdit.picture);
  }, [props.currentEdit]);

  const [instituteErrors, setInstituteErrors] = useState({});
  const instituteSchema = {
    // typeTraining: Joi.boolean().required().messages(messages).label("نوع المركز"),
    // countBranch: Joi.number().allow(null).messages(messages).label("عدد الأفرع"),
    // nameCountry: Joi.string().required().min(2).max(50).trim().messages(messages).label("اسم المدينة"),
    name: Joi.string().required().min(2).max(150).trim().messages(messages).label("اسم المركز"),
    fromHour: Joi.number().required().min(0).max(23).messages(messages).label("ساعة الافتتاح"),
    // countClass: Joi.number().required().min(1).messages(messages).label("عدد القاعات"),
    toHour: Joi.number().required().min(0).max(23).greater(Joi.ref("fromHour")).messages(messages).label("ساعة الإغلاق"),
  };
  const joiInstitute = Joi.object(instituteSchema);

  async function editInstitute(event) {
    const id = props.currentEdit.id;
    const newData = institute;
    const url = props.type == "center" ? `${process.env.REACT_APP_URL_STRING}/admin-training/my-center/update` : `${process.env.REACT_APP_URL_STRING}/admin-training/my-center/update`;

    setDuringAdd(true);
    let formData = new FormData();
    if (image) formData.append("picture", image);
    Object.keys(institute).map((key, index) => {
      formData.append(key, institute[key]);
    });
    // formData.append("nameCountry", "حمص");
    // formData.append("countClass", 2);

    const response = await axios.put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: props.userInformation.token,
      },
    });
    const data = response.data;

    if (data.success) {
      props.type == "center" ? props.setInstitute({ ...props.institute, name: newData.name, ...newData }) : props.setInstitutes({ ...props.institutes, [id]: { ...props.institutes[id], name: newData.name, ...newData } });
      props.setCurrentEdit(false);
      props.toast.success("تم تعديل المعهد", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    } else {
      console.log(data.error);
      props.toast.error(data.error, {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
    setDuringAdd(false);
  }

  async function changeImageHandler(img) {
    // var reader = new FileReader();
    // reader.onload = function () {
    //   setImage(reader.result);
    // };
    // reader.readAsDataURL(img);
    setImage(img);
    setChangeImage(true);
  }

  return (
    <>
      <form>
        <div className="row">
          <NewInput placeholder={""} label={"اسم المركز"} type={"text"} name={"name"} onChange={handleSave} state={institute} setState={setInstitute} errors={instituteErrors} setErrors={setInstituteErrors} schema={instituteSchema} />

          {/* <>
          <div className="row title">
          {TypeTraining.map((typeTrainingItem, index) => {
            return (
                <Fragment key={index}>
                  <label htmlFor="">{typeTrainingItem.name}</label>
                  <input
                    type="radio"
                    value={typeTrainingItem.value}
                    name="typeTraining"
                    checked={typeTrainingItem.value == (institute.typeTraining == "true")}
                    onChange={(event) => {
                      handleSave(event, institute, setInstitute, instituteErrors, setInstituteErrors, instituteSchema);
                    }}
                  />
                </Fragment>
              );
            })}
            {instituteErrors["typeTraining"] && <div className="validating-error">{instituteErrors["typeTraining"]}</div>}
          </div>
        </> */}
          {/* <Input label={"عدد القاعات"} type={"number"} name={"countClass"} onChange={handleSave} state={institute} setState={setInstitute} errors={instituteErrors} setErrors={setInstituteErrors} schema={instituteSchema} /> */}

          <NewInput placeholder={""} label={"ساعة الافتتاح"} type={"number"} name={"fromHour"} onChange={handleSave} state={institute} setState={setInstitute} errors={instituteErrors} setErrors={setInstituteErrors} schema={instituteSchema} />
          <NewInput placeholder={""} label={"ساعة الإغلاق"} type={"number"} name={"toHour"} onChange={handleSave} state={institute} setState={setInstitute} errors={instituteErrors} setErrors={setInstituteErrors} schema={instituteSchema} />
          {/* <Input label={"عدد الأفرع"} type={"number"} name={"countBranch"} onChange={handleSave} state={institute} setState={setInstitute} errors={instituteErrors} setErrors={setInstituteErrors} schema={instituteSchema} /> */}

          {/* <select
          name="nameCountry"
          defaultValue={institute.nameCountry}
          onChange={async (event) => {
            await handleSave(event, institute, setInstitute, instituteErrors, setInstituteErrors, instituteSchema);
          }}
        >
          <option value="">اختر مدينة...</option>
          {props.countries.map((countryItem, countryIndex) => {
            return (
              <option key={countryIndex} value={countryItem}>
                {countryItem}
              </option>
            );
          })}
        </select>
        {instituteErrors["nameCountry"] ? instituteErrors["nameCountry"] : null} */}

          <div id="upload" className="image" data-state="0" data-ready="false" style={{ padding: "0 2em 1.875em 1.875em" }}>
            <div className="image__header"></div>
            <div className="image__body">
              <div className="image__col">
                <svg className="image__icon image__icon--blue" viewBox="0 0 24 24" width="24px" height="24px" aria-hidden="true">
                  <g fill="none" stroke="hsl(223,90%,50%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle className="image__icon-sdo69" cx="12" cy="12" r="11" strokeDasharray="69.12 69.12" />
                    <polyline className="image__icon-sdo14" points="7 12 12 7 17 12" strokeDasharray="14.2 14.2" />
                    <line className="image__icon-sdo10" x1="12" y1="7" x2="12" y2="17" strokeDasharray="10 10" />
                  </g>
                </svg>
                <svg className="image__icon image__icon--red" viewBox="0 0 24 24" width="24px" height="24px" aria-hidden="true" display="none">
                  <g fill="none" stroke="hsl(3,90%,50%)" strokeWidth="2" strokeLinecap="round">
                    <circle className="image__icon-sdo69" cx="12" cy="12" r="11" strokeDasharray="69.12 69.12" />
                    <line className="image__icon-sdo14" x1="7" y1="7" x2="17" y2="17" strokeDasharray="14.2 14.2" />
                    <line className="image__icon-sdo14" x1="17" y1="7" x2="7" y2="17" strokeDasharray="14.2 14.2" />
                  </g>
                </svg>
                <svg className="image__icon image__icon--green" viewBox="0 0 24 24" width="24px" height="24px" aria-hidden="true" display="none">
                  <g fill="none" stroke="hsl(138,90%,50%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle className="image__icon-sdo69" cx="12" cy="12" r="11" strokeDasharray="69.12 69.12" />
                    <polyline className="image__icon-sdo14" points="7 12.5 10 15.5 17 8.5" strokeDasharray="14.2 14.2" />
                  </g>
                </svg>
              </div>
              <div className="image__col">
                <div className="image__content">
                  <h2 className="image__title">صورة المعهد</h2>
                  <p className="image__message">اختر صورة للمعهد لإضافتها</p>
                  <div className="image__actions">
                    <button className="image__button image__button--upload" type="button" data-action="file">
                      اختر صورة
                    </button>
                    <input type={"file"} id={"file"} name={"image"} hidden />
                  </div>
                  <div className="image__actions" hidden>
                    <svg className="image__file-icon" viewBox="0 0 24 24" width="24px" height="24px" aria-hidden="true">
                      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="4 1 12 1 20 8 20 23 4 23" />
                        <polyline points="12 1 12 8 20 8" />
                      </g>
                    </svg>
                    <div className="image__file" data-file></div>
                    <button className="image__button" type="button" data-action="cancel">
                      تغيير الصورة
                    </button>
                    <button className="image__button" type="button" data-action="upload">
                      رفع
                    </button>
                  </div>
                </div>
                <div className="image__content" hidden>
                  <h2 className="image__title">يتم تحميل الصورة…</h2>
                  <p className="image__message">لحظة واحدة من فضلك.</p>
                  <div className="image__actions">
                    <div className="image__progress">
                      <div className="image__progress-value" data-progress-value>
                        0%
                      </div>
                      <div className="image__progress-bar">
                        <div className="image__progress-fill" data-progress-fill></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="image__content" hidden>
                  <h2 className="image__title">عذرا!</h2>
                  <p className="image__message">لا يمكن تحميل هذا الملف. إعادة المحاولة؟</p>
                  <div className="image__actions image__actions--center">
                    <button className="image__button" type="button" data-action="upload">
                      إعادة المحاولة
                    </button>
                    <button className="image__button" type="button" data-action="cancel">
                      إلغاء
                    </button>
                  </div>
                </div>
                <div className="image__content" hidden>
                  <h2 className="image__title">نجح تحميل الصورة…!</h2>
                  <div className="image__actions image__actions--center">
                    <button className="image__button" type="button" data-action="cancel">
                      تغيير الصورة
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="button-container">
          <button
            disabled={duringAdd}
            onClick={async (event) => {
              const isValid = await validateForm(event, joiInstitute, institute, setInstituteErrors);
              if (isValid) await editInstitute(event);
              else {
                props.toast.info("أدخل جميع المعلومات بشكل صحيح", {
                  position: props.toast.POSITION.TOP_CENTER,
                });
              }
            }}
          >
            حفظ
          </button>
        </div>
      </form>
    </>
  );
}

export default EditInstituteForm;
