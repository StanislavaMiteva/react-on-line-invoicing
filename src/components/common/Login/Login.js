import { auth } from '../../../utils/firebase';

import UserFormView from "../UserFormView/UserFormView";

const Login = ({
    history
}) => {

    const onLoginFormSubmitHandler = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        auth.signInWithEmailAndPassword(username, password)
            .then(() => {
                console.log('Successful login')
                history.push("/")
            })
            .catch(error => {
                console.log(error.message, 'Error - login user');
                history.push('/login');
            })
    };

    return (
        <section className="login">
            <UserFormView
                onSubmitHandler={onLoginFormSubmitHandler}
                formTitle="Login"
            />
        </section>
    );
}

export default Login;