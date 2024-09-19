<template>
    <Card class="">
        <template #content>
            <div>
                <form autocomplete="off">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="flex flex-col gap-1 sm:max-w-xs">
                            <label for="idalternativo" class="block">Cód. Alternativo</label>
                            <InputText id="idalternativo" v-model.trim="state.idAlternativo" />
                            <small v-if="v$.idAlternativo.$error" class="text-red-500">Cód. Alternativo é obrigatório e deve ter no máximo 25 caracteres.</small>
                        </div>
                        <div class="flex items-center justify-end gap-2">
                            <Checkbox id="ativo" name="ativo" :binary="true" v-model="state.ativo" />
                            <label for="ativo" class="ml-2">Ativo</label>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4 mt-4">
                        <div class="flex flex-col md:col-span-2 gap-1">
                            <label for="nome" class="block">Nome</label>
                            <InputText id="nome" v-model.trim="state.nome" required autofocus fluid class="" />
                            <small v-for="error of v$.nome.$errors" :key="error.$uid" class="text-red-500"> {{ error.$message }}</small>
                        </div>
                        <div class="flex flex-col xl:col-span-2 gap-1">
                            <label for="apelido" class="block">Apelido</label>
                            <InputText id="apelido" v-model="state.apelido" required fluid />
                            <small v-if="v$.apelido.$error" class="text-red-500">Apelido deve ter entre 3 e 150 caracteres.</small>
                        </div>

                        <div class="flex flex-col gap-1">
                            <label for="cpfcnpj" class="block">CPF/CNPJ</label>
                            <InputText id="cpfcnpj" v-model="state.cpfCnpj" required fluid />
                            <small v-if="v$?.cpfCnpj?.$error" class="text-red-500">{{ getCpfCnpjError() }}</small>
                        </div>
                        <div class="flex flex-col gap-1">
                            <label for="fisJur" class="block mb-3">Tipo</label>
                            <div class="flex gap-4 items-center">
                                <RadioButton id="option1" name="option" value="Física" />
                                <label for="option1">Física</label>
                                <RadioButton id="option2" name="option" value="Jurídica" />
                                <label for="option2">Jurídica</label>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                        <div class="flex flex-col gap-1">
                            <label for="identidade" class="block">Identidade</label>
                            <InputText id="identidade" v-model="state.identidade" required fluid />
                            <small v-if="v$.identidade.$error" class="text-red-500">Identidade deve ter no máximo 25 caracteres.</small>
                        </div>
                        <div class="flex flex-col gap-1">
                            <label for="identidadeEmissor" class="block">Identidade Emissor</label>
                            <InputText id="identidadeEmissor" v-model="state.identidadeEmissor" required fluid />
                            <small v-if="v$.identidadeEmissor.$error" class="text-red-500">Identidade Emissor deve ter no máximo 25 caracteres.</small>
                        </div>
                        <div class="flex flex-col gap-1">
                            <label for="inscricaoProdutorRural" class="block">Inscrição Produtor Rural</label>
                            <InputText id="inscricaoProdutorRural" v-model="state.inscricaoProdutorRural" required fluid />
                            <small v-if="v$.inscricaoProdutorRural.$error" class="text-red-500">Inscrição Produtor Rural deve ter no máximo 25 caracteres.</small>
                        </div>
                        <div class="flex flex-col gap-1">
                            <label for="inscricaoSuframa" class="block">Inscrição Suframa</label>
                            <InputText id="inscricaoSuframa" v-model="state.inscricaoSuFrama" required fluid />
                            <small v-if="v$.inscricaoSuFrama.$error" class="text-red-500">Inscrição Suframa deve ter no máximo 25 caracteres.</small>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols 4 gap-4 mt-4">
                        <div class="flex flex-col gap-1">
                            <label for="nascimento" class="block">Nascimento</label>
                            <DatePicker :showIcon="true" id="nascimento" v-model="state.nascimento" class="w-full" />
                            <small v-if="v$.nascimento.$error" class="text-red-500">A data de nascimento deve ser informada.</small>
                        </div>
                        <div class="flex flex-col gap-1">
                            <label for="fundacao" class="block">Fundação</label>
                            <DatePicker :showIcon="true" id="fundacao" v-model="state.fundacao" class="w-full" />
                            <small v-if="v$.fundacao.$error" class="text-red-500">A data de fundação deve ser informada.</small>
                        </div>
                        <div class="flex flex-col md:col-span-2 gap-1">
                            <label for="site" class="block">Site</label>
                            <InputText id="site" v-model="state.site" required fluid />
                            <small v-if="v$.site.$error" class="text-red-500">Site deve ter no máximo 150 caracteres.</small>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-4 mt-4">
                        <div class="flex flex-col gap-1">
                            <label for="observacao" class="block">Observação</label>
                            <Textarea id="observacao" v-model="state.observacao" rows="4" class="min-h-40" fluid />
                            <small v-if="v$.observacao.$error" class="text-red-500">Observação deve ter no máximo 2000 caracteres.</small>
                        </div>
                    </div>

                    <div class="flex justify-end mt-4 gap-2">
                        <Button label="Cancelar" icon="pi pi-times text-orange-500" text @click="cancelarForm" />
                        <Button label="Salvar" icon="pi pi-check" @click="salvarCliente" />
                    </div>
                </form>
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { ICliente } from 'models/ICliente';
import { useToast } from 'primevue/usetoast';
import { ref, watch } from 'vue';
import { useClienteStore } from '../../../store/clienteStore';

import CadastroClienteValidation from '../../../validations/CadastroClienteValidation';

const props = defineProps<{
    visible: boolean;
    cliente: ICliente | null;
}>();

const emit = defineEmits(['save', 'formVisible']);
const toast = useToast();
const clienteStore = useClienteStore();
const cliente = ref<ICliente>(props.cliente);
const errors = ref<{ [key: string]: boolean }>({});
const { state, v$, getCpfCnpjError } = CadastroClienteValidation.setup();
const salvarCliente = async () => {
    if (validate()) {
        try {
            if (cliente.value.idAlternativo) {
                // await clienteStore.atualizarCliente(cliente.value);
            } else {
                // await clienteStore.cadastrarCliente(cliente.value);
            }
            emit('save');
            toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Cliente salvo com sucesso', life: 3000 });
        } catch (error) {
            toast.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao salvar cliente', life: 3000 });
        }
    }
};

function cancelarForm() {
    clienteStore.hideForm();
}

const validate = () => {
    // Implementar validação aqui
    return true;
};

watch(
    () => props.cliente,
    (newCliente) => {
        cliente.value = newCliente ? { ...newCliente } : null;
    }
);
</script>

<style scoped></style>
