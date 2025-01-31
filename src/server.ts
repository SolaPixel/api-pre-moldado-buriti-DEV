import { app } from "./app"; // importando objeto app
import { env } from "./env";


/* utilizando função listen do objeto app para criar a porta e 
host para prevenção em conexão front - back
além de prommise para resposta do sevidor */

app.listen ({
    host: '0.0.0.0',
    port: env.PORT,
}).then(()=>{
    console.log('HTTP Server Running!')
})