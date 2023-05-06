import { Box, Center, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import MostrarRecomendacoes from "../common/services/mostrarRecomendacoes";

export default function Home() {

  useEffect(() => {
    MostrarRecomendacoes();
  }, []);

  return (
    <VStack w={'full'} bg={'bg'} h="100vh" pos={'relative'}>
      <Box  shadow={'lg'} mt={'4rem'} borderRadius={'1.5rem'} w="40rem" bg="bgLight" h={'30rem'} justifyContent={'center'} >
       <Center>
         <Text color={'white'}>aaaaaaaaaaaa</Text>
        </Center>
      </Box>
    </VStack>
  )
}
