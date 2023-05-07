import { Box, Center, Spinner, Text, VStack } from "@chakra-ui/react"
import { IFilmeDto } from "../types/IFilmeDto"

export default function CardFilmeBuscado({ filme, isLoading }: { filme: IFilmeDto, isLoading: boolean }) {
    if(isLoading){
      return <Center><Spinner /></Center>
    }
  
    if(!isLoading && !filme){
      return <Text color={'white'}>Digite o nome do filme e clique em buscar para obter os resultados</Text>
    }
  
    return (
      <Box color={'white'} w={'90%'} borderRadius={'1rem'} borderWidth={'1px'}>
        <VStack w={'full'} alignItems={'start'} p={'1rem'}>
          <Text >Filme buscado:</Text>
          <Text fontWeight={'semibold'}>{filme.title}</Text>
          <Text>Lançamento: {filme.release_date}</Text>
        </VStack>
      </ Box >
    )
  }