import "./contactsAdder.css";
import axios from "axios";
import { useState } from "react";


export const ContactsAdder = ({ data, setData, hideAdder }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const postData = () => {
    const object = {
      name: name,
      phone: phone,
    };
    axios.post("https://615ed961af365900172045db.mockapi.io/contacts", object);
    const temp = [...data]
    temp.push(object)
    setData(temp)
    hideAdder();
  };

  return (
    <div className="contactsAdder">
      <div className="contactsAdderShell">
        <div className="contactsAdderHeader">Create a contact</div>
        <div className="contactsAdderName">
          <input
            type="text"
            value={name}
            placeholder="Type in the name"
            onChange={handleName}
          />
        </div>
        <div className="contactsAdderPhone">
          <input
            type="text"
            value={phone}
            placeholder="Type in the phone number"
            onChange={handlePhone}
          />
        </div>

        <button className="createButton" onClick={postData}>
          Create contact
        </button>
      </div>
    </div>
  );
};
