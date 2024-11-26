import { useState, useEffect } from 'react';
import Button from '../../../../components/Button';
import styles from './UserDataForm.module.css';
import Input from '../../../../components/Input';

const EstimateUserFormComponent = ({ onSubmit, handleContinue, initialFormData, step = 3 }) => {
  const [formDataState, setFormDataState] = useState({
    prename: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    ...initialFormData // Initialize with prop data if provided
  } || {});

  useEffect(() => {
    handleContinue(true);
  }, [handleContinue]);

  // Function to handle form input changes
  function handleChange(event) {
    const { name, value } = event.target;
    setFormDataState((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // Function to validate form data
  function validateForm() {
    const { prename, name, email, phone, address } = formDataState;
    return prename && name && email && phone && address;
  }

  useEffect(() => {
    handleContinue(validateForm());
    onSubmit(formDataState);
  }, [formDataState, handleContinue, onSubmit]);

  return (
    <form>
      <div className={styles.rent_summary__left_container}>
        <h2 className={styles["form-title"]}>Informations personnelles</h2>
        <Input
          type="text"
          id="prename"
          name="prename"
          label={"Prénom"}
          placeholder={"Ex: Jean"}
          value={formDataState.prename}
          onChange={handleChange}
          required
          fullWidth
        />
        <Input
          type="text"
          id="name"
          name="name"
          label={"Nom"}
          placeholder={"Ex: Dupont"}
          value={formDataState.name}
          onChange={handleChange}
          required
          fullWidth
        />
        <Input
          type="email"
          id="email"
          name="email"
          label={"Email"}
          placeholder={"Ex: contact@bsmove.com"}
          value={formDataState.email}
          onChange={handleChange}
          required
          fullWidth
        />
        <Input
          type="tel"
          id="phone"
          name="phone"
          label={"Téléphone"}
          placeholder={"Ex: 0712345678"}
          value={formDataState.phone}
          onChange={handleChange}
          required
          fullWidth
        />
        <Input
          type="text"
          id="address"
          name="address"
          label={"Addresse"}
          placeholder={"Ex: 10 rue des champs élysées"}
          value={formDataState.address}
          onChange={handleChange}
          required
          fullWidth
        />
      </div>
    </form>
  );
};

export default EstimateUserFormComponent;
