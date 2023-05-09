import { Box, Button, Flex, HStack, VStack } from "@chakra-ui/react";
import { useState } from "react";
import buscarFilmePorNome from "../common/services/buscarFilmePorNome";
import { IFilmeDto } from "../common/types/IFilmeDto";
import { Input } from '@chakra-ui/react'
import CardFilmeBuscado from "../common/components/CardFilmeBuscado";
import CardFilmesSemelhantes from "../common/components/CardFilmesSemelhantes";

export default function Home() {
  const [nomeFilme, setNomeFilme] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filmeBuscado, setFilmeBuscado] = useState<IFilmeDto | undefined>(null);

  const handleChange = (event) => setNomeFilme(event.target.value)

  async function BuscarFilme() {
    if (nomeFilme == '') {
      alert('Digite o nome do filme');
      return;
    }
    setIsLoading(true);
    setFilmeBuscado(await buscarFilmePorNome(nomeFilme))
    setIsLoading(false);
  }

  return (
    <Flex
      w={'full'}
      bg={'bgLight'}
      pos={'relative'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Box
        shadow={'lg'}
        borderRadius={'1.5rem'}
        my={'2rem'}
        minW="80vw"
        p={'2rem'}
        bg="bg"
        minH={'90vh'}
        justifyContent={'center'}
      >
        <VStack
          w={'100%'}
          spacing={'1.5rem'}
        >
          <HStack w="100%">
            <Input placeholder='Nome do filme' color={'white'} onChange={handleChange} />
            <Button colorScheme="linkedin" isLoading={isLoading} onClick={BuscarFilme}>Buscar</Button>
          </HStack>
          <CardFilmeBuscado filme={filmeBuscado} isLoading={isLoading} />
          <CardFilmesSemelhantes filmeBuscado={filmeBuscado} />
        </VStack>
      </Box>
    </Flex>
  )
}
