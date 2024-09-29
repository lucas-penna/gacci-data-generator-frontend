import { Escolaridade } from "./enums/escolaridade";
import { EstadoCivil } from "./enums/estadocivil";
import { TipoAuxilio } from "./enums/tipoauxilio";


export class Auxilio {
  id?: number;
  tipoAuxilio?: TipoAuxilio;
  descricaoOutros?: string;
  data?: Date;
}
