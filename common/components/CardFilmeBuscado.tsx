import { Box, Center, Heading, HStack, Spinner, Text, VStack } from "@chakra-ui/react"
import { IFilmeDto } from "../types/IFilmeDto"
import Image from "next/image"
import buscarImagemFilme from "../services/buscarImagemFilme"
import ImagemFilme from "./ImagemFilme"

export default function CardFilmeBuscado({ filme, isLoading }: { filme: IFilmeDto, isLoading: boolean }) {
  if (isLoading) {
    return <Center><Spinner /></Center>
  }

  if (!isLoading && !filme) {
    return <Text color={'white'}>Digite o nome do filme e clique em buscar para obter os resultados</Text>
  }

  return (
    <Box color={'white'} w={'100%'} borderRadius={'1rem'} borderWidth={'2px'} px={"2rem"} >
      <HStack w={"100%"} h={"100%"} justifyContent={"space-between"} p={"1rem"}>
        <VStack w={'full'} h={'100%'} alignItems={'start'} spacing={'2rem'} p={'1rem'}>
          <Text >Filme buscado:</Text>
          <Heading >{filme.title}</Heading>
          <Text>Lançamento: {filme.release_date}</Text>
        </VStack>

        <ImagemFilme maxH={'15rem'} nomeFilme={filme.title} />

      </HStack>
    </ Box >
  )
}