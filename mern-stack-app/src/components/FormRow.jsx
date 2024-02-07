// eslint-disable-next-line react/prop-types
const FormRow = ({ type, name, labelText, defualtValue, onChange }) => {
    return (
        <div className="form-row">
            <label htmlFor={name} className="form-label">
                { labelText || name }
            </label>
            <input
                type={type}
                id={name}
                name={name}
                className="form-input"
                defaultValue={defualtValue}
                onChange={onChange}
                required />
        </div>
    );

}

export default FormRow;