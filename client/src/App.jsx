import styles from './Button.module.scss'

const Button = () => {
  return (
    <button className={styles.btn}>
      Hi 👋
    </button>
  );
};

const App = () => {
  return (
    <div>
      <h1>Hello world</h1>
      <Button />
    </div>
  )
}

export default App
