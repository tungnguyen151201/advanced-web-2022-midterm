import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const token = 'Bearer ' + localStorage.getItem('token');

const JoinGroups = () => {
  const nagative = useNavigate();
  // the dynamic pieces of the URL.
  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/join/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        nagative('/mygroup');
      });
  });
};

export default JoinGroups;
