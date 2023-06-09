import { Box, Image, Spinner } from "@chakra-ui/react";
import { url } from "inspector";
import { useEffect, useState } from "react";
import buscarImagemFilme from "../services/buscarImagemFilme";

export default function ImagemFilme({ maxH, nomeFilme }) {

    const [urlImagem, setUrlImagem] = useState<string>('');

    useEffect(() => {
        BuscarImagem();
    }, [nomeFilme])

    async function BuscarImagem() {
        setUrlImagem(await buscarImagemFilme(nomeFilme));
    }

    if (!urlImagem) {
        return <Spinner />;
    }

    if (urlImagem) {
        return (
            <Box >
                <Image
                    borderRadius={'1rem'}
                    boxShadow={'lg'}
                    src={urlImagem}
                    maxH={maxH}
                    alt='Img filme'
                />
            </Box>
        );
    }
    return null;
}