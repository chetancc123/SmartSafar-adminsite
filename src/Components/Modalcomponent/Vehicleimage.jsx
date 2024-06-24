import { useState } from "react";
import {
    Box,
    Flex,
    Icon,
    Text,
    Link,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
   
  } from "@chakra-ui/react";
  import { IoDocumentOutline } from "react-icons/io5";

const VehicleImage = () =>{
    const [vehicleImage, setvehicleImage] = useState(false);

    const toggleVehicleImageModal =()=>{
        setvehicleImage (!vehicleImage);
    };
    const dummyDocumentData = {
      
      vehicleImage:"vehicleImage_document_url"
    };
   return(
    <>
      <Modal
                  isOpen={vehicleImage}
                  onClose={toggleVehicleImageModal}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Vehicle Image</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    <img src={dummyDocumentData.vehicleImage} alt="vehicleImage " />
                    </ModalBody>
                  </ModalContent>
                </Modal>

                <Box padding="2">
                  <Flex align="center">
                    <Text fontWeight="600">Vehicle Image:</Text>
                    <Link onClick={toggleVehicleImageModal}>
                      <Icon
                        as={IoDocumentOutline}
                        className="user-avatar"
                        fontSize="30px"
                        color="Black"
                      />
                    </Link>
                  </Flex>
                </Box>
    </>
   )
}
 export default VehicleImage;