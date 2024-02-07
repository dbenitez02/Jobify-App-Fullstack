/* eslint-disable no-unused-vars */
import { Form, redirect, Link } from "react-router-dom";
import Wrapper from "../wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitButton } from "../components";
import { toast } from "react-toastify";

import customFetch from '../utils/customFetch';

export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    
    try {
        await customFetch.post('/auth/register', data);
        toast.success('Registration Success!')
        return redirect('/login');
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    }
};

const Register = () => {

    return (
        <Wrapper>
            <Form method="post" className="form">
                <Logo/>
                <h4>Register</h4>
                    <FormRow type="text" name="firstName" labelText="First Name"/>
                    <FormRow type="text" name="lastName" labelText="Last Name"/>
                    <FormRow type="text" name="location" labelText="Location"/>
                    <FormRow type="email" name="email" labelText="Email"/>
                    <SubmitButton />
                    <p>Already a member?
                    <Link to="/login" className="member-btn">
                        Login
                    </Link>
                    </p>
                </Form>
        </Wrapper>

    );
}

export default Register;