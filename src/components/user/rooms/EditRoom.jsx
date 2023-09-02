import { useEffect, useState } from "react";
import Joi from "joi";
import validateForm from "../../../functions/validateForm";
import handleSave from "../../../functions/handleSave";
import requestOptions from "../../../constants/requestOptions";
import messages from "../../../constants/messages";
import selectOptions from "../../../constants/selectOptions";
import NewInput from "../../general/NewInput";
import SelectInput from "../../general/SelectInput";

function EditRoom(props) {
  const [duringAdd, setDuringAdd] = useState(false);
  const [room, setRoom] = useState({
    name: props.currentEdit.name,
    count: props.currentEdit.count,
  });

  useEffect(() => {
    setRoom({
      name: props.currentEdit.name,
      count: props.currentEdit.count,
    });
  }, [props.currentEdit]);
  const [roomErrors, setRoomErrors] = useState({});
  const roomSchema = {
    name: Joi.string()
      .regex(/^[\u0621-\u064Aa-zA-Z1-9\_\s]+$/)
      .required()
      .trim()
      .messages({ ...messages, "string.pattern.base": "{{#label}} يجب أن يتضمن أحرفا وأرقاما فقط" })
      .label("اسم القاعة"),

    count: Joi.number().integer().required().messages(messages).label("السعة"),
  };
  const joiRoom = Joi.object(roomSchema);

  async function editRoom(event) {
    const isValid = await validateForm(event, joiRoom, room, setRoomErrors);
    if (isValid) {
      const newData = room;
      const id = props.currentEdit.id;
      const infoRequestOptions = {
        ...requestOptions,
        method: "put",
        headers: { ...requestOptions.headers, authorization: props.userInformation.token },
        body: JSON.stringify({
          ...room,
        }),
      };
      setDuringAdd(true);
      // const response = await fetch(`http://localhost:3001/admin-training/room/update/${id}`, infoRequestOptions);
      // const data = await response.json();
      const data = { success: true };
      if (data.success) {
        props.setRooms({ ...props.rooms, [props.branch]: { ...props.rooms[props.branch], [id]: { id: id, ...newData } } });
        props.setCurrentEdit(false);
        props.toast.success("تم تعديل القاعة", {
          position: props.toast.POSITION.TOP_CENTER,
        });
      } else {
        console.log(data.error);
        props.toast.error(data.error, {
          position: props.toast.POSITION.TOP_CENTER,
        });
      }
      setDuringAdd(false);
    } else {
      props.toast.info("أدخل جميع المعلومات بشكل صحيح", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
  }

  return (
    <>
      <form>
        <div className="row">
          <NewInput placeholder={""} label={"اسم القاعة"} type={"text"} name={"name"} onChange={handleSave} state={room} setState={setRoom} errors={roomErrors} setErrors={setRoomErrors} schema={roomSchema} />
          <NewInput placeholder={""} label={"السعة"} type={"number"} name={"count"} onChange={handleSave} state={room} setState={setRoom} errors={roomErrors} setErrors={setRoomErrors} schema={roomSchema} />
        </div>

        <div className="button-container">
          <button
            disabled={duringAdd}
            onClick={async (event) => {
              const isValid = await validateForm(event, joiRoom, room, setRoomErrors);
              isValid && (await editRoom(event));
            }}
          >
            حفظ
          </button>
        </div>
      </form>
    </>
  );
}

export default EditRoom;
