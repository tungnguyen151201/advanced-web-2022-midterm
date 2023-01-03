import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { BsCursorFill } from 'react-icons/bs';
import './SendEmail.css';

const SendEmail = () => {
  const nagative = useNavigate();
  let { id } = useParams();
  async function onSubmit(data) {
    try {
      const { email } = data;
      const token = 'Bearer ' + localStorage.getItem('token');
      console.log(id, email);
      //http://localhost:3001/sendInviteEmail/6384e2f3fb3e22ca322f8289
      //   6384e2f3fb3e22ca322f8289
      const res = await axios.get(
        `http://localhost:3001/sendInviteEmail/${id}`,
        { email },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const { status } = res.data;
      console.log(res);
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
    <div className="email__container">
      <Form className="email__form" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="email__label">Enter an email to invite</Form.Label>
          <Form.Control
            className="email__input"
            {...register('email', {
              required: 'email is required',
            })}
            type="email"
            placeholder="e.g. example@gmail.com"
          />
          {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
        </Form.Group>
        <Button className="email__btn" variant="primary" type="submit">
          Send
          <BsCursorFill />
        </Button>
      </Form>
    </div>
  );
};
export default SendEmail;
