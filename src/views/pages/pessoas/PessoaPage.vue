<script setup lang="ts">
import { usePersonStore } from '../../../store/personStore';
import ListPessoas from './ListPessoas.vue';

const pessoaStore = usePersonStore();

const openForm = () => {
    pessoaStore.showForm();
};
</script>

<template>
    <div>
        <div class="card mb-2">
            <div class="font-semibold text-xl">Pessoas</div>
            <Toolbar>
                <template #start>
                    <Button label="Novo" icon="pi pi-plus" severity="secondary" @click="openForm" class="mr-3" />
                    <Button label="Excluir" icon="pi pi-trash" severity="danger" :disabled="pessoaStore.selectedPersons?.length === 0" />
                </template>
                <template #end>
                    <Button label="Exportar" icon="pi pi-upload" severity="secondary" :disabled="pessoaStore.personsResponse?.items?.length === 0" />
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
