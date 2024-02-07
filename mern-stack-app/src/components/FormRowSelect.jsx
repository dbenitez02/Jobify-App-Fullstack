/* eslint-disable react/prop-types */
const FormRowSelect = ({ name, labelText, list, defaultValue, onChange }) => {
    return(
        <div className='form-row'>
        <label htmlFor={name} className='form-label'>
            { labelText || name }
        </label>
        <select 
            name={name}
            id={name}
            className='form-select'
            onChange={onChange}
            defaultValue={defaultValue}>
                {/**Listing all job statuses */}
                {list.map((item) => {
                    return (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    );
                })}   
        </select>
    </div>
    );
}

export default FormRowSelect;