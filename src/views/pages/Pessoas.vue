<script setup lang="ts">
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';
import { TipoPessoa } from '../../models/enums/TipoPessoa';
import { ICliente } from '../../models/ICliente';

// carregar as pessoas
// onMounted(() => {
//     ProductService.getProducts().then((data) => (products.value = data));
// });

const toast = useToast();
const dt = ref();
const products = ref();
const pessoaDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);

const selectedProducts = ref();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const submitted = ref(false);
const tiposPessoa = ref([
    { label: 'PESSOA FÍSICA', value: TipoPessoa.Fisica },
    { label: 'PESSOA JURÍDICA', value: TipoPessoa.Juridica }
]);

const novoCliente = ref<ICliente>(criarNovoCliente());

function openNew() {
    novoCliente.value = criarNovoCliente();
    submitted.value = false;
    pessoaDialog.value = true;
}

function criarNovoCliente(): ICliente {
    return {
        idAlternativo: '',
        nome: '',
        apelido: '',
        fisJur: 0,
        cpfCnpj: '',
        identidade: '',
        identidadeEmissor: '',
        inscricaoEstadual: '',
        inscricaoMunicipal: '',
        inscricaoProdutorRural: '',
        inscricaoSuFrama: '',
        nascimento: new Date(),
        fundacao: new Date(),
        site: '',
        observacao: '',
        ativo: true
    };
}

function hideDialog() {
    pessoaDialog.value = false;
    submitted.value = false;
}

function saveProduct() {
    submitted.value = true;

    if (novoCliente?.value?.nome?.trim()) {
        // logica de salvar aqui
        pessoaDialog.value = false;
        novoCliente.value = criarNovoCliente();
    }
}

function editProduct(prod) {
    novoCliente.value = { ...prod };
    pessoaDialog.value = true;
}

function confirmDeleteProduct(prod) {
    novoCliente.value = prod;
    deleteProductDialog.value = true;
}

function deleteProduct() {
    products.value = products.value.filter((val) => val.id !== novoCliente?.value?.idAlternativo);
    deleteProductDialog.value = false;
    novoCliente.value = criarNovoCliente();
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
}

function findIndexById(id) {
    let index = -1;
    for (let i = 0; i < products.value.length; i++) {
        if (products.value[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}

function exportCSV() {
    dt.value.exportCSV();
}

function confirmDeleteSelected() {
    deleteProductsDialog.value = true;
}

function deleteSelectedProducts() {
    products.value = products.value.filter((val) => !selectedProducts.value.includes(val));
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
}
</script>

<template>
    <div>
        <div class="card">
            <Toolbar class="mb-6">
                <template #start>
                    <Button label="Novo" icon="pi pi-plus" severity="secondary" class="mr-2" @click="openNew" />
                    <Button label="Excluir" icon="pi pi-trash" severity="secondary" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                </template>

                <template #end>
                    <Button label="Export" icon="pi pi-upload" severity="secondary" @click="exportCSV" />
                </template>
            </Toolbar>
        </div>

        <Dialog v-model:visible="pessoaDialog" header="Novo Cliente" :modal="true">
            <form autocomplete="off">
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="nome" class="block">Nome</label>
                        <InputText id="nome" v-model.trim="novoCliente.nome" required autofocus :invalid="submitted && !novoCliente.nome" fluid />
                        <small v-if="submitted && !novoCliente.nome" class="text-red-500">Campo de preenchimento obrigatório.</small>
                    </div>
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="apelido" class="block">Apelido</label>
                        <InputText id="apelido" v-model="novoCliente.apelido" required fluid />
                    </div>
                </div>
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="cpfcnpj" class="block">CPF/CNPJ</label>
                        <InputText id="cpfcnpj" v-model="novoCliente.cpfCnpj" required fluid />
                    </div>
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="fisJur" class="block">Tipo</label>
                        <Select id="fisJur" v-model="novoCliente.fisJur" :options="tiposPessoa" optionLabel="label" placeholder="Tipo de Pessoa" fluid class="w-full" />
                    </div>
                </div>
                <div class="flex flex-col md:flex-row gap-4 mt-2">
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="identidade" class="block">Identidade</label>
                        <InputText id="identidade" v-model="novoCliente.identidade" required fluid />
                    </div>
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="identidadeEmissor" class="block">Identidade Emissor</label>
                        <InputText id="identidadeEmissor" v-model="novoCliente.identidadeEmissor" required fluid />
                    </div>
                </div>
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="inscricaoProdutorRural" class="block">Inscrição Produtor Rural</label>
                        <InputText id="inscricaoProdutorRural" v-model="novoCliente.inscricaoProdutorRural" required fluid />
                    </div>
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="inscricaoSuframa" class="block">Inscrição Suframa</label>
                        <InputText id="inscricaoSuframa" v-model="novoCliente.inscricaoSuFrama" required fluid />
                    </div>
                </div>
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="nascimento" class="block">Nascimento</label>
                        <DatePicker :showIcon="true" id="nascimento" v-model="novoCliente.nascimento" class="w-full" />
                    </div>
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="fundacao" class="block">Fundação</label>
                        <DatePicker :showIcon="true" id="fundacao" v-model="novoCliente.fundacao" class="w-full" />
                    </div>
                </div>
                <div class="flex flex-col w-full">
                    <label for="site" class="block">Site</label>
                    <InputText id="site" v-model="novoCliente.site" required fluid />
                </div>
                <div class="flex flex-col w-full">
                    <label for="observacao" class="block">Observação</label>
                    <Textarea id="observacao" v-model="novoCliente.observacao" rows="4" fluid />
                </div>
            </form>

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Save" icon="pi pi-check" @click="saveProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="novoCliente"
                    >Are you sure you want to delete <b>{{ novoCliente.nome }}</b
                    >?</span
                >
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
                <Button label="Yes" icon="pi pi-check" @click="deleteProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="novoCliente">Are you sure you want to delete the selected products?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
                <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
            </template>
        </Dialog>
    </div>
</template>
