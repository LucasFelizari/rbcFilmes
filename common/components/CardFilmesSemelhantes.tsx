import { Box, Text, VStack } from "@chakra-ui/react";
import { IFilmeDto } from "../types/IFilmeDto";

export default function CardFilmesSemelhantes({ filme}: { filme: IFilmeDto}) {
    if(!filme){
      return null;
    }
  
    return (
      <Box color={'white'} w={'90%'} borderRadius={'1rem'} borderWidth={'1px'}>
        <VStack w={'full'} alignItems={'start'} p={'1rem'}>
          <Text >Filmes semelhantes:</Text>
        </VStack>
      </ Box >
    )
  }
  