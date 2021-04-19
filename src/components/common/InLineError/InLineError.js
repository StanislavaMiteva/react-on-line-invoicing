import './InLineError.css';

const InLineError = ({field, errors}) => {
    if (!errors) {
        return null;
    }

    if  (!errors[field]) {
        return null;
    }

    return (
        <div className='errors-container'>
            <ul>
                {errors[field].map((error, index) => <li key={index}>{error}</li>)}
            </ul>
        </div>
    );
}

export default InLineError;