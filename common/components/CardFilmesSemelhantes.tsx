import { Box, Card, CardBody, CardHeader, Center, Heading, ScaleFade, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { IFilmeDto } from "../types/IFilmeDto";
import { useEffect, useState } from "react";
import buscarFilmesSemelhantes from "../services/buscarFilmesSemelhantes";
import ImagemFilme from "./ImagemFilme";

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
            <ScaleFade initialScale={0.4} in={true} >
              <Card key={index} bg="gray.800" color={'white'} borderRadius={'1rem'} boxShadow={'dark-lg'}>
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
            </ScaleFade>
          ))}
        </SimpleGrid>

      </ Box >
    )
  }

  return null;
}
