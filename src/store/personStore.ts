import { IGetAllPersonResponse } from 'models/responses/IGetAllPersonResponse';
import { defineStore } from 'pinia';
import { container } from '../containers';
import { IPersonService } from '../interfaces/IPersonService';
import { IPersonState } from '../interfaces/pinia/IPersonState';
import { IPerson } from '../models/IPerson';
import { TYPES } from '../types';

const personService = container.get<IPersonService>(TYPES.IPersonService);

export const usePersonStore = defineStore('pessoa', {
    state: (): IPersonState => ({
        persons: null as IPerson[],
        selectedPerson: null,
        formVisible: false,
        error: null,
        personsResponse: null,
        selectedPersons: [] as IPerson[]
    }),

    actions: {
        async getAll(): Promise<void> {
            try {
                const response: IGetAllPersonResponse = await personService.getAll();
                this.personsResponse = response;
            } catch (error) {
                this.error = error;
            }
        },

        async cadastrarCliente(cliente: IPerson) {
            // try {
            //     await this.clienteService.createCliente(cliente);
            //     await this.carregarClientes();
            // } catch (error) {
            //     console.error('Erro ao cadastrar cliente:', error);
            // }
        },

        async atualizarCliente(cliente: IPerson) {
            // try {
            //     await this.clienteService.updateCliente(cliente);
            //     await this.carregarClientes();
            // } catch (error) {
            //     console.error('Erro ao atualizar cliente:', error);
            // }
        },

        async excluirCliente(clienteId: string) {
            // try {
            //     await this.clienteService.deleteCliente(clienteId);
            //     await this.carregarClientes();
            // } catch (error) {
            //     console.error('Erro ao excluir cliente:', error);
            // }
        },

        selecionarCliente(cliente: IPerson) {
            this.clienteSelecionado = cliente;
        },
        showForm() {
            this.formVisible = true;
        },
        hideForm() {
            this.formVisible = false;
        }
    }
});
