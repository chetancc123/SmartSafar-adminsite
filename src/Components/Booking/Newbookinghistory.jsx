import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChakraProvider, Table, Thead, Tbody, Tr, Th, Td, Container, Spinner } from '@chakra-ui/react';

const ManagerTable = () => {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/admin/all-hub-list');
        setManagers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchManagers();
  }, []);

  return (
    <ChakraProvider>
      <Container maxW="container.md" mt={5}>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          <Table variant="striped"           border=" 3px solid #13C39C"
>
            <Thead>
              <Tr>
                <Th>S.no</Th>
                <Th>Manager Name</Th>
                <Th>Location</Th>
              </Tr>
            </Thead>
            <Tbody>
              {managers.map((manager, index) => (
                <Tr key={manager.id}>
                  <Td>{index + 1}</Td>
                  <Td>{manager.managerName}</Td>
                  <Td>{manager.hubAddress}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Container>
    </ChakraProvider>
  );
};

export default ManagerTable;
