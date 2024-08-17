export interface Customer {
	id: number;
	tipoCliente: string;
	documento: number;
	rnc?: string;
	nombre?: string;
	dirrecion?: string;
	email?: string;
	limiteCredito: number;
	telefonno?: string;
}
