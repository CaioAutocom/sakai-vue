import { useVuelidate } from '@vuelidate/core';
import { email, maxLength, minLength, numeric, required } from '@vuelidate/validators';
import { reactive } from 'vue';
import { ICliente } from '../models/ICliente';

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

        const rules = {
            idAlternativo: { required, maxLength: maxLength(25) },
            nome: { required, minLength: minLength(5), maxLength: maxLength(100) },
            apelido: { minLength: minLength(3), maxLength: maxLength(150) },
            fisJur: { required, numeric },
            cpfCnpj: { required, minLength: minLength(11), maxLength: maxLength(14) },
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

        return { state, v$ };
    }
};
