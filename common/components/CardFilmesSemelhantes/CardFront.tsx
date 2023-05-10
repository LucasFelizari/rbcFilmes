import { motion } from "framer-motion";
import { IFilmeDto } from "../../types/IFilmeDto";

import { Card, CardBody, CardHeader, Center, Heading, Text, VStack } from "@chakra-ui/react";
import ImagemFilme from "../ImagemFilme";

export default function CardFront({ filme, flipped, setFlipped }: { filme: IFilmeDto, flipped: boolean, setFlipped: Function }){
    return(
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
            transition: { duration: 0.3, type: "spring", stiffness: 200 },
          }}
        exit={{ rotateY: 90 }}
      >
          <CardHeader>
            <Heading   fontFamily={'Poppins'} size='md'>{filme.title}</Heading>
          </CardHeader>
          <CardBody>
            <VStack w={'100%'} spacing={'1rem'}>
              <Center>
                <ImagemFilme maxH={'22rem'} nomeFilme={filme.title} />
              </Center>
            </VStack>
          </CardBody>
        </Card>
      );
   }