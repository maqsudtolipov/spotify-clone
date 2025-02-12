import styles from './Input.module.scss';

interface InputProps {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  onChange?: (arg0: any) => any;
}

const Input = ({ type, name, label, placeholder, onChange }: InputProps) => {
  return (
    <div>
      {label && (
        <label className={styles.label} htmlFor="">
          {label}
        </label>
      )}
      <input
        className={`${styles.input} ${type === 'file' ? styles.inputFile : ''}`}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
