<script setup lang="ts">
import { FilterMatchMode } from '@primevue/core/api';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';
import { TipoPessoa } from '../../models/enums/TipoPessoa';
import { ICliente } from '../../models/ICliente';
import CadastroClienteValidation from '../../validations/CadastroClienteValidation';

// carregar as pessoas
// onMounted(() => {
//     ProductService.getProducts().then((data) => (products.value = data));
// });

const toast = useToast();
const confirm = useConfirm();
const dt = ref();
const products = ref();
const pessoaDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const { state, v$ } = CadastroClienteValidation.setup();
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

function salvarCliente() {
    submitted.value = true;

    v$.value.$touch();

    if (!v$.value.$invalid) {
        // A lógica de salvar vai aqui
        pessoaDialog.value = false;
        novoCliente.value = criarNovoCliente();
        // Mensagem de sucesso ou outra ação
    } else {
        // Lógica de erro ou aviso de validação
        console.log('Formulário contém erros');
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

        <Dialog v-model:visible="pessoaDialog" header="Novo Cliente" :style="{ width: '800px' }" :modal="true">
            <form autocomplete="off">
                <div class="flex flex-row gap-4 flex-wrap">
                    <div class="flex flex-col gap-2 max-w-32">
                        <label for="idalternativo" class="block">Cód. Alternativo</label>
                        <InputText size="small" id="idalternativo" v-model.trim="state.idAlternativo" />
                        <small v-if="v$.idAlternativo.$error" class="text-red-500 w-96">Cód. Alternativo é obrigatório e deve ter no máximo 25 caracteres.</small>
                    </div>
                    <div class="flex flex-wrap gap-2 w-full sm:w-auto ml-auto mt-1">
                        <Checkbox id="ativo" name="ativo" :binary="true" v-model="state.ativo" />
                        <label for="ativo" class="ml-2">Ativo</label>
                    </div>
                </div>

                <div class="flex flex-col md:flex-row gap-4 mb-2">
                    <div class="flex flex-wrap gap-2 w-full content-start">
                        <label for="nome" class="block">Nome</label>
                        <InputText id="nome" v-model.trim="state.nome" required autofocus :invalid="submitted && !state.nome" fluid />
                        <small v-if="v$.nome.$error" class="text-red-500">Nome é obrigatório e deve ter entre 5 e 100 caracteres.</small>
                    </div>
                    <div class="flex flex-wrap gap-2 w-full content-start">
                        <label for="apelido" class="block">Apelido</label>
                        <InputText id="apelido" v-model="state.apelido" required fluid />
                        <small v-if="v$.apelido.$error" class="text-red-500">Apelido deve ter entre 3 e 150 caracteres.</small>
                    </div>
                </div>

                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex flex-wrap gap-2 content-start">
                        <label for="cpfcnpj" class="block">CPF/CNPJ</label>
                        <InputText id="cpfcnpj" v-model="state.cpfCnpj" required fluid />
                        <small v-if="v$.cpfCnpj.$error" class="text-red-500">CPF inválido.</small>
                    </div>
                    <div class="flex flex-wrap gap-2 content-start">
                        <label for="fisJur" class="block">Tipo</label>
                        <Select id="fisJur" v-model="state.fisJur" :options="tiposPessoa" optionLabel="label" placeholder="Tipo de Pessoa" fluid class="w-full" />
                        <small v-if="v$.fisJur.$error" class="text-red-500">Tipo de pessoa precisa ser informado.</small>
                    </div>
                    <div class="flex flex-wrap gap-2 content-start">
                        <label for="identidade" class="block">Identidade</label>
                        <InputText id="identidade" v-model="state.identidade" required fluid />
                        <small v-if="v$.identidade.$error" class="text-red-500">Identidade deve ter no máximo 25 caracteres.</small>
                    </div>
                    <div class="flex flex-wrap gap-2 content-start">
                        <label for="identidadeEmissor" class="block">Identidade Emissor</label>
                        <InputText id="identidadeEmissor" v-model="state.identidadeEmissor" required fluid />
                        <small v-if="v$.identidadeEmissor.$error" class="text-red-500">Identidade Emissor deve ter no máximo 25 caracteres.</small>
                    </div>
                </div>

                <div class="flex flex-col md:flex-row gap-4 mt-2">
                    <div class="flex flex-wrap gap-2 w-full content-start">
                        <label for="inscricaoProdutorRural" class="block">Inscrição Produtor Rural</label>
                        <InputText id="inscricaoProdutorRural" v-model="state.inscricaoProdutorRural" required fluid />
                        <small v-if="v$.inscricaoProdutorRural.$error" class="text-red-500">Inscrição Produtor Rural deve ter no máximo 25 caracteres.</small>
                    </div>
                    <div class="flex flex-wrap gap-2 w-full content-start">
                        <label for="inscricaoSuframa" class="block">Inscrição Suframa</label>
                        <InputText id="inscricaoSuframa" v-model="state.inscricaoSuFrama" required fluid />
                        <small v-if="v$.inscricaoSuFrama.$error" class="text-red-500">Inscrição Suframa deve ter no máximo 25 caracteres.</small>
                    </div>
                </div>
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex flex-wrap gap-2 w-full content-start">
                        <label for="nascimento" class="block">Nascimento</label>
                        <DatePicker :showIcon="true" id="nascimento" v-model="state.nascimento" class="w-full" />
                        <small v-if="v$.nascimento.$error" class="text-red-500">A data de nascimento deve ser informada.</small>
                    </div>
                    <div class="flex flex-wrap gap-2 w-full content-start">
                        <label for="fundacao" class="block">Fundação</label>
                        <DatePicker :showIcon="true" id="fundacao" v-model="state.fundacao" class="w-full" />
                        <small v-if="v$.fundacao.$error" class="text-red-500">A data de fundação deve ser informada.</small>
                    </div>
                </div>
                <div class="flex flex-col w-full content-start">
                    <label for="site" class="block">Site</label>
                    <InputText id="site" v-model="state.site" required fluid />
                    <small v-if="v$.site.$error" class="text-red-500">Site deve ter no máximo 150 caracteres.</small>
                </div>
                <div class="flex flex-col w-full content-start">
                    <label for="observacao" class="block">Observação</label>
                    <Textarea id="observacao" v-model="state.observacao" rows="4" class="min-h-40" fluid />
                    <small v-if="v$.observacao.$error" class="text-red-500">Observação deve ter no máximo 2000 caracteres.</small>
                </div>
            </form>

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" severity="warning" />
                <Button label="Save" icon="pi pi-check" @click="salvarCliente" />
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
