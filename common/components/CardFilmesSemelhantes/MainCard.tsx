import { useState } from "react";
import { IFilmeDto } from "../../types/IFilmeDto";
import { AnimatePresence } from "framer-motion";
import CardFront from "./CardFront";
import CardBack from "./CardBack";

export default function MainCard({ filme }: { filme: IFilmeDto }) {
    const [flipped, setFlipped] = useState(false);

    if (filme) {
        return (
            <AnimatePresence>
                {!flipped ?
                    <CardFront filme={filme} flipped={flipped} setFlipped={setFlipped} />
                    :
                    <CardBack filme={filme} flipped={flipped} setFlipped={setFlipped} />
                }
            </AnimatePresence>
        )
    }
    else return null;
}