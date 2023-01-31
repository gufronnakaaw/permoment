import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
  FormLabel,
  Textarea,
  useToast,
} from '@chakra-ui/react';

import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

// components
import Layout from './Layout';
import ErrorPage from './ErrorPage';

// helpers
import months from '../helpers/months';
import { getMonth } from '../helpers/date';
import { getData, deleteData, saveData } from '../helpers/crud';
import { formatPrice, formatString } from '../helpers/format';

export default function Month() {
  const { name: month } = useParams();

  // check if name not includes in months array
  if (!months.includes(month)) {
    return <ErrorPage />;
  }

  document.title = `Month ${formatString(month)}`;

  // state section
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState(null);
  const toast = useToast();

  useEffect(() => {
    setData(getData(month));
  }, [month]);

  // modal add item
  const {
    isOpen: isOpenAdd,
    onClose: onCloseAdd,
    onOpen: onOpenAdd,
  } = useDisclosure();

  // function section
  function handleDelete(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6c5ce7',
      cancelButtonColor: '#d63031',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        if (deleteData(month, id)) {
          setData(getData(month));

          return Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            icon: 'success',
            title: 'Item deleted',
            width: 'auto',
          });
        }

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Cannot delete data',
        });
      }
    });
  }

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

  function handleAdd() {
    if (name == '') {
      return toast({
        title: 'Name cannot be empty',
        status: 'error',
        duration: 2000,
        position: 'top-right',
      });
    }

    if (price == '') {
      return toast({
        title: 'Price cannot be empty',
        status: 'error',
        duration: 2000,
        position: 'top-right',
      });
    }

    // do insert
    // soon
    const insert = {
      id: Math.random().toString(36).slice(2, 7),
      name: name,
      price: price,
      description: description,
      createdAt: new Date().toLocaleString(),
      updatedAt: null,
    };

    if (saveData(month, insert)) {
      setData(getData(month));
      return onCloseAdd();
    }

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Cannot add item!',
    });
    return onCloseAdd();
  }

  return (
    <Layout>
      {getMonth() == month ? (
        <Button
          colorScheme="green"
          size="sm"
          mx="1"
          mb="4"
          onClick={() => onOpenAdd()}
        >
          Add Item
        </Button>
      ) : null}
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th style={{ textAlign: 'center' }}>#</Th>
              <Th style={{ textAlign: 'center' }}>Name</Th>
              <Th style={{ textAlign: 'center' }}>Price</Th>
              <Th style={{ textAlign: 'center' }}>Description</Th>
              <Th style={{ textAlign: 'center' }}>Created At</Th>
              <Th style={{ textAlign: 'center' }}>Updated At</Th>
              <Th style={{ textAlign: 'center' }}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.length == 0 ? (
              <Tr>
                <Td style={{ textAlign: 'center' }} colSpan={7}>
                  empty like your heart 😝
                </Td>
              </Tr>
            ) : (
              data.map((item, index) => {
                return (
                  <Tr key={index}>
                    <Td style={{ textAlign: 'center' }}>{index + 1}</Td>
                    <Td style={{ textAlign: 'center' }}>{item.name}</Td>
                    <Td style={{ textAlign: 'center' }}>
                      Rp{formatPrice(item.price)}
                    </Td>
                    <Td style={{ textAlign: 'center' }}>
                      {!item.description ? '-' : item.description}
                    </Td>
                    <Td style={{ textAlign: 'center' }}>{item.createdAt}</Td>
                    <Td style={{ textAlign: 'center' }}>
                      {!item.updatedAt ? '-' : item.updatedAt}
                    </Td>
                    <Td style={{ textAlign: 'center' }}>
                      <Flex justifyContent="center">
                        <Link to={`/update/${month}/item/${item.id}`}>
                          <Button colorScheme="linkedin" size="sm" mx="1">
                            Update
                          </Button>
                        </Link>
                        <Button
                          colorScheme="red"
                          size="sm"
                          mx="1"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                );
              })
            )}
          </Tbody>
        </Table>
      </TableContainer>

      <Modal isOpen={isOpenAdd} onClose={onCloseAdd} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>
                Name <span style={{ color: 'red' }}>*</span>
              </FormLabel>
              <Input
                placeholder="Example: Hoodie Off White"
                onKeyUp={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>
                Price <span style={{ color: 'red' }}>*</span>
              </FormLabel>
              <Input
                placeholder="Example: 100.000"
                onKeyUp={autoFormatNumber}
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
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onCloseAdd}>
              Close
            </Button>
            <Button colorScheme="green" onClick={handleAdd}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
}
