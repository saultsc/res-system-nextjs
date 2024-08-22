export interface Customer {
	id: number;
	tipoCliente: string;
	documento: string;
	rnc?: string;
	nombre?: string;
	dirrecion?: string;
	email?: string;
	limiteCredito: string;
	telefonno?: string;
}
