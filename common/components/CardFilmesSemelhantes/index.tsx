import { Box, Card, CardBody, CardHeader, Center, Heading, ScaleFade, SimpleGrid, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { IFilmeDto } from "../../types/IFilmeDto";
import { useEffect, useState } from "react";
import buscarFilmesSemelhantes from "../../services/buscarFilmesSemelhantes";
import ImagemFilme from "../ImagemFilme";
import { AnimatePresence, motion } from "framer-motion";
import ResumoFilmeBuscado from "../ResumoFilmeBuscado";
import MainCard from "./MainCard";

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
        <Heading p={'1rem'} fontFamily={'Poppins'}>Filmes semelhantes:</Heading>
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))' p="1rem">
          {filmesSemelhantes.map((filme, index) => (
            <ScaleFade initialScale={0.4} in={true} key={index} >
              <MainCard filme={filme} />
            </ScaleFade>
          ))}
        </SimpleGrid>
      </ Box >
    )
  }

  return null;
}

 