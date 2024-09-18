// import { container } from 'containers';
// import { IClienteService } from 'interfaces/IClienteService';
// import { ICliente } from 'models/ICliente';
// import { defineStore } from 'pinia';

// export const useClienteStore = defineStore('cliente', {
//     state: () => ({
//         clientes: [] as ICliente[],
//         clienteSelecionado: null as ICliente | null,
//         clienteService: container.get<IClienteService>('IClienteService')
//     }),

//     actions: {
//         async carregarClientes(): Promise<void> {
//             try {
//                 const response = await this.clienteService.getClientes();
//                 this.clientes = response.data;
//             } catch (error) {
//                 console.error('Erro ao carregar clientes:', error);
//             }
//         },

//         async cadastrarCliente(cliente: ICliente) {
//             try {
//                 await this.clienteService.createCliente(cliente);
//                 await this.carregarClientes();
//             } catch (error) {
//                 console.error('Erro ao cadastrar cliente:', error);
//             }
//         },

//         async atualizarCliente(cliente: ICliente) {
//             try {
//                 await this.clienteService.updateCliente(cliente);
//                 await this.carregarClientes();
//             } catch (error) {
//                 console.error('Erro ao atualizar cliente:', error);
//             }
//         },

//         async excluirCliente(clienteId: string) {
//             try {
//                 await this.clienteService.deleteCliente(clienteId);
//                 await this.carregarClientes();
//             } catch (error) {
//                 console.error('Erro ao excluir cliente:', error);
//             }
//         },

//         selecionarCliente(cliente: ICliente) {
//             this.clienteSelecionado = cliente;
//         }
//     }
// });
