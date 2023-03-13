import styles from "./Checkbox.module.scss";

export default function Checkbox({ name, formik, labelName }) {
  const styleError = {
    border: "1px solid #e33e44",
  };
  return (
    <div className={styles.container}>
      <input
        id={name}
        name={name}
        type="checkbox"
        className={styles.input}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        checked={formik.values[name]}
        style={formik.errors[name] ? styleError : null}
      />
      <label
        style={formik.errors[name] ? { color: "red" } : null}
        className={styles.label}
        htmlFor={labelName}
      >
        {labelName}
      </label>
    </div>
  );
}
