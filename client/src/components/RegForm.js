import { useState } from "react";
import Button from "./Button";
import { createUser } from "../web3/users";
import ipfs from "../ipfs";

const Input = ({ title, value, onChange }) => (
  <div className="border">
    <label>{title}</label>

    <input value={value} onChange={onChange} />

    <style jsx>{`
      .border {
        border-bottom: 1px solid rgba(0, 0, 0, 0.13);
        margin: 0 -14px;
        padding: 0 14px;
      }
      div:first-of-type {
        border-top: 1px solid rgba(0, 0, 0, 0.13);
      }
      label {
        font-size: 13px;
        color: rgba(81, 81, 112, 0.66);
        text-transform: uppercase;
        display: block;
        margin-top: 8px;
      }
      input {
        width: 100%;
        box-sizing: border-box;
        font-size: 17px;
        padding-top: 8px;
        padding-bottom: 13px;
        border: none;
      }
      input:focus {
        border: none;
        outline: none;
      }
    `}</style>
  </div>
);

export default function RegForm({ onClose }) {
  const [formState, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    gravatarEmail: "",
    bio: "",
    profile: null,
  });

  const updateField = (fieldName, e) => {
    e.preventDefault();

    if (fieldName === "profile") {
      const file = e.target.files[0];
      if (file) {
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
          formState[fieldName] = Buffer(reader.result);
          setForm(formState);
        };
      } else {
        formState[fieldName] = null;
        setForm(formState);
      }
    } else {
      formState[fieldName] = e.target.value;
      setForm(formState);
    }
  };

  const createuser = async (e) => {
    e.preventDefault();

    var hash = "";

    if (formState["profile"]) {
      try {
        const uploadResult = await ipfs.add(Buffer.from(formState["profile"]));
        console.log(uploadResult.path);
        hash = uploadResult.path;
      } catch (e) {
        return alert(e);
      }
    }

    for (let key in formState) {
      if (key !== "profile") {
        if (!formState[key]) {
          return alert(`You must fill in your ${key}!`);
        }
      }
    }

    const { firstName, lastName, username, bio, gravatarEmail } = formState;

    try {
      const res = await createUser(
        username,
        firstName,
        lastName,
        bio,
        gravatarEmail,
        hash
      );

      if (res.tx !== undefined) {
        alert(`Your user has been created!`);
        window.location.reload();
      } else throw res.message;
    } catch (err) {
      alert(`Sorry, we couldn't create your user: ${err}`);
    }

    onClose();
  };

  return (
    <form onSubmit={async (e) => await createuser(e)}>
      <h3>Create your account</h3>

      <Input title="First name" onChange={(e) => updateField("firstName", e)} />

      <Input title="Last name" onChange={(e) => updateField("lastName", e)} />

      <Input
        title="Desired username"
        onChange={(e) => updateField("username", e)}
      />

      <Input
        title="Email"
        type="email"
        onChange={(e) => updateField("gravatarEmail", e)}
      />

      <Input title="Bio" onChange={(e) => updateField("bio", e)} />

      <label>Profile Pic</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => updateField("profile", e)}
      />

      <footer>
        <Button type="submit">Create</Button>
      </footer>

      <style jsx>{`
        h3 {
          padding-bottom: 10px;
        }
        footer {
          text-align: right;
          padding-top: 16px;
        }
      `}</style>
    </form>
  );
}
