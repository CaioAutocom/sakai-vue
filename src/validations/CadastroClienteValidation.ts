import { useVuelidate } from '@vuelidate/core';
import { email, helpers, maxLength, minLength, numeric, required } from '@vuelidate/validators';
import { cnpj, cpf } from 'cpf-cnpj-validator';
import { reactive } from 'vue';
import { ICliente } from '../models/ICliente';

const isCpfCnpjValid = (value: string) => {
    const cleanedValue = value.replace(/\D/g, '');
    if (cleanedValue.length === 11) {
        return cpf.isValid(cleanedValue);
    } else if (cleanedValue.length === 14) {
        return cnpj.isValid(cleanedValue);
    }
    return false; // Return false if it's neither 11 nor 14 digits
};

export default {
    setup() {
        const state = reactive<ICliente>({
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
        });

        const requiredMessage = 'Campo de preenchimento obrigatório.';

        const rules = {
            idAlternativo: { required, maxLength: maxLength(25) },
            nome: {
                required: helpers.withMessage(requiredMessage, required),
                minLength: minLength(5),
                maxLength: maxLength(100)
            },
            apelido: { minLength: minLength(3), maxLength: maxLength(150) },
            fisJur: { required, numeric },
            cpfCnpj: {
                minLength: minLength(11),
                maxLength: maxLength(14),
                isCpfCnpjValid
            },
            identidade: { maxLength: maxLength(20) },
            identidadeEmissor: { maxLength: maxLength(20) },
            inscricaoEstadual: { maxLength: maxLength(20) },
            inscricaoMunicipal: { maxLength: maxLength(20) },
            inscricaoProdutorRural: { maxLength: maxLength(20) },
            inscricaoSuFrama: { maxLength: maxLength(20) },
            nascimento: {},
            fundacao: {},
            site: { email, maxLength: maxLength(150) },
            observacao: { maxLength: maxLength(2000) },
            ativo: { required }
        };

        const v$ = useVuelidate(rules, state);

        function getCpfCnpjError() {
            if (!v$ || !state.cpfCnpj || state.cpfCnpj === '') return '';

            const cleanedValue = state.cpfCnpj.replace(/\D/g, '');

            if (cleanedValue.length == 11 && !cpf.isValid(cleanedValue)) {
                return 'CPF inválido';
            } else if (cleanedValue.length == 14 && !cnpj.isValid(cleanedValue)) {
                return 'CNPJ inválido';
            }
        }

        return { state, v$, getCpfCnpjError };
    }
};
