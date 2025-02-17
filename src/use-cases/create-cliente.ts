import { ClientesRepository } from "@/repositories/clientes-repository";
import { Cliente } from "@prisma/client";
import { ClienteAlreadyExistsError } from "./errors/cliente-already-exists";

//para tipar parametro do execute com todos os dados que virão para o caso de uso
interface CreateClienteUseCaseRequest {
    nome: string;
    endereco: string,
    telefone: string,
    cpf: string | null,
}

//tipando o retorno
interface CreateClienteUseCaseResponse {
    cliente: Cliente;
}

//classe contendo caso de uso independente responsável por receber dados do controller 
// e encamhinhar para devidos repositórios
export class CreateClienteUseCase {

    //construtor para receber repositório via parâmetro
    constructor(private clientesRepository: ClientesRepository) { }

    //execução do caso de uso com suas devidas tipagens
    async execute({
        nome,
        endereco,
        telefone,
        cpf

    }: CreateClienteUseCaseRequest): Promise<CreateClienteUseCaseResponse> {

        let clienteWithSameCPF: Cliente | null = null

        if (cpf) {
            clienteWithSameCPF = await this.clientesRepository.findByCPF(cpf)
        }

        if (clienteWithSameCPF) {
            
            throw new ClienteAlreadyExistsError();
        }


        //caso tudo dê certo, função que vem do repositório para adicionar dados no banco
        const cliente = await this.clientesRepository.create({
            nome,
            telefone,
            endereco,
            cpf
        });



        //devolvendo produto para possíveis testes
        return {
            cliente
        };
    }

}