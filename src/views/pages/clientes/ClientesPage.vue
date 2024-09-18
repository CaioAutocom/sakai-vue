<script setup lang="ts">
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { ICliente } from '../../../models/ICliente';

// import { useClienteStore } from '../../../store/clienteStore';

const toast = useToast();
const confirm = useConfirm();
const dt = ref();
const clientes = ref<ICliente[]>([]);
const pessoaDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const selectedClient = ref<ICliente | null>(null);

const formVisible = ref(false);

const submitted = ref(false);
const novoCliente = ref<ICliente>(null);

onMounted(() => {
    clientes.value = mockarClientes();
});
function mockarClientes(): ICliente[] {
    return [
        {
            idAlternativo: '1',
            nome: 'João Silva',
            apelido: 'JSilva',
            fisJur: 0,
            cpfCnpj: '987.654.321-00',
            identidade: 'ID987654',
            identidadeEmissor: 'SSP',
            inscricaoEstadual: '654321',
            inscricaoMunicipal: '654321',
            inscricaoProdutorRural: '000111222333',
            inscricaoSuFrama: '',
            nascimento: new Date('1990-10-25'),
            fundacao: new Date(''),
            site: 'https://joaosilva.com',
            observacao: 'Cliente regular',
            ativo: true
        },
        {
            idAlternativo: '2',
            nome: 'Empresa ABC',
            apelido: 'ABC Ltda',
            fisJur: 1,
            cpfCnpj: '12.345.678/0001-99',
            identidade: '',
            identidadeEmissor: '',
            inscricaoEstadual: '123456789',
            inscricaoMunicipal: '987654321',
            inscricaoProdutorRural: '',
            inscricaoSuFrama: '',
            nascimento: new Date(''),
            fundacao: new Date('2005-04-12'),
            site: 'https://empresaabc.com.br',
            observacao: 'Empresa parceira de longa data',
            ativo: true
        },
        {
            idAlternativo: '3',
            nome: 'Maria Oliveira',
            apelido: 'Mari',
            fisJur: 0,
            cpfCnpj: '456.789.123-45',
            identidade: 'ID456789',
            identidadeEmissor: 'SSP',
            inscricaoEstadual: '',
            inscricaoMunicipal: '',
            inscricaoProdutorRural: '',
            inscricaoSuFrama: '',
            nascimento: new Date('1988-03-14'),
            fundacao: new Date(''),
            site: '',
            observacao: 'Cliente VIP',
            ativo: false
        },
        {
            idAlternativo: '4',
            nome: 'Tech Solutions Ltda',
            apelido: 'Tech Sol',
            fisJur: 1,
            cpfCnpj: '23.456.789/0001-66',
            identidade: '',
            identidadeEmissor: '',
            inscricaoEstadual: '789123456',
            inscricaoMunicipal: '123987654',
            inscricaoProdutorRural: '',
            inscricaoSuFrama: '9988776655',
            nascimento: new Date(''),
            fundacao: new Date('2012-09-05'),
            site: 'https://techsolutions.com',
            observacao: 'Fornecedor de TI',
            ativo: true
        }
    ];
}
function openNew() {
    novoCliente.value = null;
    submitted.value = false;
    pessoaDialog.value = true;
}

// const clienteStore = useClienteStore();
const openForm = () => {
    formVisible.value = true;
};
// const carregarClientes = async () => {
//     await clienteStore.carregarClientes();
// };

function exportCSV() {
    dt.value.exportCSV();
}

function confirmDeleteSelected() {
    deleteProductsDialog.value = true;
}

function deleteSelectedProducts() {
    deleteProductsDialog.value = false;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
}
</script>

<template>
    <div>
        <div class="card">
            <div class="font-semibold text-xl">Clientes</div>
            <Toolbar>
                <template #start>
                    <Button label="Novo" icon="pi pi-plus" severity="secondary" @click="openForm" />
                    <!-- <Button label="Excluir" icon="pi pi-trash" severity="secondary" @click="confirmDeleteSelected" :disabled="!selectedClientes.length" /> -->
                </template>
                <template #end>
                    <Button label="Exportar" icon="pi pi-upload" severity="secondary" @click="exportCSV" />
                </template>
            </Toolbar>
        </div>
        <FormCliente :visible="formVisible" :cliente="selectedClient" @update:visible="formVisible = $event" @save="" />
        <ListaClientes :clientes="clientes" />

        <!--  -->

        <!-- Diálogos de confirmação aqui -->
    </div>
</template>
