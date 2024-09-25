<script setup lang="ts">
import { FilterMatchMode } from '@primevue/core/api';
import { onMounted, ref } from 'vue';
import { usePersonStore } from '../../../store/personStore';

const personStore = usePersonStore();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

onMounted(async () => {
    if (personStore.persons === null) {
        personStore.getAll();
    }
});

// const excluirCliente = async (clienteId: string) => {
//     try {
//         // await clienteStore.excluirCliente(clienteId);
//         toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Cliente excluído com sucesso', life: 3000 });
//     } catch (error) {
//         toast.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao excluir cliente', life: 3000 });
//     }
// };
</script>

<template>
    <div>
        <DataTable
            ref="dt"
            v-model:selection="personStore"
            :value="personStore.getAllPersonsResponse?.items"
            dataKey="id"
            :paginator="true"
            :rows="personStore.getAllPersonsResponse?.items?.length ?? 0"
            :filters="filters"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25]"
            currentPageReportTemplate="Exibindo {first} - {last} de {totalRecords} clientes."
        >
            <template #header>
                <div class="flex flex-wrap gap-2 items-center justify-between">
                    <h4 class="m-0">Gerenciar Clientes</h4>
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Procurar..." />
                    </IconField>
                </div>
            </template>

            <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
            <!-- <Column field="idAlternativo" header="Cod. Alt" sortable style="min-width: 8rem"></Column> -->
            <Column field="nome" header="Nome" sortable style="min-width: 16rem"></Column>
            <Column field="apelido" header="Apelido" sortable style="min-width: 16rem"></Column>
            <Column field="cpfCnpj" header="CPF/CNPJ" sortable style="min-width: 12rem"></Column>
            <Column field="identidade" header="Identidade" sortable style="min-width: 10rem"></Column>
            <!-- <Column field="identidadeEmissor" header="Identidade Emissor" sortable style="min-width: 12rem"></Column>
            <Column field="inscricaoEstadual" header="IE" sortable style="min-width: 10rem"></Column>
            <Column field="inscricaoMunicipal" header="IM" sortable style="min-width: 10rem"></Column>
            <Column field="inscricaoProdutorRural" header="Inscrição Prod. Rural" sortable style="min-width: 13rem"></Column> -->
            <!-- <Column field="inscricaoSuFrama" header="Inscrição SuFrama" sortable style="min-width: 13rem"></Column>
            <Column field="nascimento" header="Nascimento" sortable style="min-width: 16rem"></Column>
            <Column field="fundacao" header="Fundação" sortable style="min-width: 16rem"></Column>
            <Column field="site" header="Site" sortable style="min-width: 16rem"></Column>
            <Column field="observacao" header="Observação" sortable style="min-width: 16rem"></Column> -->
            <Column field="ativo" header="Ativo" sortable style="min-width: 6rem"></Column>

            <Column :exportable="false" style="min-width: 12rem">
                <Button icon="pi pi-pencil" outlined rounded class="mr-2" />
                <Button icon="pi pi-trash" outlined rounded severity="danger" />
            </Column>
        </DataTable>
    </div>
</template>

<style scoped></style>
