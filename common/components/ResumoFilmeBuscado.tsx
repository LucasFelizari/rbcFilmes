import { Center, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import obterResumoFilme from "../services/obterResumoFilme";

export default function ResumoFilmeBuscado({ nomeFilme }) {
    const [resumo, setResumo] = useState<string>('');

    async function BuscarResumo() {
        setResumo(await obterResumoFilme(nomeFilme));
    }

    useEffect(() => {
        if (!nomeFilme) {
            return;
        }
        BuscarResumo();
    }, [nomeFilme])

    if (!resumo) {
        return <Center><Spinner /></Center>
    }

    if (resumo) {
        return (
            <Text  fontFamily={'Poppins'}>
                {resumo}
            </Text>
        );
    }

    return null;
}