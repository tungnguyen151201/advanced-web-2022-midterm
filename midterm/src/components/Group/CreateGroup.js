import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './CreateGroup.css';
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
    <div className="group__container">
      <Form className="group__form" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className=" mb-3" controlId="formBasicEmail">
          <Form.Label className="group__label">Enter your group name</Form.Label>
          <Form.Control
            className="group__input"
            {...register('groupname', {
              required: 'groupname is required',
            })}
            type="text"
            placeholder="e.g. Group01"
          />
          {errors.groupname && <Form.Text className="text-danger">{errors.groupname.message}</Form.Text>}
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Group
        </Button>
      </Form>
    </div>
  );
};
export default ModalcreateGroup;
