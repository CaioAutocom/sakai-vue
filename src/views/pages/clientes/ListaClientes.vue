<template>
    <div>
        <h1>Lista de Clientes</h1>
        <ul>
            <li v-for="cliente in clientes" :key="cliente.idAlternativo">
                <span>{{ cliente.nome }}</span>
                <button @click="editarCliente(cliente)">Editar</button>
                <button @click="excluirCliente(cliente.idAlternativo)">Excluir</button>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ICliente } from 'models/ICliente';
import { useToast } from 'primevue/usetoast';
import { useClienteStore } from 'store/clienteStore';
import { onMounted, ref } from 'vue';
const clienteStore = useClienteStore();
const toast = useToast();
onMounted(async () => {
    await clienteStore.carregarClientes();
});
const editarCliente = (cliente: ICliente) => {
    clienteStore.selecionarCliente(cliente);
};
const excluirCliente = async (clienteId: string) => {
    try {
        await clienteStore.excluirCliente(clienteId);
        toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Cliente excluído com sucesso', life: 3000 });
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao excluir cliente', life: 3000 });
    }
};
const clientes = ref(clienteStore.clientes);
</script>

<style scoped></style>
