import { FormRow, FormRowSelect, SubmitButton } from '../components';
import Wrapper from '../wrappers/DashboardFormPage';
import { useLoaderData, useParams } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const loader = async ({ params }) => {
    try {
        const { data } = await customFetch.get(`/jobs/${params.id}`);
        return data;

    } catch(error) {
        toast.error(error?.response?.data?.msg);
        return redirect('/dashboard/all-jobs');
    }
}

export const action = async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try{
        await customFetch.patch(`/jobs/${params.id}`, data);
        toast.success('Job edited successfully!');
        return redirect('/dashboard/all-jobs');

    } catch(error) {
        toast.error(error?.response?.data?.msg);
        return redirect('/dashboard/all-jobs');
    }
    
}

const EditJob = () => {
    const params = useParams();
    console.log(params);

    const { job } = useLoaderData();


    return(
        <Wrapper>
            <Form method='post' className='form'>
                <h4 className='form-title'>Edit job</h4>
                <div className='form-center'>
                    <FormRow type="text" name="position" defualtValue={job.position} />
                    <FormRow type="text" name="company" defualtValue={job.company} />
                    <FormRow type="text" name="jobLocation" labelText="Job Location" defualtValue={job.jobLocation} />
                    <FormRowSelect 
                        labelText='Job Status' 
                        name='jobStatus' 
                        defaultValue='Job Status' 
                        defualtValue={job.jobStatus} 
                        list={Object.values(JOB_STATUS)}
                    />
                    <FormRowSelect 
                        labelText='Job Type' 
                        name='jobType' 
                        defaultValue='Job Type' 
                        defualtValue={job.jobType} 
                        list={Object.values(JOB_TYPE)}
                    />
                    
                    <SubmitButton formBtn />


                </div>

            </Form>
        </Wrapper>
    );
}

export default EditJob;