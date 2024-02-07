import { FormRow, FormRowSelect } from '.';
import Wrapper from '../wrappers/DashboardFormPage';
import { Form, useSubmit, Link } from 'react-router-dom';
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from '../../../utils/constants';
import { useAllJobsContext } from '../pages/AllJobs';

const SearchContainer = () => {
    const {searchValues} = useAllJobsContext();
    const { search, jobStatus, jobType, sort } = searchValues;
    const submit = useSubmit();

    const debounce = (onChange) => {
        let timeout;

        return (e) => {
            // Looking for any change in the search form.
            const form = e.currentTarget.form;
            clearTimeout(timeout);

            // Timer set to send a request 1 second after the last keystroke.
            timeout = setTimeout(() => {
                // This function will invoke whatever gets passed as a parameter from the search form.
                onChange(form);
            }, 1000)

        };
    };
    return(
        <Wrapper>
            <Form className='form'>
                <h5 className='form-title'>search form</h5>
                <div className='form-center'>
                    <FormRow 
                        type='search' 
                        name='search' 
                        defualtValue={search} 
                        onChange={debounce((form) => {
                            submit(form);
                        })}
                    />

                    <FormRowSelect 
                        labelText='job status' 
                        name="jobStatus" 
                        list={['all', ...Object.values(JOB_STATUS)]} 
                        defaultValue={jobStatus}
                        onChange={(e)=> { 
                            submit(e.currentTarget.form); 
                        }}
                    />
                    <FormRowSelect 
                        labelText='job type' 
                        name="jobType" 
                        list={['all', ...Object.values(JOB_TYPE)]}
                        defaultValue={jobType}
                        onChange={(e)=> { 
                            submit(e.currentTarget.form); 
                        }} 
                    />
                    <FormRowSelect 
                        name='sort' 
                        defaultValue={sort}
                        onChange={(e)=> { 
                            submit(e.currentTarget.form); 
                        }} 
                        list={[...Object.values(JOB_SORT_BY)]}
                    />

                    <Link to='/dashboard/all-jobs' className='btn form-btn delete-btn'>
                        Reset Search Values
                    </Link>

                </div>
            </Form>
        </Wrapper>
    );
}

export default SearchContainer;