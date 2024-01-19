import styles from '../../styles/toggleSlider.module.scss'

const ToggleTheme = () => {
    const toggleTheme = () => {
        document.body.classList.toggle('light')
    }

    return ( 
        // <button onClick={toggleTheme}>Dark</button>
        <div>
            {/* <button onClick={toggleTheme}>Theme</button> */}
            <input onClick={toggleTheme} type="checkbox" id="toggle" className={styles.toggle_checkbox} />
            <label htmlFor="toggle" className={styles.toggle_label}>
                <span className="toggle--label-background"></span>
            </label>
        </div>
     );
}
 
export default ToggleTheme;