import { Box, Card, CardBody, CardHeader, Center, Heading, ScaleFade, SimpleGrid, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { IFilmeDto } from "../types/IFilmeDto";
import { useEffect, useState } from "react";
import buscarFilmesSemelhantes from "../services/buscarFilmesSemelhantes";
import ImagemFilme from "./ImagemFilme";
import { AnimatePresence, motion } from "framer-motion";
import obterResumoFilme from "../services/obterResumoFilme";
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
        <Heading p={'1rem'}>Filmes semelhantes:</Heading>
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
  const { isOpen, onToggle } = useDisclosure();

  return (
    <AnimatePresence>
      {
        isOpen ? (
          <Card as={motion.div} bg="gray.800" color={'white'} borderRadius={'1rem'} minH={'30rem'} onClick={onToggle} boxShadow={'dark-lg'}>
            <CardBody>
              <Box w={'100%'} p={'1rem'}>
                <ResumoFilmeBuscado nomeFilme={filme.title} />
              </Box>
            </CardBody>
          </Card>
        )
          :
          (
            <Card  as={motion.div}  bg="gray.800" color={'white'} borderRadius={'1rem'}  minH={'30rem'} onClick={onToggle} boxShadow={'dark-lg'}>
              <CardHeader>
                <Heading size='md'>{filme.title}</Heading>
              </CardHeader>
              <CardBody>
                <VStack w={'100%'} spacing={'1rem'}>
                  <Center>
                    <ImagemFilme maxH={'15rem'} nomeFilme={filme.title} />
                  </Center>
                  <Text>Data de lançamento: {filme.release_date}</Text>
                </VStack>
              </CardBody>
            </Card>
          )
      }
    </AnimatePresence>
  )
}