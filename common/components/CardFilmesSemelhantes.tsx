import { Box, Text, VStack } from "@chakra-ui/react";
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
        <VStack w={'full'} alignItems={'start'} p={'1rem'}>
          <Text>Filmes semelhantes:</Text>
          <VStack w={'full'} alignItems={'start'} p={'1rem'}>
            {filmesSemelhantes.map((filme, index) => (
              <Text key={index}>{filme.title}</Text>
            ))}
          </VStack>
        </VStack>
      </ Box >
    )
  }

  return null;
  }
  