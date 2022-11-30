import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
const ModalcreateGroup = (props) => {
  async function onSubmit(data) {
    try {
      const { groupname } = data;
      const token = 'Bearer ' + localStorage.getItem('token');
      await axios.post(
        'http://localhost:3001/groups/create',
        { groupname },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      //   setList(res.data.myGroups);
    } catch (error) {
      console.error(error.message);
    }
  }
  const {
    createGroup,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Group Name</Form.Label>
            <Form.Control
              {...createGroup('groupname', {
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
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalcreateGroup;
// function App() {
//   const [modalShow, setModalShow] = React.useState(false);

//   return (
//     <>
//       <Button variant='primary' onClick={() => setModalShow(true)}>
//         Launch vertically centered modal
//       </Button>

//       <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//     </>
//   );
// }

// render(<App />);
