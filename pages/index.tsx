import { Box, Center, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import buscarFilmePorNome from "../common/services/buscarFilmePorNome";
import { IFilmeDto } from "../common/types/IFilmeDto";

export default function Home() {
  const [filmes, setFilmes] = useState<IFilmeDto[]>();
  const csv = require('csv-parse');

  fetch('/filmes.csv').then(r => r.text()).then(text => {
    csv.parse(text, { columns: true }, (err, rows) => {
      setFilmes(rows);
    });
  });

  useEffect(() => {
   if(!!filmes){
    console.log(buscarFilmePorNome(filmes, 'avatar'));
   }
  }, [filmes]);


  return (
    <VStack w={'full'} bg={'bg'} h="100vh" pos={'relative'}>
      <Box shadow={'lg'} mt={'4rem'} borderRadius={'1.5rem'} w="40rem" bg="bgLight" h={'30rem'} justifyContent={'center'} >
        <Center>
          <Text color={'white'}>Filmes</Text>
        </Center>
      </Box>
    </VStack>
  )
}
