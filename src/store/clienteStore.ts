import { ICliente } from 'models/ICliente';
import { defineStore } from 'pinia';
import { ref } from 'vue';
// import { container } from '../containers';

export const useClienteStore = defineStore('cliente', {
    state: () => ({
        clientes: ref<ICliente[]>([]),
        clienteSelecionado: null as ICliente | null,
        clientesSelecionados: ref<ICliente[]>([]),
        formVisible: ref(false)
        // clienteService: container.get<IClienteService>('IClienteService')
    }),

    actions: {
        async carregarClientes(): Promise<void> {
            try {
                const response = await this.clienteService.getClientes();
                this.clientes = response.data;
            } catch (error) {
                console.error('Erro ao carregar clientes:', error);
            }
        },

        async cadastrarCliente(cliente: ICliente) {
            try {
                await this.clienteService.createCliente(cliente);
                await this.carregarClientes();
            } catch (error) {
                console.error('Erro ao cadastrar cliente:', error);
            }
        },

        async atualizarCliente(cliente: ICliente) {
            try {
                await this.clienteService.updateCliente(cliente);
                await this.carregarClientes();
            } catch (error) {
                console.error('Erro ao atualizar cliente:', error);
            }
        },

        async excluirCliente(clienteId: string) {
            try {
                await this.clienteService.deleteCliente(clienteId);
                await this.carregarClientes();
            } catch (error) {
                console.error('Erro ao excluir cliente:', error);
            }
        },

        selecionarCliente(cliente: ICliente) {
            this.clienteSelecionado = cliente;
        },
        showForm() {
            this.formVisible = true;
        },
        hideForm() {
            this.formVisible = false;
        },

        mockarClientes(): ICliente[] {
            return [
                {
                    idAlternativo: '1',
                    nome: 'João Silva',
                    apelido: 'JSilva',
                    fisJur: 0,
                    cpfCnpj: '987.654.321-00',
                    identidade: 'ID987654',
                    identidadeEmissor: 'SSP',
                    inscricaoEstadual: '654321',
                    inscricaoMunicipal: '654321',
                    inscricaoProdutorRural: '000111222333',
                    inscricaoSuFrama: '',
                    nascimento: new Date('1990-10-25'),
                    fundacao: new Date(''),
                    site: 'https://joaosilva.com',
                    observacao: 'Cliente regular',
                    ativo: true
                },
                {
                    idAlternativo: '2',
                    nome: 'Empresa ABC',
                    apelido: 'ABC Ltda',
                    fisJur: 1,
                    cpfCnpj: '12.345.678/0001-99',
                    identidade: '',
                    identidadeEmissor: '',
                    inscricaoEstadual: '123456789',
                    inscricaoMunicipal: '987654321',
                    inscricaoProdutorRural: '',
                    inscricaoSuFrama: '',
                    nascimento: new Date(''),
                    fundacao: new Date('2005-04-12'),
                    site: 'https://empresaabc.com.br',
                    observacao: 'Empresa parceira de longa data',
                    ativo: true
                },
                {
                    idAlternativo: '3',
                    nome: 'Maria Oliveira',
                    apelido: 'Mari',
                    fisJur: 0,
                    cpfCnpj: '456.789.123-45',
                    identidade: 'ID456789',
                    identidadeEmissor: 'SSP',
                    inscricaoEstadual: '',
                    inscricaoMunicipal: '',
                    inscricaoProdutorRural: '',
                    inscricaoSuFrama: '',
                    nascimento: new Date('1988-03-14'),
                    fundacao: new Date(''),
                    site: '',
                    observacao: 'Cliente VIP',
                    ativo: false
                },
                {
                    idAlternativo: '4',
                    nome: 'Tech Solutions Ltda',
                    apelido: 'Tech Sol',
                    fisJur: 1,
                    cpfCnpj: '23.456.789/0001-66',
                    identidade: '',
                    identidadeEmissor: '',
                    inscricaoEstadual: '789123456',
                    inscricaoMunicipal: '123987654',
                    inscricaoProdutorRural: '',
                    inscricaoSuFrama: '9988776655',
                    nascimento: new Date(''),
                    fundacao: new Date('2012-09-05'),
                    site: 'https://techsolutions.com',
                    observacao: 'Fornecedor de TI',
                    ativo: true
                }
            ];
        }
    }
});
