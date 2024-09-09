export interface ICliente {
    idAlternativo: string;
    nome: string;
    apelido: string;
    fisJur: number;
    cpfCnpj: string;
    identidade: string;
    identidadeEmissor: string;
    inscricaoEstadual: string;
    inscricaoMunicipal: string;
    inscricaoProdutorRural: string;
    inscricaoSuFrama: string;
    nascimento: Date;
    fundacao: Date;
    site: string;
    observacao: string;
    ativo: boolean;
}
