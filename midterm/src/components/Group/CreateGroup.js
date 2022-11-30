import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
const ModalcreateGroup = () => {
  const nagative = useNavigate();
  async function onSubmit(data) {
    try {
      const { groupname } = data;
      const token = 'Bearer ' + localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:3001/groups/create',
        { groupname },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const { status } = res.data;
      if (status) {
        nagative('/mygroup');
      }
      //   setList(res.data.myGroups);
    } catch (error) {
      console.error(error.message);
    }
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   const variant = alert.status ? 'success' : 'danger';

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Group Name</Form.Label>
        <Form.Control
          {...register('groupname', {
            required: 'groupname is required',
          })}
          type='text'
          placeholder='Enter groupname'
        />
        {errors.groupname && (
          <Form.Text className='text-danger'>
            {errors.groupname.message}
          </Form.Text>
        )}
      </Form.Group>
      <Button variant='primary' type='submit'>
        Create Group
      </Button>
    </Form>
  );
  //   const {
  //     create,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm();
  //   return (
  //     <Form onSubmit={handleSubmit(onSubmit)}>
  //       <Form.Group className='mb-3' controlId='formBasicEmail'>
  //         <Form.Label>Group Name</Form.Label>
  //         <Form.Control
  //           {...create('groupname', {
  //             required: 'groupname is required',
  //           })}
  //           type='text'
  //           placeholder='Enter groupname'
  //         />
  //         {errors.groupname && (
  //           <Form.Text className='text-danger'>
  //             {errors.groupname.message}
  //           </Form.Text>
  //         )}
  //       </Form.Group>
  //       <Button variant='primary' type='submit'>
  //         Create Group
  //       </Button>
  //     </Form>
  //   );
};
export default ModalcreateGroup;
