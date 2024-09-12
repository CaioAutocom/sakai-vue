<template>
    <div>
        <div class="card">
            <div class="font-semibold text-xl">Clientes</div>
            <Toolbar>
                <template #start>
                    <Button label="Novo" icon="pi pi-plus" severity="secondary" @click="openForm" />
                    <Button label="Excluir" icon="pi pi-trash" severity="secondary" @click="confirmDeleteSelected" :disabled="!selectedClientes.length" />
                </template>
                <template #end>
                    <Button label="Exportar" icon="pi pi-upload" severity="secondary" @click="exportCSV" />
                </template>
            </Toolbar>
        </div>

        <FormCliente :visible="formVisible" :cliente="selectedCliente" @update:visible="formVisible = $event" @save="carregarClientes" />

        <DataTable :value="clientes" ref="dt" selectionMode="multiple" v-model:selection="selectedClientes">
            <!-- Colunas da tabela aqui -->
        </DataTable>

        <!-- Diálogos de confirmação aqui -->
    </div>
</template>

<script setup lang="ts">
import { ICliente } from 'models/ICliente';
import { useClienteStore } from 'store/clienteStore';
import { onMounted, ref } from 'vue';

const clienteStore = useClienteStore();
const clientes = ref<ICliente[]>([]);
const selectedClientes = ref<ICliente[]>([]);
const formVisible = ref(false);
const selectedCliente = ref<ICliente | null>(null);

const carregarClientes = async () => {
    await clienteStore.carregarClientes();
};

const openForm = () => {
    selectedCliente.value = null;
    formVisible.value = true;
};

const confirmDeleteSelected = () => {
    // Implementar lógica de exclusão
};

const exportCSV = () => {
    // Implementar exportação CSV
};

onMounted(() => {
    carregarClientes();
});
</script>
