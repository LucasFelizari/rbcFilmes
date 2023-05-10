import { Box, Card, CardBody, CardHeader, Center, Heading, ScaleFade, SimpleGrid, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { IFilmeDto } from "../types/IFilmeDto";
import { useEffect, useState } from "react";
import buscarFilmesSemelhantes from "../services/buscarFilmesSemelhantes";
import ImagemFilme from "./ImagemFilme";
import { AnimatePresence, motion } from "framer-motion";
import ResumoFilmeBuscado from "./ResumoFilmeBuscado";

export default function CardFilmesSemelhantes({ filmeBuscado }: { filmeBuscado: IFilmeDto }) {
  const [filmesSemelhantes, setFilmesSemelhantes] = useState<IFilmeDto[]>([]);

  useEffect(() => {
    BuscarFilmes();
  }, [filmeBuscado])

  async function BuscarFilmes() {
    if (!filmeBuscado) {
      return;
    }
    setFilmesSemelhantes(await buscarFilmesSemelhantes(filmeBuscado))
  }

  if (filmesSemelhantes && filmesSemelhantes.length > 0) {
    return (
      <Box color={'white'} w={'100%'} >
        <Heading p={'1rem'} fontFamily={'Poppins'}>Filmes semelhantes:</Heading>
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))' p="1rem">
          {filmesSemelhantes.map((filme, index) => (
            <ScaleFade initialScale={0.4} in={true} key={index} >
              <CardFilmes filme={filme} />
            </ScaleFade>
          ))}
        </SimpleGrid>
      </ Box >
    )
  }

  return null;
}

function CardFilmes({ filme }: { filme: IFilmeDto }) {
  const [flipped, setFlipped] = useState(false);

  if (filme)
        return (
            <AnimatePresence>
                {!flipped ?
                    <CardFront filme={filme} flipped={flipped} setFlipped={setFlipped} />
                    :
                    <CardBack filme={filme} flipped={flipped} setFlipped={setFlipped} />
                }
            </AnimatePresence>
        )

    return null
}

 function CardFront({ filme, flipped, setFlipped }: { filme: IFilmeDto, flipped: boolean, setFlipped: Function }){
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
              <ImagemFilme maxH={'15rem'} nomeFilme={filme.title} />
            </Center>
            <Text   fontFamily={'Poppins'}>Data de lançamento: {filme.release_date}</Text>
          </VStack>
        </CardBody>
      </Card>
    );
 }

 function CardBack({ filme, flipped, setFlipped }: { filme: IFilmeDto, flipped: boolean, setFlipped: Function }){
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
            transition: { duration: 0.9, type: "spring", stiffness: 200 },
          }}
          exit={{ rotateY: 90 }}
        >
            <CardBody>
              <Box w={'100%'} p={'1rem'}>
                <ResumoFilmeBuscado nomeFilme={filme.title} />
              </Box>
            </CardBody>
          </Card>
  );
 }