import { Box, Card, CardBody, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import ResumoFilmeBuscado from "../ResumoFilmeBuscado";
import { IFilmeDto } from "../../types/IFilmeDto";

export default function CardBack({ filme, flipped, setFlipped }: { filme: IFilmeDto, flipped: boolean, setFlipped: Function }) {
  return (
    <Card
      as={motion.div}
      bg="gray.800"
      color={'white'}
      borderRadius={'1rem'}
      minH={'30rem'}
      onClick={() => setFlipped(!flipped)}
      boxShadow={'dark-lg'}
      cursor={'pointer'}
      initial={{ rotateY: 90 }}
      animate={{
        rotateY: 0,
        transition: { duration: 0.9, type: "spring", stiffness: 200 },
      }}
      exit={{ rotateY: 90 }}
    >
      <CardBody>
        <Box w={'100%'} p={'1rem'}>
          <ResumoFilmeBuscado nomeFilme={filme.title} />
          <VStack pt={'3rem'} w={'100%'} alignItems={'start'} >
            <Text fontFamily={'Poppins'}>Data de lançamento: </Text>
            <Text fontFamily={'Poppins'}>{filme.release_date}</Text>
          </VStack>
        </Box>
      </CardBody>
    </Card>
  );
}