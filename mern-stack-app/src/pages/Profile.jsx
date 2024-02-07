import { FormRow, SubmitButton } from '../components';
import Wrapper from '../wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { Form } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('avatar');

    if(file && file.size > 500000) {
        toast.error('Image size too large.');
        return null;
    }

    try {
        await customFetch.patch('/users/update-user', formData);
        toast.success('Profile updated successfully!');
    } catch (error) {
        toast.error(error?.response?.data?.msg);
    }
    
    return null;

}

const Profile = () => {
    const { user } = useOutletContext();
    const { firstName, lastName, email, location } = user;


    return(
        <Wrapper>
            <Form method='post' className='form' encType='multipart/form-data'>
                <h4 className='form-title'>Profile</h4>
                <div className='form-center'>
                    <div className='form-row'>
                        <label htmlFor='avatar' className='form-label'>
                            Select an image file (max 0.5 MB)
                        </label>
                        <input 
                            type='file' 
                            id='avatar' 
                            name='avatar' 
                            className='form-input' 
                            accept='image/*'
                        />
                    </div>
                    <FormRow type='text' name='firstName' labelText='First Name' defualtValue={firstName} />
                    <FormRow type='text' name='lastName' labelText='Last Name' defualtValue={lastName} />
                    <FormRow type='text' name='email' defualtValue={email} />
                    <FormRow type='text' name='location' defualtValue={location} />

                    <SubmitButton formBtn />
                </div>
            </Form>
        </Wrapper>
    );
}

export default Profile;