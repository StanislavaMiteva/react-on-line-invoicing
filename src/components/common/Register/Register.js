import { auth } from '../../../utils/firebase';

import UserFormView from '../UserFormView/UserFormView';

const Register = ({
    history
}) => {

    const onRegisterFormSubmitHandler = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        auth.createUserWithEmailAndPassword(username, password)
            .then(() => {
                console.log('Successful registration')
                history.push('/')
            })
            .catch(error => {
                console.log(error.message, 'Error - regiter user');
                history.push('/register');
            })
    }
    return (
        <section className="register">
            <UserFormView
                onSubmitHandler={onRegisterFormSubmitHandler}
                formTitle="Register"
            />
        </section>
    );
}

export default Register;