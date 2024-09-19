<script setup lang="ts">
import { onMounted } from 'vue';
import { useClienteStore } from '../../../store/clienteStore';

const clienteStore = useClienteStore();

onMounted(() => {
    clienteStore.clientes = clienteStore.mockarClientes();
});

const openForm = () => {
    clienteStore.showForm();
};
</script>

<template>
    <div>
        <div class="card">
            <div class="font-semibold text-xl">Clientes</div>
            <Toolbar>
                <template #start>
                    <Button label="Novo" icon="pi pi-plus" severity="secondary" @click="openForm" />
                    <Button label="Excluir" icon="pi pi-trash" severity="secondary" />
                </template>
                <template #end>
                    <Button label="Exportar" icon="pi pi-upload" severity="secondary" />
                </template>
            </Toolbar>
        </div>
        <template v-if="clienteStore.formVisible">
            <FormCliente />
        </template>
        <template v-else>
            <ListaClientes />
        </template>

        <!--  -->

        <!-- Diálogos de confirmação aqui -->
    </div>
</template>
