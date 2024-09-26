<script setup lang="ts">
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
import { IGetAllPersonRequest } from 'models/responses/IGetAllPersonResponse';
import { onMounted, ref } from 'vue';
import { usePersonStore } from '../../../store/personStore';

const filters = ref();
const personStore = usePersonStore();
const currentPage = ref(1);

onMounted(async () => {
    const request: IGetAllPersonRequest = {
        pageNumber: 0,
        pageSize: 0,
        searchTerm: '',
        sortColumn: '',
        reverseOrder: false,
        enable: false
    };

    await personStore.getAll(request);
});

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        nome: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        apelido: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        cpfCnpj: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        identidade: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        status: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
    };
};

initFilters();

const clearFilter = () => {
    initFilters();
};

function onPageChange(event) {
    console.log('mudança de pagina', event);
    const pageNumber = event + 1;
    const pageSize = event.rows;
    const request: IGetAllPersonRequest = {
        pageNumber: pageNumber,
        pageSize: pageSize,
        searchTerm: '',
        sortColumn: '',
        reverseOrder: false,
        enable: false
    };
}
</script>

<template>
    <div class="card">
        <DataTable
            v-model:filters="filters"
            v-model:selection="personStore.selectedPersons"
            :value="personStore.personsResponse?.items ?? []"
            showGridlines
            :rows="personStore.personsResponse?.totalItems ?? 0"
            dataKey="id"
            filterDisplay="menu"
            :globalFilterFields="['nome', 'apelido', 'cpfcnpj', 'identidade', 'ativo']"
        >
            <template #header>
                <div class="flex justify-between">
                    <Button type="button" icon="pi pi-filter-slash" label="Limpar Filtros" outlined @click="clearFilter()" />
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Procurar..." />
                    </IconField>
                </div>
            </template>
            <template #empty> Nenhum registro encontrado. </template>
            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column field="nome" header="Name" sortable style="min-width: 14rem">
                <template #body="{ data }">
                    {{ data.nome }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" placeholder="Procurar por nome" />
                </template>
            </Column>
            <Column field="apelido" header="Apelido" sortable style="min-width: 14rem">
                <template #body="{ data }">
                    {{ data.apelido }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" placeholder="Procurar por apelido" />
                </template>
            </Column>
            <Column field="cpfCnpj" header="CPF/CNPJ" sortable style="min-width: 14rem">
                <template #body="{ data }">
                    {{ data.cpfCnpj }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" placeholder="Procurar por CPF/CNPJ" />
                </template>
            </Column>
            <Column field="identidade" header="Identidade" sortable style="min-width: 14rem">
                <template #body="{ data }">
                    {{ data.identidade }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" placeholder="Procurar por identidade" />
                </template>
            </Column>
            <Column field="ativo" header="Ativo" sortable style="max-width: 5rem" class="self-center">
                <template #body="{ data }">
                    <Checkbox v-model="data.ativo" :binary="true" :readonly="true" />
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" />
                </template>
            </Column>
        </DataTable>
        <Paginator :rows="15" :totalRecords="personStore?.personsResponse?.totalItems ?? 0" :rowsPerPageOptions="[15, 30, 50]" @page="onPageChange(event)"></Paginator>
    </div>
</template>
