<template>
    <Dialog :style="{ width: '70vw' }" header="Cliente" :modal="true">
        <form @submit.prevent="salvarCliente">
            <!-- Formulário similar ao existente -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex flex-col gap-1 sm:max-w-xs">
                    <label for="idalternativo" class="block">Cód. Alternativo</label>
                    <InputText id="idalternativo" v-model="cliente.idAlternativo" />
                    <small v-if="errors.idAlternativo" class="text-red-500">Cód. Alternativo é obrigatório e deve ter no máximo 25 caracteres.</small>
                </div>
                <!-- Outros campos aqui -->
            </div>
            <div class="flex justify-end mt-4 gap-2">
                <Button label="Cancelar" icon="pi pi-times text-orange-500" text @click="hideDialog" />
                <Button label="Salvar" icon="pi pi-check" type="submit" />
            </div>
        </form>
    </Dialog>
</template>

<script setup lang="ts">
import { ICliente } from 'models/ICliente';
import { useToast } from 'primevue/usetoast';
import { useClienteStore } from 'store/clienteStore';
import { ref, watch } from 'vue';

const props = defineProps<{
    visible: boolean;
    cliente: ICliente | null;
}>();

const emit = defineEmits(['update:visible', 'save']);

const toast = useToast();
const clienteStore = useClienteStore();

const cliente = ref<ICliente>(props.cliente || criarNovoCliente());
const errors = ref<{ [key: string]: boolean }>({});

const salvarCliente = async () => {
    if (validate()) {
        try {
            if (cliente.value.idAlternativo) {
                await clienteStore.atualizarCliente(cliente.value);
            } else {
                await clienteStore.cadastrarCliente(cliente.value);
            }
            emit('save');
            toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Cliente salvo com sucesso', life: 3000 });
            hideDialog();
        } catch (error) {
            toast.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao salvar cliente', life: 3000 });
        }
    }
};

const hideDialog = () => {
    emit('update:visible', false);
};

const validate = () => {
    // Implementar validação aqui
    return true;
};

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

watch(
    () => props.cliente,
    (newCliente) => {
        cliente.value = newCliente ? { ...newCliente } : criarNovoCliente();
    }
);
</script>

<style scoped>
/* Seus estilos aqui */
</style>
