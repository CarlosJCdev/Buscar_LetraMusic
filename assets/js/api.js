//Código de la clase que hará la consulta a la API

//Exportamos la clase para poder usarla en otros archivos 'app.js'
export class API{
    //Creamos un objeto con la estrucutra definida en el constructor, lo cual se instanciará en el llamado de la API
    constructor(artista, cacion){
        this.artista= artista;
        this.cacion= cacion;
    }
    //No toma ningun parametro (), ya que los leeremos del objeto que se creará
    async consultarAPI(){
        //Pasamos los parametros definidos en el constructor, a la uri de la API, en ese orden ya que así lo define la API
        const url= await fetch (`https://api.lyrics.ovh/v1/${this.artista}/ ${this.cacion}`);
        //Ahora debemos de gestionar la respuesta y el formato en que nos arrojará la API
        
        const respuesta = await url.json();
        return{
            respuesta
            
        } 
    }
}
