import { Box, Center, Heading, HStack, Spinner, Text, VStack } from "@chakra-ui/react"
import { useEffect } from "react"
import obterResumoFilme from "../services/obterResumoFilme"
import { IFilmeDto } from "../types/IFilmeDto"
import ImagemFilme from "./ImagemFilme"
import ResumoFilmeBuscado from "./ResumoFilmeBuscado"

export default function CardFilmeBuscado({ filme, isLoading }: { filme: IFilmeDto, isLoading: boolean }) {
  if (isLoading) {
    return <Center><Spinner /></Center>
  }

  if (!isLoading && !filme) {
    return (
      <Box w={'100%'} pt={'6rem'} justifyContent={'center'}>
        <Center>
          <Text color={'white'}>Digite o nome do filme e clique em buscar para obter os resultados</Text>
        </Center>
      </Box>)
  }

  return (
    <Box
      color={'white'}
      w={'100%'}
      px={"2rem"}
    >
      <HStack w={"100%"} justifyContent={"space-between"} p={"1rem"}>
        <VStack w={'full'} alignItems={'start'} spacing={'2rem'} p={'1rem'}>
          <Heading >{filme.title}</Heading>
          <Text>Lançamento: {filme.release_date}</Text>
          <Box maxW={'30rem'}>
            <ResumoFilmeBuscado nomeFilme={filme.title} />
          </Box>
        </VStack>
        <ImagemFilme maxH={'30rem'} nomeFilme={filme.title} />
      </HStack>
    </ Box >
  )
}