import {
  Center,
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
  Button,
} from '@chakra-ui/react';

import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

// components
import Layout from './Layout';

// helpers
import months from '../helpers/months';
import { formatPrice } from '../helpers/format';
import { getData } from '../helpers/crud';

export default function Dashboard() {
  // check if localstorage is not set
  if (!localStorage.getItem('dashboard')) {
    localStorage.setItem(
      'dashboard',
      JSON.stringify({
        inflow: 0,
      })
    );
  }

  months.map((month) => {
    if (!localStorage.getItem(month)) {
      localStorage.setItem(month, JSON.stringify([]));
    }
  });

  // state section
  const [inflow, setInflow] = useState(0);
  document.title = 'Dashboard';

  // modal add
  const {
    isOpen: isOpenAddInflow,
    onClose: onCloseAddInflow,
    onOpen: onOpenAddInflow,
  } = useDisclosure();

  // modal update
  const {
    isOpen: isOpenUpdateInflow,
    onClose: onCloseUpdateInflow,
    onOpen: onOpenUpdateInflow,
  } = useDisclosure();

  // total item
  let totalItem = 0;
  months.map((month) => {
    totalItem += getData(month).length;
  });

  useEffect(() => {
    setInflow(getData('dashboard').inflow);
  }, []);

  // function section
  function handleAddInflow() {
    try {
      localStorage.setItem(
        'dashboard',
        JSON.stringify({
          inflow,
        })
      );

      const dashboard = getData('dashboard');
      setInflow(dashboard.inflow);
      return onCloseAddInflow();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something is wrong',
      });
    }
  }

  function handleUpdateInflow() {
    try {
      localStorage.setItem(
        'dashboard',
        JSON.stringify({
          inflow,
        })
      );

      const dashboard = getData('dashboard');
      setInflow(dashboard.inflow);
      return onCloseUpdateInflow();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something is wrong',
      });
    }
  }

  function handleDeleteInflow() {
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
        try {
          localStorage.setItem(
            'dashboard',
            JSON.stringify({
              inflow: 0,
            })
          );

          const { inflow } = getData('dashboard');
          setInflow(inflow);

          return Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            icon: 'success',
            title: 'Inflow deleted',
            width: 'auto',
          });
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Cannot delete data',
          });
        }
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
    setInflow(parseInt(explode));
  }

  return (
    <Layout>
      <Flex justifyContent="space-around">
        <Flex
          bg="white"
          w="50%"
          h="100px"
          borderRadius="8px"
          color="black"
          mx="2"
          justifyContent="center"
          flexDirection="column"
        >
          <Center fontSize="15px" fontWeight="bold">
            Total Item
          </Center>
          <Center fontSize="15px">{totalItem}</Center>
        </Flex>
        <Flex
          bg="white"
          w="50%"
          h="100px"
          borderRadius="8px"
          color="black"
          mx="2"
          justifyContent="center"
          flexDirection="column"
        >
          <Center fontSize="15px" fontWeight="bold">
            Inflow
          </Center>
          <Center fontSize="15px" my="1">
            Rp{formatPrice(inflow)}
          </Center>
          {inflow != 0 ? (
            <Center cursor="pointer">
              <EditIcon mx="2" onClick={() => onOpenUpdateInflow()} />
              <DeleteIcon mx="2" onClick={handleDeleteInflow} />
            </Center>
          ) : (
            <Center cursor="pointer">
              <AddIcon onClick={() => onOpenAddInflow()} />
            </Center>
          )}
        </Flex>
      </Flex>
      <Modal
        isOpen={isOpenAddInflow}
        onClose={() => {
          const dashboard = getData('dashboard');
          setInflow(dashboard.inflow);
          onCloseAddInflow();
        }}
        size="sm"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Inflow</FormLabel>
              <Input
                placeholder="Example: 10.000.000"
                onKeyUp={autoFormatNumber}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="gray"
              mr={3}
              onClick={() => {
                const dashboard = getData('dashboard');
                setInflow(dashboard.inflow);
                onCloseAddInflow();
              }}
            >
              Close
            </Button>
            <Button colorScheme="green" onClick={handleAddInflow}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isOpenUpdateInflow}
        onClose={() => {
          const dashboard = getData('dashboard');
          setInflow(dashboard.inflow);
          onCloseUpdateInflow();
        }}
        size="sm"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Inflow</FormLabel>
              <Input
                placeholder="Example: 10.000.000"
                onKeyUp={autoFormatNumber}
                defaultValue={inflow}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="gray"
              mr={3}
              onClick={() => {
                const dashboard = getData('dashboard');
                setInflow(dashboard.inflow);
                onCloseUpdateInflow();
              }}
            >
              Close
            </Button>
            <Button colorScheme="linkedin" onClick={handleUpdateInflow}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
}
