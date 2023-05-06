

export default function MostrarRecomendacoes(){
        fetch('/filmes.csv').then(r => r.text()).then(text => {
            console.log(text)
        });

}