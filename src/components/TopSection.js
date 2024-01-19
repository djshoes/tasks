import styles from '../styles/topSection.module.scss'

const TopSection = (props) => {
    return ( 
        <div id={props.id} className={`${styles.topSection} ${props.className}`}>
            {props.children}
            <form id={props.formid} onSubmit={props.handleAdd} className='my-3 w-100'>
                <div className='input-group'>
                    <input className='form-control' required type='text' id={props.inputid} placeholder={props.placeholder} onChange={props.handleChange} />
                    <div className='input-group-append'>
                        <button className='btn btn-primary' type='submit'>Add</button>
                    </div>
                </div>
            </form>
        </div>
     );
}
 
export default TopSection;