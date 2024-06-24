import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Box, IconButton, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";

const data = [
  { sno: 1, name: "John Doe", date: "2024-05-21", amount: 1200 },
  { sno: 2, name: "Jane Smith", date: "2024-05-21", amount: 1500 },
  { sno: 3, name: "Bob Johnson", date: "2024-05-21", amount: 1800 },
  { sno: 4, name: "Alice Williams", date: "2024-05-21", amount: 2100 },
  { sno: 5, name: "Charlie Brown", date: "2024-05-21", amount: 2400 },
];

const tableColumns = [
  { name: "s.no", field: "sno" },
  { name: "name", field: "name" },
  { name: "date", field: "date" },
  { name: "amount", field: "amount" },
];

const EmployeePayment1 = () => {
  return (
    <>
      <Box display='flex' alignItems='center' mt={10}>
        <IconButton    aria-label='Back' icon={<ChevronLeftIcon w={10} h={10} />} variant='ghost' mr='2' />
        <Text fontSize='2xl' fontWeight='bold'>Employee Payment</Text>
      </Box>
      <Table variant="simple" mt={10}>
        <Thead>
          <Tr>
            {tableColumns.map((column) => (
              <Th key={column.name}>{column.name}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row) => (
            <Tr key={row.sno}>
              <Td>{row.sno}</Td>
              <Td>{row.name}</Td>
              <Td>{row.date}</Td>
              <Td isNumeric>{row.amount}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default EmployeePayment1;
