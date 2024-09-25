<script setup lang="ts">
import { onMounted } from 'vue';

import { usePersonStore } from '../../../store/personStore';
import ListPessoas from './ListPessoas.vue';

const pessoaStore = usePersonStore();

onMounted(() => {
    pessoaStore.getAll();
});

const openForm = () => {
    pessoaStore.showForm();
};
</script>

<template>
    <div>
        <div class="card">
            <div class="font-semibold text-xl">Pessoas</div>
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
        <template v-if="pessoaStore.formVisible">
            <FormPessoa />
        </template>
        <template v-else>
            <ListPessoas />
        </template>

        <!--  -->

        <!-- Diálogos de confirmação aqui -->
    </div>
</template>
