import { Endereco } from './endereco';
import { Auxilio } from './auxilio';
import { Saude } from './saude';
import { Escolaridade } from './enums/escolaridade';
import { EstadoCivil } from './enums/estadocivil';

export class Pessoa {
  id?: number;
  nome?: string;
  endereco: Endereco;
  rendaMensal?: number;
  valorAluguel?: number;
  valorFinanciamento?: number;
  nascimento?: Date;
  telefone?: string;
  escolaridade?: Escolaridade;
  estadoCivil?: EstadoCivil;
  rg?: string;
  cpf?: string;
  auxilios: Auxilio[];
  outroAuxilio?: string;
  saude: Saude;

  constructor() {
    this.endereco = new Endereco();
    this.auxilios = [];
    this.saude = new Saude();
  }
}
