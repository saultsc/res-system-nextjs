import CustomerModal from './CustomerModal';

export const CreateCustomers = () => {
	return (
		<div className="flex space-x-4">
			<CustomerModal action="Add" />
		</div>
	);
};

export default CreateCustomers;
