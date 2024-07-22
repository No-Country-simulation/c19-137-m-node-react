import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SocialRecuperar = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h1 style={styles.heading}>Recupera tu contraseña </h1>
        <form style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Ingresa tu nombre de usuario
o correo electrónico</label>
            <input type="email" id="email" name="email" required style={styles.input} placeholder="micorreo@electronico.com" />
          </div>
   
          <button type="submit" style={styles.button}>Recuperar contraseña </button>
        </form>
        <p style={styles.text}>¿No tienes una cuenta? <a href="/signup" style={styles.link}>Regístrate aquí.</a></p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontFamily: 'Inter, sans-serif',
  },
  loginBox: {
    width: '100%',
    maxWidth: '400px',
    height: 'auto',
    maxHeight: '660px',
    padding: '120px',
    borderRadius: '32px',
    backgroundColor: '#F4F4F4',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    marginBottom: '40px',
    color: '#000',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '29px',
    textAlign: 'center',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '40px',
  },
  formGroup: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '10px',
  },
  label: {
    marginBottom: '6px',
    color: '#333',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '19px',
  },
  passwordContainer: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: '16px 48px 16px 16px',
    border: '1px solid #747474',
    borderRadius: '8px',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '19px',
    color: '#000',
    boxSizing: 'border-box',
    backgroundColor: '#F4F4F4',
    caretColor: '#000',
  },
  icon: {
    position: 'absolute',
    right: '16px',
    cursor: 'pointer',
    color: '#747474',
  },
  button: {
    width: '100%',
    padding: '16px 80px',
    borderRadius: '100px',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '19px',
    textAlign: 'center',
    cursor: 'pointer',
    border: 'none',
    marginTop: '24px',
  },
  text: {
    marginTop: '24px',
    color: '#000',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '19px',
    textAlign: 'center',
  },
  link: {
    color: '#007BFF',
    textDecoration: 'none',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '19px',
  },
};

export default SocialRecuperar;
