import { Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { IFilmeDto } from "../types/IFilmeDto";
import { useEffect, useState } from "react";
import buscarFilmesSemelhantes from "../services/buscarFilmesSemelhantes";
import Image from "next/image";

export default function CardFilmesSemelhantes({filmeBuscado}: { filmeBuscado: IFilmeDto}) {
  const [filmesSemelhantes, setFilmesSemelhantes] = useState<IFilmeDto[]>([]);

   useEffect(() => { 
      BuscarFilmes();
    }, [filmeBuscado])
  
  async function BuscarFilmes() {
    if(!filmeBuscado){
      return;
    }
    setFilmesSemelhantes(await buscarFilmesSemelhantes(filmeBuscado))
  }

  if(filmesSemelhantes && filmesSemelhantes.length > 0){
    return (
      <Box color={'white'} w={'90%'} borderRadius={'1rem'} borderWidth={'1px'}>
          <Heading size={'md'} p={'1rem'}>Filmes semelhantes:</Heading>
          <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))' p="1rem">
            {filmesSemelhantes.map((filme, index) => (
              <Card key={index} bg="gray.800" color={'white'}>
                <CardHeader>
                  <Heading size='md'>{filme.title}</Heading>
                </CardHeader>
                <CardBody>
                  <Box w="100%" justifyContent={'center'} p={"1rem"}>
                    <Image
                      width={300}
                      height={300}
                      src='/teste.png'
                      alt='Img filme'
                      />
                  </Box>
                  <Text>Data de lançamento: {filme.release_date}</Text>
                </CardBody>
                {/* <CardFooter>
                  <Button>Botão</Button>
                </CardFooter> */}
              </Card>
              ))}
          </SimpleGrid>
       
      </ Box >
    )
  }

  return null;
  }
  