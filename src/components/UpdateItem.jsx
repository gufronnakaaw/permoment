import {
  Button,
  FormControl,
  Input,
  FormLabel,
  Textarea,
  Box,
} from '@chakra-ui/react';

import Swal from 'sweetalert2';
import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

// components
import Layout from './Layout';
import ErrorPage from './ErrorPage';

// helpers
import months from '../helpers/months';
import { getDataById, updateData } from '../helpers/crud';

export default function UpdateItem() {
  const { name: month, id } = useParams();

  // check if name not includes in months array
  if (!months.includes(month)) {
    return <ErrorPage />;
  }

  // check if item not exist
  if (!getDataById(month, id)) {
    return <ErrorPage />;
  }

  document.title = 'Update Item';

  // state
  const data = getDataById(month, id);
  const [name, setName] = useState(data.name);
  const [price, setPrice] = useState(data.price);
  const [description, setDescription] = useState(data.description);
  const navigate = useNavigate();

  // function section
  function autoFormatNumber(e) {
    const value = e.target.value;
    const regex = /[0-9]|\./;

    if (!regex.test(value)) {
      return (e.target.value = '');
    }

    if (value == '') {
      return;
    }

    const explode = value.split('.').join('');
    const format = new Intl.NumberFormat('id-ID').format(explode);

    e.target.value = format;
    setPrice(parseInt(explode));
  }

  function handleUpdate() {
    const update = {
      name,
      price,
      description,
      updatedAt: new Date().toLocaleString(),
    };

    if (updateData(month, update, id)) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        icon: 'success',
        title: 'Item updated',
        width: 'auto',
      });

      return navigate(`/month/${month}`);
    }

    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Cannot update data',
    });
  }

  return (
    <Layout>
      <Link to={`/month/${month}`}>
        <Button colorScheme="gray" size="sm">
          Back
        </Button>
      </Link>

      <Box mt={4} bgColor="white" p="5" borderRadius="10">
        <FormControl>
          <FormLabel>
            Name <span style={{ color: 'red' }}>*</span>
          </FormLabel>
          <Input
            placeholder="Example: Hoodie Off White"
            onKeyUp={(e) => setName(e.target.value)}
            defaultValue={name}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>
            Price <span style={{ color: 'red' }}>*</span>
          </FormLabel>
          <Input
            placeholder="Example: 100.000"
            onKeyUp={autoFormatNumber}
            defaultValue={new Intl.NumberFormat('id-ID').format(price)}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Description (optional)</FormLabel>
          <Textarea
            placeholder="Example: kado buat ayang"
            onKeyUp={(e) => {
              const value = e.target.value;
              setDescription(value == '' ? null : value);
            }}
            defaultValue={description}
          />
        </FormControl>
        <Button colorScheme="linkedin" onClick={handleUpdate} mt={3}>
          Update
        </Button>
      </Box>
    </Layout>
  );
}
