import "./contacts.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Create from "../assets/create.png";
import Edit from "../assets/edit.png";
import Delete from "../assets/delete.png";
import { ContactsAdder } from "../components/contactsAdder";

export const Contacts = () => {
  const [data, setData] = useState([]);
  const [adderVisible, setAdderVisible] = useState(false);
  const [editingMode, setEditingMode] = useState(null);
  const [editingContentName, setEditingContentName] = useState("");
  const [editingContentPhone, setEditingContentPhone] = useState("")

  const getData = async () => {
    const response = await axios.get(
      "https://615ed961af365900172045db.mockapi.io/contacts"
    );
    setData(response.data);
    console.log(response.data);
  };

  const deleteData = (id) => {
    axios.delete(`https://615ed961af365900172045db.mockapi.io/contacts/${id}`);
    const filtered = data.filter((item) => item.id !== id);
    setData(filtered);
  };

  const editData = (id) => {
      const updatedData = [...data].map((info) => {
          if (info.id === id) {
              info.name = editingContentName
              info.phone = editingContentPhone
          }
          return info
      })
      setData(updatedData)
      setEditingMode(null)
      setEditingContentName("")
      setEditingContentPhone("")
  };

  const showAdder = () => {
    setAdderVisible(true);
  };
  const hideAdder = () => {
    setAdderVisible(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="contacts">
        <div className="contactsShell">
          <div className="contactsHeader">
              
            <div>Contacts: {data.length}</div>
            <div><img
              src={Create}
              alt="create"
              className="icon"
              onClick={showAdder}
            /></div>
            
          </div>
          <div className="contactsContent">
            <ul className="contactsList">
              {data.map((info) => (
                <li key={info.id}>
                  <div className="other">
                    
                    {editingMode === info.id ? (
                      <>
                        <input
                          type="text"
                          value={editingContentName}
                          onChange={(e) => setEditingContentName(e.target.value)}
                        />
                        <input
                          type="text"
                          value={editingContentPhone}
                          onChange={(e) => setEditingContentPhone(e.target.value)}
                        />
                      </>
                    ) : (
                      <>
                        <div className="name">{info.name}</div>
                        <div className="phone">{info.phone}</div>
                      </>
                    )}
                    {editingMode ? (
                        <img
                      src={Edit}
                      alt="edit"
                      className="icon"
                      onClick={() => editData(info.id)}
                    />
                    ) : <img
                    src={Edit}
                    alt="edit"
                    className="icon"
                    onClick={() => setEditingMode(info.id)}
                  />}
                    
                    <img
                      src={Delete}
                      alt="delete"
                      className="icon"
                      onClick={() => deleteData(info.id)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {adderVisible ? (
        <>
          <ContactsAdder hideAdder={hideAdder} data={data} setData={setData} />
          <div className="cover" onClick={hideAdder} />
        </>
      ) : null}
    </>
  );
};
