export interface IPerson {
    idAlternativo: string | '';
    nome: string | '';
    apelido: string | '';
    fisJur: number | 0;
    cpfCnpj: string | '';
    identidade: string | '';
    identidadeEmissor: string | '';
    inscricaoEstadual: string | '';
    inscricaoMunicipal: string | '';
    inscricaoProdutorRural: string | '';
    inscricaoSuFrama: string | '';
    nascimento: Date | null;
    fundacao: Date | null;
    site: string | '';
    observacao: string | '';
    ativo: boolean | '';
}
