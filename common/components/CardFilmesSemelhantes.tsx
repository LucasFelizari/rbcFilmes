import { Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { IFilmeDto } from "../types/IFilmeDto";
import { useEffect, useState } from "react";
import buscarFilmesSemelhantes from "../services/buscarFilmesSemelhantes";

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
  
          <Text p={'1rem'}>Filmes semelhantes:</Text>
          <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))' p="1rem">
            {filmesSemelhantes.map((filme, index) => (
              <Card key={index} bg="gray.800" color={'white'}>
                <CardHeader>
                  <Heading size='md'>{filme.title}</Heading>
                </CardHeader>
                <CardBody>
                  <Text>Data de lançamento: {filme.release_date}</Text>
                
                </CardBody>
                <CardFooter>
                  <Button>Botão</Button>
                </CardFooter>
              </Card>
              ))}
          </SimpleGrid>
       
      </ Box >
    )
  }

  return null;
  }
  


//   <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
//   <Card>
//     <CardHeader>
//       <Heading size='md'> Customer dashboard</Heading>
//     </CardHeader>
//     <CardBody>
//       <Text>View a summary of all your customers over the last month.</Text>
//     </CardBody>
//     <CardFooter>
//       <Button>View here</Button>
//     </CardFooter>
//   </Card>
//   <Card>
//     <CardHeader>
//       <Heading size='md'> Customer dashboard</Heading>
//     </CardHeader>
//     <CardBody>
//       <Text>View a summary of all your customers over the last month.</Text>
//     </CardBody>
//     <CardFooter>
//       <Button>View here</Button>
//     </CardFooter>
//   </Card>
//   <Card>
//     <CardHeader>
//       <Heading size='md'> Customer dashboard</Heading>
//     </CardHeader>
//     <CardBody>
//       <Text>View a summary of all your customers over the last month.</Text>
//     </CardBody>
//     <CardFooter>
//       <Button>View here</Button>
//     </CardFooter>
//   </Card>
// </SimpleGrid>